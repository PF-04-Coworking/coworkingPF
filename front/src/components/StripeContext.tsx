"use client";

import { ReactNode } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const stripePublicKey = process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY;

if (!stripePublicKey) {
  throw new Error("Missing Stripe public key");
}

const stripePromise = loadStripe(stripePublicKey);

interface StripeProviderProps {
  children: ReactNode;
}

const StripeProvider = ({ children }: StripeProviderProps) => {
  return <Elements stripe={stripePromise}>{children}</Elements>;
};

export default StripeProvider;
