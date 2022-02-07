import * as functions from "firebase-functions";

const admin = require("firebase-admin");
admin.initializeApp();

const addPost = async (post:any) => {
  const {id} = await admin.firestore().collection("Orders").add(post);
  return id;
};

// Config stripe with secret api key
const stripe = require("stripe")(functions.config().stripe.secret_key);
const endPointSecret = "whsec_AFm2MpbUuVS1mgdp8k8dVSsIkaeRUudr";

export const createStripeCheckout =
functions.https.onCall(async (data:any, context:any) => {
  // Stripe init
  const session = await stripe.checkout.sessions.create({
    "payment_method_types": ["card"],
    "mode": "payment",
    "success_url": "http://localhost:3000/",
    "cancel_url": "http://localhost:3000/",
    "payment_intent_data": {
      "metadata": {
        "userId": data[0].userId,
        "posts": data[0].postIds,
      },
    },
    "shipping_address_collection": {
      "allowed_countries": ["US", "CA"],
    },
    "line_items":
      (data[0].posts ? data[0].posts : [
        {
          quantity: 1,
          price_data: {
            currency: "usd",
            unit_amount: (100) * 100, // 10000 = 100 USD
            product_data: {
              name: "post.header",
            },
          },
        },
      ]),
  });
  return (session ?
    {id: session.id} :
    "no res");
});

export const stripeWebhook =
functions.https.onRequest(async (request:any, response:any) => {
  let event = request.body;
  if (endPointSecret) {
    const signature = request.headers["stripe-signature"];
    try {
      // Test validity of stripe signature
      event = stripe.webhooks.constructEvent(
          request.rawBody,
          signature,
          endPointSecret
      );
    } catch (err) {
      // If unvalid
      console.log("⚠️  Webhook signature verification failed.", err);
      return response.sendStatus(400);
    }
  }
  // Check type of event
  switch (event.type) {
    case "payment_intent.succeeded":

      response.sendStatus(200);
      const paymentIntent = event.data.object;
      console.log(`PaymentIntent for ${paymentIntent.amount} was successful!`);
      // Then define and call a method to handle the successful payment intent.
      try {
        const postIds = event.data.object.metaData.posts;
        postIds.includes(",") ?
        postIds.split(",") :
        [postIds]
            .forEach((postId: string) => {
              admin.firestore().collection("Posts")
                  .doc(postId).get().then((res:any) => {
                    const data = res.data();
                    data.bought = true;

                    admin.firestore().collection("Posts")
                        .doc(postId).set(data);
                  });
            });
        // Try adding order data to firebase
        addPost({
          uid: event.data.object.metadata.userId,
          shipping: event.data.object.shipping,
          status: event.data.object.status,
          amount: (event.data.object.amount/100),
          currency: event.data.object.currency,
          url: event.data.object.charges.url,
          event: event,
          metadata: event.data.object.metaData,
          shippingStatus:
          "Waiting for seller to ship to card verification facility",
        }).then((response:any) => {
          console.log("Added order to database");

          admin.firestore().collection("Users")
              .doc(event.data.object.metadata.userId)
              .get()
              .then((res:any) => {
                const data = res.data();
                data.orders.push(response);

                admin.firestore().collection("Users")
                    .doc(event.data.object.metadata.userId)
                    .set(data).then(() => {
                      console.log("Succesfully updated users order page");
                    });
              });
        });
      } catch (err) {
        // If fail, add unformated data to db and log error
        console.log(event.data.object.metadata.userId);
        admin.firestore().collection("Orders").doc().set({
          event: event,
        });
        console.log(`Couldn"t add data to firestore + ${err}`);
      }
      break;
    case "payment_method.attached":
      break;
    default:
      // Unexpected event type
      console.log(`Unhandled event type ${event.type}.`);
  }
});
