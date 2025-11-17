"use client";

import { useEffect, useState } from "react";
import { ChevronLeftIcon, TruckIcon } from "@heroicons/react/24/outline";
import { useCart } from "components/cart/cart-context";
import Price from "components/price";
import { useAuth } from "lib/auth-context";
import { useRouter } from "next/navigation";

export default function ShippingPage() {
  const { cart } = useCart();
  const { user, loading } = useAuth();
  const router = useRouter();
  const [selectedMethod, setSelectedMethod] = useState("standard");
  const [shippingMethods] = useState([
    {
      id: "economy",
      name: "Wirtschaft",
      price: "€4,90",
      time: "5 bis 8 Werktage",
      description: "Günstigster Versand",
    },
    {
      id: "standard",
      name: "Standard",
      price: "€6,90",
      time: "3 bis 4 Werktage",
      description: "Standardversand",
    },
  ]);
  const [info, setInfo] = useState<{ email?: string; address?: string } | null>(
    null
  );
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

  // No auth guard here; allow shipping without login. Auth is enforced at Pay Now.

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
            <span className="text-gray-400">Zahlung</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Column - Shipping Methods */}
          <div className="lg:col-span-2 space-y-8">
            {/* Contact and Shipping Information */}
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
                <div className="flex justify-between items-center py-2">
                  <div>
                    <p className="text-sm text-gray-600">Versenden an</p>
                    <p className="font-medium">
                      {info?.address || "Adresse eingeben"}
                    </p>
                  </div>
                  <button className="text-blue-600 text-sm hover:underline">
                    Ändern
                  </button>
                </div>
              </div>
            </div>

            {/* Shipping Method Section */}
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <h2 className="text-xl font-semibold mb-6">Versandmethode</h2>

              <div className="space-y-0">
                {shippingMethods.map((method, index) => (
                  <div key={method.id}>
                    <div
                      className={`flex items-center justify-between p-4 cursor-pointer transition-colors ${
                        selectedMethod === method.id
                          ? "bg-blue-50 border-blue-500"
                          : "hover:bg-gray-50"
                      }`}
                      onClick={() => setSelectedMethod(method.id)}
                    >
                      <div className="flex items-center">
                        <input
                          type="radio"
                          name="shipping"
                          value={method.id}
                          checked={selectedMethod === method.id}
                          onChange={(e) => setSelectedMethod(e.target.value)}
                          className="mr-4"
                        />
                        <div>
                          <h3 className="font-medium">{method.name}</h3>
                          <p className="text-sm text-gray-600">{method.time}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{method.price}</p>
                      </div>
                    </div>
                    {index < shippingMethods.length - 1 && (
                      <div className="border-b border-gray-200"></div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between">
              <button
                onClick={() => window.history.back()}
                className="flex items-center text-blue-600 hover:underline"
              >
                <ChevronLeftIcon className="h-4 w-4 mr-1" />
                Zurück zur Information
              </button>
              <button
                onClick={() => (window.location.href = "/checkout/payment")}
                className="px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium text-white transition-colors"
              >
                Weiter zur Zahlung
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
                    <p className="text-xs text-gray-600 truncate">
                      {item.productHandle}
                    </p>
                  </div>
                  <div className="text-right">
                    <Price
                      amount={String(item.totalPrice.toFixed(2))}
                      currencyCode="EUR"
                    />
                  </div>
                </div>
              ))}

              <div className="border-t border-gray-300 pt-4 space-y-2">
                <div className="flex justify-between">
                  <span>Zwischensumme</span>
                  <span>
                    <Price
                      amount={String((cart?.totalPrice || 0).toFixed(2))}
                      currencyCode="EUR"
                    />
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Versand</span>
                  <span>
                    {
                      shippingMethods.find((m) => m.id === selectedMethod)
                        ?.price
                    }
                  </span>
                </div>
                <div className="flex justify-between text-lg font-semibold pt-2 border-t border-gray-300">
                  <span>Gesamt</span>
                  <span>
                    {(() => {
                      const base = cart?.totalPrice || 0;
                      const shipping =
                        selectedMethod === "standard" ? 6.9 : 4.9;
                      const total = (base + shipping).toFixed(2);
                      return (
                        <Price amount={String(total)} currencyCode="EUR" />
                      );
                    })()}
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
