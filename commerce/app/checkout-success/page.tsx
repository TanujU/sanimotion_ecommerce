"use client";

import Link from "next/link";

export default function CheckoutSuccessPage() {
  return (
    <div className="min-h-screen bg-white text-gray-900 lg:pl-20">
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
        <h1 className="text-3xl font-semibold">Order placed successfully</h1>
        <p className="mt-3 text-gray-600">
          Thank you for your purchase. We emailed your confirmation. You can safely
          close this page or continue shopping.
        </p>
        <div className="mt-8 flex justify-center gap-3">
          <Link
            href="/"
            className="rounded-lg bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
          >
            Continue shopping
          </Link>
          <Link
            href="/profile"
            className="rounded-lg border border-gray-300 px-6 py-3 hover:bg-gray-50"
          >
            View orders
          </Link>
        </div>
      </div>
    </div>
  );
}
