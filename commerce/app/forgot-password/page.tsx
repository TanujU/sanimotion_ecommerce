"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import LogoSquare from "components/logo-square";
import { SupabaseAuthSecurity } from "../../lib/security/supabase-security";
import {
  useToast,
  ToastContainer,
} from "../../components/ui/toast-notifications";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const { showSuccess, showError, toasts, removeToast } = useToast();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // Use secure password reset
      const result = await SupabaseAuthSecurity.securePasswordReset(email);

      if (result.success) {
        showSuccess(
          "E-Mail zum Zurücksetzen gesendet",
          "Bitte prüfen Sie Ihre E-Mail für Anweisungen zum Zurücksetzen des Passworts."
        );
        setIsSubmitted(true);
      } else {
        const errorMessage =
          result.error || result.message || "Zurücksetzen-E-Mail konnte nicht gesendet werden";
        if (errorMessage.includes("User not found")) {
          showError(
            "E-Mail nicht gefunden",
            "Kein Konto mit dieser E-Mail gefunden. Bitte prüfen Sie Ihre E-Mail oder erstellen Sie ein neues Konto."
          );
        } else if (errorMessage.includes("Too many password reset attempts")) {
          showError("Zu viele Versuche", errorMessage);
        } else if (
          errorMessage.includes("Please enter a valid email address")
        ) {
          showError("Ungültige E-Mail", "Bitte geben Sie eine gültige E-Mail-Adresse ein.");
        } else {
          showError("Zurücksetzen fehlgeschlagen", errorMessage);
        }
        setError(errorMessage);
      }
    } catch (err) {
      console.error("Password reset error:", err);
      showError(
        "Zurücksetzen fehlgeschlagen",
        "Ein unerwarteter Fehler ist aufgetreten. Bitte versuchen Sie es erneut."
      );
      setError("Ein unerwarteter Fehler ist aufgetreten. Bitte versuchen Sie es erneut.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
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
          <div className="text-center">
            <Link href="/" className="inline-block group">
              <div className="mx-auto mb-2 transition-all duration-300 group-hover:scale-105">
                <LogoSquare />
              </div>
            </Link>
          </div>

          <div className="bg-white/95 backdrop-blur-xl py-8 px-6 shadow-2xl rounded-2xl border border-white/30 text-center animate-slide-up">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
              <svg
                className="h-6 w-6 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>

            <h2 className="text-2xl font-light text-gray-900 mb-4">
              Bitte prüfen Sie Ihre E-Mail
            </h2>

            <p className="text-gray-600 mb-6">
              Wir haben einen Link zum Zurücksetzen des Passworts an <strong>{email}</strong> gesendet
            </p>

            <p className="text-sm text-gray-500 mb-6">
              Keine E-Mail erhalten? Prüfen Sie Ihren Spam-Ordner oder {" "}
              <button
                onClick={() => {
                  setIsSubmitted(false);
                  setEmail("");
                }}
                className="text-blue-600 hover:text-blue-500 font-medium"
              >
                erneut versuchen
              </button>
            </p>

            <Link
              href="/login"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-blue-600 bg-blue-50 hover:bg-blue-100 transition-colors"
            >
              Zur Anmeldung
            </Link>
          </div>
        </div>
      </div>
    );
  }

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
            <h1 className="text-4xl font-bold text-black mb-2 transition-all duration-300 group-hover:text-blue-600 group-hover:scale-105">
              Sanimotion
            </h1>
          </Link>
          <h2 className="text-2xl font-light text-gray-800 animate-fade-in-up">
            Setzen Sie Ihr Passwort zurück
          </h2>
          <p className="mt-2 text-sm text-gray-600 animate-fade-in-up animation-delay-200">
            Geben Sie Ihre E-Mail-Adresse ein und wir senden Ihnen einen Link zum Zurücksetzen Ihres Passworts
          </p>
        </div>

        {/* Form */}
        <div className="bg-white/95 backdrop-blur-xl py-8 px-6 shadow-2xl rounded-2xl border border-white/30 animate-slide-up">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                E-Mail-Adresse
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-all duration-300 hover:border-gray-300 hover:shadow-md"
                placeholder="max@beispiel.de"
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm animate-shake">
                {error}
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
                  Sende Zurücksetzungslink...
                </div>
              ) : (
                "Zurücksetzungslink senden"
              )}
            </button>
          </form>

          {/* Back to login */}
          <div className="mt-6 text-center">
            <Link
              href="/login"
              className="text-blue-600 hover:text-blue-700 text-sm font-medium transition-all duration-300 hover:scale-105"
            >
              Zur Anmeldung
            </Link>
          </div>
        </div>
      </div>

      {/* Toast Notifications */}
      <ToastContainer toasts={toasts} onRemoveToast={removeToast} />
    </div>
  );
}
