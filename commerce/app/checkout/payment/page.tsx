"use client";

import { useEffect, useState } from "react";
import {
  ChevronLeftIcon,
  CreditCardIcon,
  LockClosedIcon,
} from "@heroicons/react/24/outline";
import { useCart } from "components/cart/cart-context";
import Price from "components/price";
import { useAuth } from "lib/auth-context";
import { useRouter } from "next/navigation";

export default function PaymentPage() {
  const { cart } = useCart();
  const { user, loading } = useAuth();
  const router = useRouter();
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [info, setInfo] = useState<{ email?: string; address?: string } | null>(null);
  useEffect(() => {
    try {
      const saved = localStorage.getItem("checkout_info");
      const parsed = saved ? JSON.parse(saved) : {};
      setInfo({
        email: parsed.email || user?.email || "",
        address: parsed.address
          ? `${parsed.address}${parsed.apartment ? ", " + parsed.apartment : ""}, ${parsed.zipCode || ""} ${parsed.city || ""}, ${parsed.country || ""}`
          : undefined,
      });
    } catch {
      setInfo({ email: user?.email || "" });
    }
  }, [user?.email]);

  // No auth guard here; auth is checked only when clicking Pay Now
  const [cardData, setCardData] = useState({
    number: "",
    name: "",
    expiry: "",
    cvc: "",
  });

  const handleCardChange = (field: string, value: string) => {
    setCardData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Verify auth only when attempting to pay
    if (!loading && !user) {
      if (typeof window !== "undefined") {
        window.location.href = `/login?redirectTo=${encodeURIComponent("/checkout/payment")}`;
      }
      return;
    }
    (async () => {
      try {
        const saved = (() => {
          try {
            return JSON.parse(localStorage.getItem("checkout_info") || "{}");
          } catch {
            return {} as any;
          }
        })();

        // Call backend to send order email
        await fetch("/api/order", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            toEmail: (saved?.email || user?.email) as string,
            subject: "Payment Successful - Order Placed",
            text: `Payment successful. Your order totaling €${(cart?.totalPrice || 0).toFixed(2)} has been placed.`,
            html: `<h2>Payment Successful</h2><p>Thank you for your order.</p><p>Order total: <strong>€${(cart?.totalPrice || 0).toFixed(2)}</strong></p>`,
          }),
        });

        // Optional: clear local cart after placing order
        try {
          localStorage.removeItem("cart");
        } catch {}

        router.push("/checkout-success");
      } catch (err) {
        console.error(err);
        router.push("/checkout-success");
      }
    })();
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 lg:pl-20">
      <div className="mx-auto max-w-7xl px-4 py-8">
        {/* Breadcrumb */}
        <div className="mb-8">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <span className="text-blue-600">Information</span>
            <span className="text-gray-400">{">"}</span>
            <span className="text-blue-600">Versand</span>
            <span className="text-gray-400">{">"}</span>
            <span className="text-blue-600">Zahlung</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Column - Order Summary & Payment Form */}
          <div className="lg:col-span-2 space-y-8">
            {/* Order Summary Information */}
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <div className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <div>
                    <p className="text-sm text-gray-600">Kontakt</p>
                    <p className="font-medium">{info?.email || ""}</p>
                  </div>
                  <button className="text-blue-600 text-sm hover:underline">
                    Ändern
                  </button>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <div>
                    <p className="text-sm text-gray-600">Versenden an</p>
                    <p className="font-medium">{info?.address || "Adresse eingeben"}</p>
                  </div>
                  <button className="text-blue-600 text-sm hover:underline">
                    Ändern
                  </button>
                </div>
                <div className="flex justify-between items-center py-2">
                  <div>
                    <p className="text-sm text-gray-600">Versandmethode</p>
                    <p className="font-medium">Standard · €6,90</p>
                  </div>
                  <button className="text-blue-600 text-sm hover:underline">
                    Ändern
                  </button>
                </div>
              </div>
            </div>

            {/* Payment Section */}
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <h2 className="text-xl font-semibold mb-2">Zahlung</h2>
              <p className="text-sm text-gray-600 mb-6">
                Alle Transaktionen sind sicher und verschlüsselt.
              </p>

              <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                <div className="text-center">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-gray-300">
                    <CreditCardIcon className="h-8 w-8 text-gray-400" />
                  </div>
                  <p className="text-gray-600 font-medium">
                    Dieser Shop kann derzeit keine Zahlungen akzeptieren.
                  </p>
                </div>
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between">
              <button
                onClick={() => window.history.back()}
                className="flex items-center text-blue-600 hover:underline"
              >
                <ChevronLeftIcon className="h-4 w-4 mr-1" />
                Zurück zum Versand
              </button>
              <button
                onClick={handleSubmit as any}
                className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium"
              >
                Jetzt bezahlen
              </button>
            </div>
          </div>

          {/* Right Column - Order Summary (from cart) */}
          <div className="lg:col-span-2">
            <div className="bg-gray-50 rounded-lg p-6 sticky top-8 border border-gray-200">
              <h2 className="text-xl font-semibold mb-4">Bestellübersicht</h2>
              {(!cart || !cart.items || cart.items.length === 0) && (
                <p className="text-sm text-gray-600">Ihr Warenkorb ist leer.</p>
              )}
              {cart?.items?.map((item, idx) => (
                <div key={idx} className="flex items-center space-x-4 mb-4">
                  <div className="relative">
                    <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center overflow-hidden">
                      {item.productImageUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={item.productImageUrl}
                          alt={item.productName}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-12 h-12 bg-white rounded" />
                      )}
                    </div>
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center">
                      <span className="text-xs text-white font-medium">
                        {item.quantity}
                      </span>
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium truncate">{item.productName}</h3>
                    <p className="text-xs text-gray-600 truncate">{item.productHandle}</p>
                  </div>
                  <div className="text-right">
                    <Price amount={String(item.totalPrice.toFixed(2))} currencyCode="EUR" />
                  </div>
                </div>
              ))}

              <div className="border-t border-gray-300 pt-4 space-y-2">
                <div className="flex justify-between">
                  <span>Zwischensumme</span>
                  <span>
                    <Price amount={String((cart?.totalPrice || 0).toFixed(2))} currencyCode="EUR" />
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Versand</span>
                  <span className="text-gray-500">Wird im vorherigen Schritt berechnet</span>
                </div>
                <div className="flex justify-between text-lg font-semibold pt-2 border-t border-gray-300">
                  <span>Gesamt</span>
                  <span>
                    <Price amount={String((cart?.totalPrice || 0).toFixed(2))} currencyCode="EUR" />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
