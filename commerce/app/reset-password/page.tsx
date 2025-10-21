"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabase";
import {
  useToast,
  ToastContainer,
} from "../../components/ui/toast-notifications";
import { validatePassword } from "../../lib/security/supabase-security";

export default function ResetPasswordPage() {
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [isValidSession, setIsValidSession] = useState(false);
  const [isCheckingSession, setIsCheckingSession] = useState(true);
  const router = useRouter();
  const { showSuccess, showError, toasts, removeToast } = useToast();

  useEffect(() => {
    setIsVisible(true);
    checkPasswordResetSession();
  }, []);

  const checkPasswordResetSession = async () => {
    try {
      // Check if we have a valid password reset session
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      if (error) {
        console.error("Session check error:", error);
        showError(
          "Invalid Link",
          "This password reset link is invalid or has expired. Please request a new one."
        );
        setTimeout(() => {
          router.push("/forgot-password");
        }, 3000);
        return;
      }

      if (session) {
        setIsValidSession(true);
      } else {
        showError(
          "Invalid Link",
          "This password reset link is invalid or has expired. Please request a new one."
        );
        setTimeout(() => {
          router.push("/forgot-password");
        }, 3000);
      }
    } catch (error) {
      console.error("Session check error:", error);
      showError(
        "Invalid Link",
        "This password reset link is invalid or has expired. Please request a new one."
      );
      setTimeout(() => {
        router.push("/forgot-password");
      }, 3000);
    } finally {
      setIsCheckingSession(false);
    }
  };

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
      // Validate passwords match
      if (formData.password !== formData.confirmPassword) {
        showError(
          "Password Mismatch",
          "Passwords do not match. Please try again."
        );
        setError("Passwords do not match");
        return;
      }

      // Validate password strength
      const passwordValidation = validatePassword(formData.password);
      if (!passwordValidation.isValid) {
        showError("Weak Password", passwordValidation.errors.join(", "));
        setError(passwordValidation.errors.join(", "));
        return;
      }

      // Update password using Supabase
      const { error } = await supabase.auth.updateUser({
        password: formData.password,
      });

      if (error) {
        console.error("Password update error:", error);
        showError(
          "Reset Failed",
          error.message || "Failed to reset password. Please try again."
        );
        setError(
          error.message || "Failed to reset password. Please try again."
        );
        return;
      }

      // Success
      showSuccess(
        "Password Reset",
        "Your password has been successfully reset. You can now sign in with your new password."
      );

      // Sign out the user and redirect to login
      await supabase.auth.signOut();

      setTimeout(() => {
        router.push("/login?message=password_reset_success");
      }, 2000);
    } catch (err) {
      console.error("Password reset error:", err);
      showError(
        "Reset Failed",
        "An unexpected error occurred. Please try again."
      );
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Show loading while checking session
  if (isCheckingSession) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 lg:pl-20 relative overflow-hidden">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
              Verifying reset link...
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Please wait while we verify your password reset link.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Show error if session is invalid
  if (!isValidSession) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 lg:pl-20 relative overflow-hidden">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
              <svg
                className="h-6 w-6 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-light text-gray-900 mb-4">
              Invalid Reset Link
            </h2>
            <p className="text-gray-600 mb-6">
              This password reset link is invalid or has expired.
            </p>
            <Link
              href="/forgot-password"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition-colors"
            >
              Request New Reset Link
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
            Set new password
          </h2>
          <p className="mt-2 text-sm text-gray-600 animate-fade-in-up animation-delay-200">
            Enter your new password below
          </p>
        </div>

        {/* Form */}
        <div className="bg-white/95 backdrop-blur-xl py-8 px-6 shadow-2xl rounded-2xl border border-white/30 animate-slide-up">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                New Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-all duration-300 hover:border-gray-300 hover:shadow-md"
                placeholder="Enter new password"
              />
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700"
              >
                Confirm New Password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-all duration-300 hover:border-gray-300 hover:shadow-md"
                placeholder="Confirm new password"
              />
            </div>

            {/* Password Requirements */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="text-sm font-medium text-blue-800 mb-2">
                Password Requirements:
              </h4>
              <ul className="text-xs text-blue-700 space-y-1">
                <li>• At least 8 characters long</li>
                <li>• Contains uppercase and lowercase letters</li>
                <li>• Contains at least one number</li>
                <li>• Contains at least one special character</li>
              </ul>
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
                  Resetting password...
                </div>
              ) : (
                "Reset Password"
              )}
            </button>
          </form>

          {/* Back to login */}
          <div className="mt-6 text-center">
            <Link
              href="/login"
              className="text-blue-600 hover:text-blue-700 text-sm font-medium transition-all duration-300 hover:scale-105"
            >
              Back to Sign In
            </Link>
          </div>
        </div>
      </div>

      {/* Toast Notifications */}
      <ToastContainer toasts={toasts} onRemoveToast={removeToast} />
    </div>
  );
}
