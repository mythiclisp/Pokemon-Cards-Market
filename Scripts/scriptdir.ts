import './firebaseauth.ts'
import './Animations/main'

const Stripe = require('stripe');
const stripe = Stripe('sk_test_51K6oGfCM9K7H85bb4WYMEiyDEJQpSo8nizanmn24aoyxLJMQJ7h1PK6XYHHbMi6GeazsYSNLOSC6MstGnBO50n9W00X5iQ9fs8');
stripe.charges.create({
  amount: 200000,
  currency: "cad",
  source: "tok_mastercard", // obtained with Stripe.js
  metadata: {'order_id': '6735'}
});