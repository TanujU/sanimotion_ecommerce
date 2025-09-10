"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface CookiePreferences {
  essential: boolean;
  functional: boolean;
  analytics: boolean;
  marketing: boolean;
}

export function CookieConsentBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    essential: true, // Always true, cannot be disabled
    functional: false,
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    // Check if user has already made a choice
    const cookieConsent = localStorage.getItem("cookie-consent");
    if (!cookieConsent) {
      // Show banner after a short delay
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcceptAll = () => {
    const allAccepted = {
      essential: true,
      functional: true,
      analytics: true,
      marketing: true,
    };

    localStorage.setItem("cookie-consent", JSON.stringify(allAccepted));
    localStorage.setItem("cookie-consent-date", new Date().toISOString());
    setIsVisible(false);

    // Enable all cookies
    enableCookies(allAccepted);
  };

  const handleRejectAll = () => {
    const onlyEssential = {
      essential: true,
      functional: false,
      analytics: false,
      marketing: false,
    };

    localStorage.setItem("cookie-consent", JSON.stringify(onlyEssential));
    localStorage.setItem("cookie-consent-date", new Date().toISOString());
    setIsVisible(false);

    // Only enable essential cookies
    enableCookies(onlyEssential);
  };

  const handleSavePreferences = () => {
    localStorage.setItem("cookie-consent", JSON.stringify(preferences));
    localStorage.setItem("cookie-consent-date", new Date().toISOString());
    setIsVisible(false);
    setShowPreferences(false);

    // Enable cookies based on preferences
    enableCookies(preferences);
  };

  const enableCookies = (prefs: CookiePreferences) => {
    // This is where you would integrate with your analytics and marketing tools
    // For now, we'll just log the preferences
    console.log("Cookie preferences saved:", prefs);

    // Example: Enable Google Analytics if analytics cookies are accepted
    if (prefs.analytics) {
      // Enable Google Analytics
      console.log("Analytics cookies enabled");
    }

    // Example: Enable marketing cookies if accepted
    if (prefs.marketing) {
      // Enable marketing/advertising cookies
      console.log("Marketing cookies enabled");
    }
  };

  const handlePreferenceChange = (
    type: keyof CookiePreferences,
    value: boolean
  ) => {
    if (type === "essential") return; // Essential cookies cannot be disabled

    setPreferences((prev) => ({
      ...prev,
      [type]: value,
    }));
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-6">
        {!showPreferences ? (
          // Main consent banner
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between space-y-4 lg:space-y-0">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                We use cookies to enhance your experience
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                We use cookies to improve your browsing experience, provide
                personalized content, and analyze our traffic. By clicking
                "Accept All", you consent to our use of cookies. You can manage
                your preferences or learn more in our{" "}
                <Link
                  href="/cookie-policy"
                  className="text-blue-600 hover:text-blue-800 underline"
                >
                  Cookie Policy
                </Link>
                .
              </p>
            </div>

            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 w-full lg:w-auto">
              <button
                onClick={() => setShowPreferences(true)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
              >
                Manage Preferences
              </button>
              <button
                onClick={handleRejectAll}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
              >
                Reject All
              </button>
              <button
                onClick={handleAcceptAll}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
              >
                Accept All
              </button>
            </div>
          </div>
        ) : (
          // Detailed preferences panel
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">
                Cookie Preferences
              </h3>
              <button
                onClick={() => setShowPreferences(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg
                  className="w-5 h-5"
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
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Essential Cookies */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-gray-900">
                      Essential Cookies
                    </h4>
                    <p className="text-sm text-gray-600">
                      Required for basic website functionality
                    </p>
                  </div>
                  <div className="flex items-center">
                    <div className="w-10 h-6 bg-blue-600 rounded-full flex items-center justify-end px-1">
                      <div className="w-4 h-4 bg-white rounded-full"></div>
                    </div>
                    <span className="ml-2 text-sm text-gray-500">
                      Always Active
                    </span>
                  </div>
                </div>
                <p className="text-xs text-gray-500">
                  These cookies are necessary for the website to function and
                  cannot be switched off.
                </p>
              </div>

              {/* Functional Cookies */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-gray-900">
                      Functional Cookies
                    </h4>
                    <p className="text-sm text-gray-600">
                      Enhance your experience and preferences
                    </p>
                  </div>
                  <button
                    onClick={() =>
                      handlePreferenceChange(
                        "functional",
                        !preferences.functional
                      )
                    }
                    className={`w-10 h-6 rounded-full flex items-center transition-colors ${
                      preferences.functional
                        ? "bg-blue-600 justify-end"
                        : "bg-gray-300 justify-start"
                    }`}
                  >
                    <div className="w-4 h-4 bg-white rounded-full mx-1"></div>
                  </button>
                </div>
                <p className="text-xs text-gray-500">
                  Remember your language, currency, and other preferences.
                </p>
              </div>

              {/* Analytics Cookies */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-gray-900">
                      Analytics Cookies
                    </h4>
                    <p className="text-sm text-gray-600">
                      Help us understand website usage
                    </p>
                  </div>
                  <button
                    onClick={() =>
                      handlePreferenceChange(
                        "analytics",
                        !preferences.analytics
                      )
                    }
                    className={`w-10 h-6 rounded-full flex items-center transition-colors ${
                      preferences.analytics
                        ? "bg-blue-600 justify-end"
                        : "bg-gray-300 justify-start"
                    }`}
                  >
                    <div className="w-4 h-4 bg-white rounded-full mx-1"></div>
                  </button>
                </div>
                <p className="text-xs text-gray-500">
                  Collect anonymous data about how you use our website.
                </p>
              </div>

              {/* Marketing Cookies */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-gray-900">
                      Marketing Cookies
                    </h4>
                    <p className="text-sm text-gray-600">
                      Show relevant advertisements
                    </p>
                  </div>
                  <button
                    onClick={() =>
                      handlePreferenceChange(
                        "marketing",
                        !preferences.marketing
                      )
                    }
                    className={`w-10 h-6 rounded-full flex items-center transition-colors ${
                      preferences.marketing
                        ? "bg-blue-600 justify-end"
                        : "bg-gray-300 justify-start"
                    }`}
                  >
                    <div className="w-4 h-4 bg-white rounded-full mx-1"></div>
                  </button>
                </div>
                <p className="text-xs text-gray-500">
                  Used to deliver personalized advertisements and track
                  campaigns.
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 pt-4 border-t border-gray-200">
              <button
                onClick={handleRejectAll}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
              >
                Reject All
              </button>
              <button
                onClick={handleAcceptAll}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
              >
                Accept All
              </button>
              <button
                onClick={handleSavePreferences}
                className="px-4 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors"
              >
                Save Preferences
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
