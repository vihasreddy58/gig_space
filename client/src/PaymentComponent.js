import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe("your-stripe-publishable-key");

const PaymentComponent = () => {
  return (
    <Elements stripe={stripePromise}>
      
    </Elements>
  );
};

export default PaymentComponent;
