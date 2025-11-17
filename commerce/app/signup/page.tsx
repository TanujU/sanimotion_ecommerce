"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import LogoSquare from "components/logo-square";
import { useRouter } from "next/navigation";
import { useAuth } from "../../lib/auth-context";
import {
  useToast,
  ToastContainer,
} from "../../components/ui/toast-notifications";

export default function SignupPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    phoneNumber: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const router = useRouter();
  const { signUp, user } = useAuth();
  const { showSuccess, showError, toasts, removeToast } = useToast();

  useEffect(() => {
    setIsVisible(true);
    // Redirect if already logged in
    if (user) {
      const urlParams = new URLSearchParams(window.location.search);
      const redirectTo = urlParams.get("redirectTo") || "/";
      try {
        sessionStorage.removeItem("checkout_redirect_ts");
      } catch {}
      router.replace(redirectTo);
    }
  }, [user, router]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Validate password confirmation
    if (formData.password !== formData.confirmPassword) {
      showError(
        "Passwörter stimmen nicht überein",
        "Die Passwörter stimmen nicht überein. Bitte stellen Sie sicher, dass beide Felder identisch sind."
      );
      setError("Die Passwörter stimmen nicht überein");
      setIsLoading(false);
      return;
    }

    try {
      const { error } = await signUp(
        formData.email,
        formData.password,
        formData.name,
        formData.phoneNumber
      );

      if (error) {
        // Handle different types of errors
        let errorMessage = "Konto konnte nicht erstellt werden";

        if (error.message) {
          errorMessage = error.message;
        } else if (typeof error === "string") {
          errorMessage = error;
        } else if (error.details) {
          errorMessage = error.details;
        } else if (error.hint) {
          errorMessage = error.hint;
        }

        if (errorMessage.includes("User already registered")) {
          showError(
            "Konto existiert bereits",
            "Für diese E-Mail existiert bereits ein Konto. Bitte melden Sie sich an."
          );
        } else if (errorMessage.includes("Password should be at least")) {
          showError(
            "Schwaches Passwort",
            "Bitte wählen Sie ein stärkeres Passwort mit mindestens 6 Zeichen."
          );
        } else {
          showError("Registrierung fehlgeschlagen", errorMessage);
        }

        setError(errorMessage);
      } else {
        showSuccess(
          "Konto erstellt!",
          "Bitte prüfen Sie Ihre E-Mail und klicken Sie auf den Bestätigungslink, um Ihr Konto zu aktivieren."
        );
        // Redirect to intended page after successful signup
        setTimeout(() => {
          const urlParams = new URLSearchParams(window.location.search);
          const redirectTo = urlParams.get("redirectTo") || "/checkout";
          try {
            sessionStorage.removeItem("checkout_redirect_ts");
          } catch {}
          router.replace(redirectTo);
        }, 1200);
      }
    } catch (err) {
      console.error("Signup error:", err);
      showError(
        "Registrierung fehlgeschlagen",
        "Ein unerwarteter Fehler ist aufgetreten. Bitte versuchen Sie es erneut."
      );
      setError(
        "Ein unerwarteter Fehler ist aufgetreten. Bitte versuchen Sie es erneut."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 lg:pl-20 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-50 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gray-50 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <div
        className={`max-w-md w-full space-y-8 relative z-10 transform transition-all duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
        }`}
      >
        {/* Header */}
        <div className="text-center">
          <Link href="/" className="inline-block group">
            <div className="mx-auto mb-2 transition-all duration-300 group-hover:scale-105">
              <LogoSquare />
            </div>
          </Link>
          <h2 className="text-2xl font-light text-gray-800 animate-fade-in-up">
            Erstellen Sie Ihr Konto
          </h2>
          <p className="mt-2 text-sm text-gray-600 animate-fade-in-up animation-delay-200">
            Schließen Sie sich tausenden Fachkräften im Gesundheitswesen an
          </p>
        </div>

        {/* Form */}
        <div className="bg-white/95 backdrop-blur-xl py-8 px-6 shadow-2xl rounded-2xl border border-white/30 animate-slide-up">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Vollständiger Name *
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-all duration-300 hover:border-gray-300 hover:shadow-md"
                placeholder="Max Mustermann"
              />
            </div>

            <div>
              <label
                htmlFor="phoneNumber"
                className="block text-sm font-medium text-gray-700"
              >
                Telefonnummer
              </label>
              <input
                id="phoneNumber"
                name="phoneNumber"
                type="tel"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-all duration-300 hover:border-gray-300 hover:shadow-md"
                placeholder="+49 151 2345678"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                E-Mail-Adresse *
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-all duration-300 hover:border-gray-300 hover:shadow-md"
                placeholder="max@beispiel.de"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Passwort *
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-all duration-300 hover:border-gray-300 hover:shadow-md"
                placeholder="••••••••"
              />
              <p className="mt-1 text-xs text-gray-500">
                Mindestens 6 Zeichen lang
              </p>
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700"
              >
                Passwort bestätigen *
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-all duration-300 hover:border-gray-300 hover:shadow-md"
                placeholder="••••••••"
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm animate-shake">
                <div className="font-medium">{error}</div>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-lg text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
            >
              {isLoading ? (
                <div className="flex items-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Konto wird erstellt...
                </div>
              ) : (
                "Konto erstellen"
              )}
            </button>
          </form>

          {/* Link to login */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Bereits ein Konto?{" "}
              <Link
                href="/login"
                className="text-blue-600 hover:text-blue-700 font-medium transition-all duration-300 hover:scale-105"
              >
                Anmelden
              </Link>
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-sm text-gray-500">
          <p>
            Mit der Erstellung eines Kontos stimmen Sie unseren{" "}
            <Link
              href="/terms"
              className="text-blue-600 hover:text-blue-700 transition-colors duration-300"
            >
              Nutzungsbedingungen
            </Link>{" "}
            und{" "}
            <Link
              href="/privacy"
              className="text-blue-600 hover:text-blue-700 transition-colors duration-300"
            >
              Datenschutzbestimmungen
            </Link>
          </p>
        </div>
      </div>

      {/* Toast Notifications */}
      <ToastContainer toasts={toasts} onRemoveToast={removeToast} />
    </div>
  );
}
