"use client";

import { useState } from "react";
import {
  ChevronLeftIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";

type CheckoutStep = "information" | "shipping" | "payment";

export default function CheckoutPage() {
  const [currentStep, setCurrentStep] = useState<CheckoutStep>("information");
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    apartment: "",
    city: "",
    state: "Bayern",
    zipCode: "",
    country: "Deutschland",
    saveInfo: false,
    emailNews: false,
  });

  const steps = [
    { id: "information", name: "Information" },
    { id: "shipping", name: "Versand" },
    { id: "payment", name: "Zahlung" },
  ];

  const currentStepIndex = steps.findIndex((step) => step.id === currentStep);

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleContinue = () => {
    if (currentStep === "information") {
      window.location.href = "/checkout/shipping";
    } else if (currentStep === "shipping") {
      window.location.href = "/checkout/payment";
    }
  };

  const handleBack = () => {
    if (currentStep === "shipping") {
      window.location.href = "/checkout";
    } else if (currentStep === "payment") {
      window.location.href = "/checkout/shipping";
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 lg:pl-20">
      <div className="mx-auto max-w-7xl px-4 py-8">
        {/* Breadcrumb */}
        <div className="mb-8">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <span
                  className={
                    index <= currentStepIndex
                      ? "text-blue-600"
                      : "text-gray-400"
                  }
                >
                  {step.name}
                </span>
                {index < steps.length - 1 && (
                  <span className="mx-2 text-gray-400">{">"}</span>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Column - Forms */}
          <div className="lg:col-span-2 space-y-8">
            {/* Contact Section */}
            <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
              <h2 className="text-xl font-semibold mb-4">Kontakt</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    E-Mail oder Mobiltelefonnummer
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                    placeholder="Ihre E-Mail oder Telefonnummer eingeben"
                  />
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="emailNews"
                    checked={formData.emailNews}
                    onChange={(e) =>
                      handleInputChange("emailNews", e.target.checked)
                    }
                    className="mr-3"
                  />
                  <label htmlFor="emailNews" className="text-sm">
                    E-Mail mit Neuigkeiten und Angeboten senden
                  </label>
                </div>
              </div>
            </div>

            {/* Shipping Address Section */}
            <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
              <h2 className="text-xl font-semibold mb-4">Lieferadresse</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Land/Region
                  </label>
                  <select
                    value={formData.country}
                    onChange={(e) =>
                      handleInputChange("country", e.target.value)
                    }
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                  >
                    <option value="Deutschland">Deutschland</option>
                    <option value="Österreich">Österreich</option>
                    <option value="Schweiz">Schweiz</option>
                    <option value="Frankreich">Frankreich</option>
                    <option value="Italien">Italien</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Vorname (optional)
                    </label>
                    <input
                      type="text"
                      value={formData.firstName}
                      onChange={(e) =>
                        handleInputChange("firstName", e.target.value)
                      }
                      className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Nachname
                    </label>
                    <input
                      type="text"
                      value={formData.lastName}
                      onChange={(e) =>
                        handleInputChange("lastName", e.target.value)
                      }
                      className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Adresse
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={formData.address}
                      onChange={(e) =>
                        handleInputChange("address", e.target.value)
                      }
                      className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none pr-10"
                      placeholder="Ihre Adresse eingeben"
                    />
                    <MagnifyingGlassIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Wohnung, Suite, etc. (optional)
                  </label>
                  <input
                    type="text"
                    value={formData.apartment}
                    onChange={(e) =>
                      handleInputChange("apartment", e.target.value)
                    }
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Stadt
                    </label>
                    <input
                      type="text"
                      value={formData.city}
                      onChange={(e) =>
                        handleInputChange("city", e.target.value)
                      }
                      className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Bundesland
                    </label>
                    <select
                      value={formData.state}
                      onChange={(e) =>
                        handleInputChange("state", e.target.value)
                      }
                      className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                    >
                      <option value="Bayern">Bayern</option>
                      <option value="Berlin">Berlin</option>
                      <option value="Hamburg">Hamburg</option>
                      <option value="Hessen">Hessen</option>
                      <option value="Nordrhein-Westfalen">
                        Nordrhein-Westfalen
                      </option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      PLZ
                    </label>
                    <input
                      type="text"
                      value={formData.zipCode}
                      onChange={(e) =>
                        handleInputChange("zipCode", e.target.value)
                      }
                      className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="saveInfo"
                    checked={formData.saveInfo}
                    onChange={(e) =>
                      handleInputChange("saveInfo", e.target.checked)
                    }
                    className="mr-3"
                  />
                  <label htmlFor="saveInfo" className="text-sm">
                    Diese Informationen für das nächste Mal speichern
                  </label>
                </div>
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between">
              {currentStep !== "information" && (
                <button
                  onClick={handleBack}
                  className="flex items-center px-6 py-3 bg-gray-200 hover:bg-gray-300 rounded-lg transition-colors"
                >
                  <ChevronLeftIcon className="h-5 w-5 mr-2" />
                  Zurück
                </button>
              )}
              <button
                onClick={handleContinue}
                className="ml-auto px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium text-white transition-colors"
              >
                {currentStep === "information"
                  ? "Weiter zum Versand"
                  : currentStep === "shipping"
                    ? "Weiter zur Zahlung"
                    : "Bestellung abschließen"}
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
                  <span className="text-gray-500">
                    Wird im nächsten Schritt berechnet
                  </span>
                </div>
                <div className="flex justify-between text-lg font-semibold pt-2 border-t border-gray-300">
                  <span>Gesamt</span>
                  <span>EUR €150,00</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
