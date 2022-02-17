import * as functions from "firebase-functions";

let event = {
  "id": "evt_3KQm2mCM9K7H85bb097RGvzr",
  "object": "event",
  "api_version": "2020-08-27",
  "created": 1644297318,
  "data": {
    "object": {
      "id": "pi_3KQm2mCM9K7H85bb0Aimzrn5",
      "object": "payment_intent",
      "amount": 83454377,
      "amount_capturable": 0,
      "amount_received": 83454377,
      "application": null,
      "application_fee_amount": null,
      "automatic_payment_methods": null,
      "canceled_at": null,
      "cancellation_reason": null,
      "capture_method": "automatic",
      "charges": {
        "object": "list",
        "data": [
          {
            "id": "ch_3KQm2mCM9K7H85bb0FQgQ82T",
            "object": "charge",
            "amount": 83454377,
            "amount_captured": 83454377,
            "amount_refunded": 0,
            "application": null,
            "application_fee": null,
            "application_fee_amount": null,
            "balance_transaction": "txn_3KQm2mCM9K7H85bb04tme2mM",
            "billing_details": {
              "address": {
                "city": "Vancouver",
                "country": "CA",
                "line1": "3305 13Th Ave W",
                "line2": null,
                "postal_code": "V6R 2R8",
                "state": "BC"
              },
              "email": "theonlybaconsandwich@gmail.com",
              "name": "Nate Jarvis-Loewen",
              "phone": null
            },
            "calculated_statement_descriptor": "WWW.POKEMONCARDSMARKET",
            "captured": true,
            "created": 1644297318,
            "currency": "usd",
            "customer": "cus_L7027LFA4foffC",
            "description": null,
            "destination": null,
            "dispute": null,
            "disputed": false,
            "failure_code": null,
            "failure_message": null,
            "fraud_details": {
            },
            "invoice": null,
            "livemode": false,
            "metadata": {
              "userId": "vkKROlmstYXA7qg3DoLlSWsnxGA3",
              "posts": "RpNvLMwEcJvMSpHzvNms"
            },
            "on_behalf_of": null,
            "order": null,
            "outcome": {
              "network_status": "approved_by_network",
              "reason": null,
              "risk_level": "normal",
              "risk_score": 7,
              "seller_message": "Payment complete.",
              "type": "authorized"
            },
            "paid": true,
            "payment_intent": "pi_3KQm2mCM9K7H85bb0Aimzrn5",
            "payment_method": "pm_1KQm2rCM9K7H85bbV1xEmQEG",
            "payment_method_details": {
              "card": {
                "brand": "visa",
                "checks": {
                  "address_line1_check": "pass",
                  "address_postal_code_check": "pass",
                  "cvc_check": null
                },
                "country": "US",
                "exp_month": 3,
                "exp_year": 2051,
                "fingerprint": "uxjgStjFqbQhLZdq",
                "funding": "credit",
                "installments": null,
                "last4": "4242",
                "network": "visa",
                "three_d_secure": null,
                "wallet": null
              },
              "type": "card"
            },
            "receipt_email": null,
            "receipt_number": null,
            "receipt_url": "https://pay.stripe.com/receipts/acct_1K6oGfCM9K7H85bb/ch_3KQm2mCM9K7H85bb0FQgQ82T/rcpt_L702CGjaVLdAHLEKDL3wjTAnn4dF8T1",
            "refunded": false,
            "refunds": {
              "object": "list",
              "data": [
              ],
              "has_more": false,
              "total_count": 0,
              "url": "/v1/charges/ch_3KQm2mCM9K7H85bb0FQgQ82T/refunds"
            },
            "review": null,
            "shipping": {
              "address": {
                "city": "Vancouver",
                "country": "CA",
                "line1": "3305 13Th Ave W",
                "line2": null,
                "postal_code": "V6R 2R8",
                "state": "BC"
              },
              "carrier": null,
              "name": "Nate Jarvis-Loewen",
              "phone": null,
              "tracking_number": null
            },
            "source": null,
            "source_transfer": null,
            "statement_descriptor": null,
            "statement_descriptor_suffix": null,
            "status": "succeeded",
            "transfer_data": null,
            "transfer_group": null
          }
        ],
        "has_more": false,
        "total_count": 1,
        "url": "/v1/charges?payment_intent=pi_3KQm2mCM9K7H85bb0Aimzrn5"
      },
      "client_secret": "pi_3KQm2mCM9K7H85bb0Aimzrn5_secret_GWqq1AFS2BuZ87gkcgC0FH7vC",
      "confirmation_method": "automatic",
      "created": 1644297312,
      "currency": "usd",
      "customer": "cus_L7027LFA4foffC",
      "description": null,
      "invoice": null,
      "last_payment_error": null,
      "livemode": false,
      "metadata": {
        "userId": "vkKROlmstYXA7qg3DoLlSWsnxGA3",
        "posts": "RpNvLMwEcJvMSpHzvNms"
      },
      "next_action": null,
      "on_behalf_of": null,
      "payment_method": "pm_1KQm2rCM9K7H85bbV1xEmQEG",
      "payment_method_options": {
        "card": {
          "installments": null,
          "network": null,
          "request_three_d_secure": "automatic"
        }
      },
      "payment_method_types": [
        "card"
      ],
      "processing": null,
      "receipt_email": null,
      "review": null,
      "setup_future_usage": null,
      "shipping": {
        "address": {
          "city": "Vancouver",
          "country": "CA",
          "line1": "3305 13Th Ave W",
          "line2": null,
          "postal_code": "V6R 2R8",
          "state": "BC"
        },
        "carrier": null,
        "name": "Nate Jarvis-Loewen",
        "phone": null,
        "tracking_number": null
      },
      "source": null,
      "statement_descriptor": null,
      "statement_descriptor_suffix": null,
      "status": "succeeded",
      "transfer_data": null,
      "transfer_group": null
    }
  },
  "livemode": false,
  "pending_webhooks": 1,
  "request": {
    "id": "req_30tjaAVEPJnCTV",
    "idempotency_key": "75fca2c0-44cd-4f1c-b77c-1140fe7ebc15"
  },
  "type": "payment_intent.succeeded"
}

const admin = require("firebase-admin");
admin.initializeApp();

// Config stripe with secret api key
const stripe = require("stripe")(functions.config().stripe.secret_key);

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
  try {
    event = stripe.webhooks.constructEvent(
      request.rawBody,
      request.headers["stripe-signature"],
      functions.config().stripe.payments_webhook_secret,
    );
  } catch (err) {
    response.sendStatus(400);
  }

  if (event.type === "payment_intent.succeeded") {
    event.data.object.metadata.posts.split(",").forEach((post) => {
      admin.firestore().collection("Posts").doc(post).get()
      .then((res:any) => {
        const data = res.data()
        data.bought = true
        admin.firestore().collection("Posts").doc(post).set(data)
      })
    })
    admin.firestore().collection("Orders").add({
      shipping: event.data.object.shipping,
      userId: event.data.object.metadata.userId,
      posts: event.data.object.metadata.posts.includes(",") ?
      event.data.object.metadata.posts.split(",") :
      [event.data.object.metadata.posts],
      status: "Waiting for seller to ship",
      createdAt: new Date(),
    }).then((response:any) => {
      admin.firestore().collection("Users")
      .doc(event.data.object.metadata.userId).get().then((res:any) => {
        const data = res.data();
        data.orders.push(response.id);
        admin.firestore().collection("Users")
        .doc(event.data.object.metadata.userId).set(data);
      });
    });
  }

  return response.sendStatus(200);
});
