import * as functions from "firebase-functions";

const admin = require("firebase-admin");
admin.initializeApp();

// Config stripe with secret api key
const stripe = require("stripe")(functions.config().stripe.secret_key);

// Import express and cors
import * as express from "express";
import * as cors from "cors";

const app = express();
app.use(cors({origin: true}));


app.post("/webhook", async (req, res) => {
  const sig = req.headers["stripe-signature"] as string;


  const endpointSecret = "whsec_...";

  let event;

  try {
    event =
    stripe.webhooks.constructEvent(req.body.rawBody, sig, endpointSecret);
  } catch (err) {
    res.status(400).end();
    return;
  }

  // Handle Type of webhook

  const intent = event.data.object;
  let message;

  switch (event.type) {
    case "payment_intent.succeeded":

      // Update database
      // Send email
      // Notify shipping department

      console.log("Succeeded:", intent.id);
      break;
    case "payment_intent.payment_failed":
      message =
      intent.last_payment_error && intent.last_payment_error.message;
      console.log("Failed:", intent.id, message);
      break;
  }

  res.sendStatus(200);
});

export const createStripeCheckout =
functions.https.onCall(async (data, context) => {
  console.log("hello logs!");
  // Stripe init
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "payment",
    success_url: "http://localhost:3000/payment/success",
    cancel_url: "http://localhost:3000/payment/failure",
    shipping_address_collection: {
      allowed_countries: ["US", "CA"],
    },
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: "usd",
          unit_amount: (100) * 100, // 10000 = 100 USD
          product_data: {
            name: "New camera",
          },
        },
      },
      {
        quantity: 1,
        price_data: {
          currency: "usd",
          unit_amount: (100) * 100, // 10000 = 100 USD
          product_data: {
            name: "New phone",
          },
        },
      },
    ],
  });

  return (session ?
    {id: session.id} :
    "no res");
});

export const stripeWebhook =
functions.https.onRequest(async (req:any, res:any) => {
  const stripe = require("stripe")(functions.config().stripe.token);
  let event;

  try {
    const whSec = functions.config().stripe.payments_webhook_secret;

    event = stripe.webhooks.constructEvent(
        req.rawBody,
        req.headers["stripe-signature"],
        whSec,
    );
  } catch (err) {
    console.error(" Webhook signature verification failed.");
    return res.send("failed");
  }

  const dataObject = event.data.object;

  await admin.firestore().collection("Orders").add({
    checkoutSessionId: dataObject.id,
    paymentStatus: dataObject.payment_status,
    shippingInfo: dataObject.shipping,
    amountTotal: dataObject.amount_total,
  });

  console.log(dataObject);
  return res.send("succeeded???");
});

export const payment = functions.https.onRequest(app);

