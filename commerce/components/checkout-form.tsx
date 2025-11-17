"use client";

import { useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useRouter } from "next/navigation";

interface CheckoutFormProps {
  total: number;
  cart: any;
  userEmail: string;
}

export default function CheckoutForm({
  total,
  cart,
  userEmail,
}: CheckoutFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);
    setErrorMessage(null);

    try {
      // Confirm the payment
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/checkout-success`,
        },
        redirect: "if_required",
      });

      if (error) {
        // Redirect to failure page for all payment errors
        router.replace("/checkout-failed");
      } else if (paymentIntent && paymentIntent.status === "succeeded") {
        // Payment succeeded
        const SHIPPING_COST = 6.9;
        const subtotal = cart?.totalPrice || 0;

        // Send order confirmation email
        await fetch("/api/order", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            toEmail: userEmail,
            subject: "Zahlungsbestätigung - Bestellung aufgegeben",
            text: `Zahlung erfolgreich. Ihre Bestellung über €${total.toFixed(2)} (inkl. €${SHIPPING_COST.toFixed(2)} Versand) wurde aufgegeben.`,
            html: `
              <h2>Zahlung erfolgreich</h2>
              <p>Vielen Dank für Ihre Bestellung.</p>
              <p>Zwischensumme: <strong>€${subtotal.toFixed(2)}</strong></p>
              <p>Versand: <strong>€${SHIPPING_COST.toFixed(2)}</strong></p>
              <p>Gesamtsumme: <strong>€${total.toFixed(2)}</strong></p>
              <p>Zahlungs-ID: ${paymentIntent.id}</p>
            `,
          }),
        });

        // Clear cart
        localStorage.removeItem("cart");
        localStorage.removeItem("checkout_info");

        // Redirect to success page (replace history so back button works)
        router.replace("/checkout-success");
      }
    } catch (err: any) {
      console.error("Payment error:", err);
      // Redirect to failure page for unexpected errors
      router.replace("/checkout-failed");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />

      {errorMessage && (
        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-600">{errorMessage}</p>
        </div>
      )}

      <button
        type="submit"
        disabled={!stripe || isProcessing}
        className="mt-6 w-full px-8 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-colors"
      >
        {isProcessing
          ? "Zahlung wird verarbeitet..."
          : `€${total.toFixed(2)} bezahlen`}
      </button>
    </form>
  );
}
