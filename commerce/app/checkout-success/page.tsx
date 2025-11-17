"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { useCart } from "components/cart/cart-context";
import { useRouter } from "next/navigation";

export default function CheckoutSuccessPage() {
  const { setCart } = useCart();
  const router = useRouter();
  const hasClearedCart = useRef(false);

  useEffect(() => {
    // Clear the cart only once after successful checkout
    if (!hasClearedCart.current) {
      setCart({
        id: "mock-cart-id",
        items: [],
        totalItems: 0,
        totalPrice: 0,
      });
      hasClearedCart.current = true;

      // Also clear localStorage cart
      try {
        localStorage.removeItem("cart");
        localStorage.removeItem("checkout_info");
      } catch (e) {
        console.warn("Could not clear localStorage:", e);
      }
    }

    // Prevent back navigation by manipulating history
    window.history.pushState(null, "", window.location.href);

    const handlePopState = () => {
      // Push state again to prevent going back
      window.history.pushState(null, "", window.location.href);
      // Then redirect to home
      router.push("/");
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [setCart, router]);

  return (
    <div className="min-h-screen bg-white text-gray-900 flex items-center justify-center lg:pl-20">
      <div className="mx-auto max-w-3xl px-4 py-16 text-center">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-10 w-10 text-green-600"
          >
            <path
              fillRule="evenodd"
              d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm14.03-2.53a.75.75 0 0 0-1.06-1.06l-5.47 5.47-2.22-2.22a.75.75 0 1 0-1.06 1.06l2.75 2.75c.293.293.767.293 1.06 0l6-6Z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <h1 className="text-3xl font-semibold">
          Bestellung erfolgreich aufgegeben
        </h1>
        <p className="mt-3 text-gray-600">
          Vielen Dank für Ihren Einkauf. Wir haben Ihnen eine Bestätigung per
          E-Mail gesendet. Sie können diese Seite sicher schließen oder weiter
          einkaufen.
        </p>
        <div className="mt-8 flex justify-center gap-3">
          <Link
            href="/"
            className="rounded-lg bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
          >
            Weiter einkaufen
          </Link>
          <Link
            href="/profile"
            className="rounded-lg border border-gray-300 px-6 py-3 hover:bg-gray-50"
          >
            Bestellungen anzeigen
          </Link>
        </div>
      </div>
    </div>
  );
}
