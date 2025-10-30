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

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const router = useRouter();
  const { signIn, user, loading } = useAuth();
  const { showSuccess, showError, toasts, removeToast } = useToast();

  useEffect(() => {
    setIsVisible(true);
    // Redirect if already logged in
    if (user) {
      const urlParams = new URLSearchParams(window.location.search);
      const redirectTo = urlParams.get("redirectTo") || "/";
      try { sessionStorage.removeItem("checkout_redirect_ts"); } catch {}
      router.replace(redirectTo);
    }

    // Check for success message from password reset
    const urlParams = new URLSearchParams(window.location.search);
    const message = urlParams.get("message");
    if (message === "password_reset_success") {
      showSuccess(
        "Passwort erfolgreich zurückgesetzt",
        "Ihr Passwort wurde zurückgesetzt. Bitte melden Sie sich mit Ihrem neuen Passwort an."
      );
      // Clean up the URL
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, [user, router, showSuccess]);

  // Show loading state while auth is initializing
  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <svg
            className="animate-spin h-8 w-8 text-blue-600"
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
          <span className="text-gray-600">Loading...</span>
        </div>
      </div>
    );
  }

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

    try {
      const result = await signIn(formData.email, formData.password);

      if (result.error) {
        const errorMessage = result.error.message || result.error;

        if (
          errorMessage.includes("Invalid login credentials") ||
          errorMessage.includes("Invalid email or password")
        ) {
          showError(
            "Sign In Failed",
            "Invalid email or password. Please check your credentials and try again."
          );
        } else if (errorMessage.includes("Email not confirmed")) {
          showError(
            "Email Not Verified",
            "Please check your email and click the verification link before signing in."
          );
        } else if (errorMessage.includes("Too many login attempts")) {
          showError("Too Many Attempts", errorMessage);
        } else if (
          errorMessage.includes("Please enter a valid email address")
        ) {
          showError("Invalid Email", "Please enter a valid email address.");
        } else if (errorMessage.includes("Password is required")) {
          showError("Password Required", "Please enter your password.");
        } else {
          showError("Sign In Failed", errorMessage);
        }
        setError(errorMessage);
      } else if (result.success) {
        showSuccess("Welcome Back!", "You have successfully signed in.");
        // Redirect to intended page after successful login
        setTimeout(() => {
          const urlParams = new URLSearchParams(window.location.search);
          const redirectTo = urlParams.get("redirectTo") || "/checkout";
          try { sessionStorage.removeItem("checkout_redirect_ts"); } catch {}
          router.replace(redirectTo);
        }, 800);
      } else {
        showError(
          "Sign In Failed",
          "An unexpected error occurred. Please try again."
        );
        setError("An unexpected error occurred. Please try again.");
      }
    } catch (err) {
      console.error("Login error:", err);
      showError(
        "Sign In Failed",
        "An unexpected error occurred. Please try again."
      );
      setError("An unexpected error occurred. Please try again.");
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
            Willkommen zurück
          </h2>
          <p className="mt-2 text-sm text-gray-600 animate-fade-in-up animation-delay-200">
            Melden Sie sich an, um auf Ihr Dashboard zuzugreifen
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
                Passwort
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
                  Anmeldung...
                </div>
              ) : (
                "Anmelden"
              )}
            </button>
          </form>

          {/* Link to signup */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Noch kein Konto?{" "}
              <Link
                href="/signup"
                className="text-blue-600 hover:text-blue-700 font-medium transition-all duration-300 hover:scale-105"
              >
                Registrieren
              </Link>
            </p>
          </div>

          {/* Forgot password */}
          <div className="mt-4 text-center">
            <Link
              href="/forgot-password"
              className="text-sm text-gray-500 hover:text-gray-700 transition-all duration-300 hover:scale-105"
            >
              Passwort vergessen?
            </Link>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-sm text-gray-500">
          <p>
            Mit Ihrer Anmeldung stimmen Sie unseren{" "}
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
