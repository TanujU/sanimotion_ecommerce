"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function CheckoutFailedPage() {
  const router = useRouter();

  useEffect(() => {
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
  }, [router]);

  return (
    <div className="min-h-screen bg-white text-gray-900 flex items-center justify-center lg:pl-20">
      <div className="mx-auto max-w-3xl px-4 py-16 text-center">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-10 w-10 text-red-600"
          >
            <path
              fillRule="evenodd"
              d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <h1 className="text-3xl font-semibold text-red-600">
          Zahlung fehlgeschlagen
        </h1>
        <p className="mt-3 text-gray-600">
          Ihre Bestellung konnte nicht aufgegeben werden. Die Zahlung wurde
          nicht verarbeitet.
        </p>
        <p className="mt-2 text-sm text-gray-500">
          Bitte überprüfen Sie Ihre Zahlungsinformationen und versuchen Sie es
          erneut.
        </p>

        <div className="mt-8 flex justify-center gap-3">
          <Link
            href="/checkout/payment"
            className="rounded-lg bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
          >
            Erneut versuchen
          </Link>
          <Link
            href="/"
            className="rounded-lg border border-gray-300 px-6 py-3 hover:bg-gray-50"
          >
            Zur Startseite
          </Link>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-600">
            Benötigen Sie Hilfe? Kontaktieren Sie unseren{" "}
            <Link href="/contact" className="text-blue-600 hover:underline">
              Kundendienst
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
