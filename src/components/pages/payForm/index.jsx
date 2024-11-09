import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PayNowForm from "./pay";
const pubkey =
  "pk_test_51P2poYFOjqYjuziSQehIuAQksSaw3hKCtNnK5r7mrLs5xwS6ULXbNQJCDmPwdUISPMzqvxdMvzl5g2sHZHpDk4zq00YjLu4h6C";
const stripePromise = loadStripe(pubkey);

export default function PayNow() {
  return (
    <Elements stripe={stripePromise}>
      <PayNowForm />
    </Elements>
  );
}
