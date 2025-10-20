"use client";

import { useState } from "react";
import {
  ChevronLeftIcon,
  CreditCardIcon,
  LockClosedIcon,
} from "@heroicons/react/24/outline";

export default function PaymentPage() {
  const [paymentMethod, setPaymentMethod] = useState("card");
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
    // Handle payment submission
    window.location.href = "/checkout-success";
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
                    <p className="font-medium">1919rethika@gmail.com</p>
                  </div>
                  <button className="text-blue-600 text-sm hover:underline">
                    Ändern
                  </button>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <div>
                    <p className="text-sm text-gray-600">Versenden an</p>
                    <p className="font-medium">
                      Musterstraße 123, 80331 München, Deutschland
                    </p>
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
                disabled
                className="px-8 py-3 bg-gray-400 text-white rounded-lg font-medium cursor-not-allowed"
              >
                Jetzt bezahlen
              </button>
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-2">
            <div className="bg-gray-50 rounded-lg p-6 sticky top-8 border border-gray-200">
              <h2 className="text-xl font-semibold mb-4">Bestellübersicht</h2>

              {/* Sample Product */}
              <div className="flex items-center space-x-4 mb-4">
                <div className="relative">
                  <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                    <div className="w-12 h-12 bg-white rounded"></div>
                  </div>
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-xs text-white font-medium">1</span>
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="font-medium">Aqualyx Injektionslösung</h3>
                  <p className="text-sm text-gray-600">30mg / Standard</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">€150,00</p>
                </div>
              </div>

              <div className="border-t border-gray-300 pt-4 space-y-2">
                <div className="flex justify-between">
                  <span>Zwischensumme</span>
                  <span>€150,00</span>
                </div>
                <div className="flex justify-between">
                  <span>Versand</span>
                  <span>€5,00</span>
                </div>
                <div className="flex justify-between text-lg font-semibold pt-2 border-t border-gray-300">
                  <span>Gesamt</span>
                  <span>EUR €155,00</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
