"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface CookiePreferences {
  essential: boolean;
  functional: boolean;
  analytics: boolean;
  marketing: boolean;
}

export function CookieConsentBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const pathname = usePathname();
  const [preferences, setPreferences] = useState<CookiePreferences>({
    essential: true, // Always true, cannot be disabled
    functional: false,
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    // Don't show cookie banner on cookie policy page
    if (pathname === "/cookie-policy") {
      return;
    }

    // Temporarily show banner for testing (ignore localStorage)
    // const cookieConsent = localStorage.getItem("cookie-consent");
    // if (!cookieConsent) {
    // Show banner after a short delay
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1000);
    return () => clearTimeout(timer);
    // }
  }, [pathname]);

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

  if (!isVisible) {
    // Temporary: Add a button to reset cookie consent for testing
    return (
      <div className="fixed top-4 right-4 z-50">
        <button
          onClick={() => {
            localStorage.removeItem("cookie-consent");
            localStorage.removeItem("cookie-consent-date");
            setIsVisible(true);
          }}
          className="px-3 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600"
        >
          Show Cookie Banner
        </button>
      </div>
    );
  }

  return (
    <div
      className={`fixed inset-0 z-50 flex justify-center p-4 ${showPreferences ? "items-end pb-4" : "items-center"}`}
    >
      {/* Blurred Background */}
      <div className="absolute inset-0 bg-black/20 backdrop-blur-md" />

      {/* Modal Content */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full">
        <div className="px-6 py-6">
          {!showPreferences ? (
            // Main consent banner
            <div className="space-y-6">
              <div className="text-center">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Wir verwenden Cookies, um Ihre Erfahrung zu verbessern
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Wir verwenden Cookies, um Ihr Browsing-Erlebnis zu verbessern,
                  personalisierte Inhalte bereitzustellen und unseren Traffic zu
                  analysieren. Durch Klicken auf "Alle akzeptieren" stimmen Sie
                  der Verwendung von Cookies zu. Sie können Ihre Einstellungen
                  verwalten oder mehr in unserer{" "}
                  <Link
                    href="/cookie-policy"
                    className="text-blue-600 hover:text-blue-800 underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Cookie-Richtlinieerfahren
                  </Link>
                  .
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={() => setShowPreferences(true)}
                  className="px-6 py-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                >
                  Einstellungen verwalten
                </button>
                <button
                  onClick={handleRejectAll}
                  className="px-6 py-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                >
                  Alle ablehnen
                </button>
                <button
                  onClick={handleAcceptAll}
                  className="px-6 py-3 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                >
                  Alle akzeptieren
                </button>
              </div>
            </div>
          ) : (
            // Detailed preferences panel
            <div className="space-y-4 pb-2">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-semibold text-gray-900">
                  Cookie-Einstellungen
                </h3>
                <button
                  onClick={() => setShowPreferences(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg
                    className="w-4 h-4"
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {/* Essential Cookies */}
                <div className="bg-white border border-gray-200 rounded-lg p-3 shadow-sm">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 pr-3">
                      <h4 className="font-semibold text-gray-900 text-sm mb-1">
                        Notwendige Cookies
                      </h4>
                      <p className="text-xs text-gray-600 mb-2">
                        Erforderlich für die grundlegende Website-Funktionalität
                      </p>
                      <p className="text-xs text-gray-500 leading-relaxed">
                        Diese Cookies sind für das Funktionieren der Website
                        notwendig und können nicht deaktiviert werden.
                      </p>
                    </div>
                    <div className="flex flex-col items-center space-y-1">
                      <div className="w-10 h-5 bg-blue-600 rounded-full flex items-center justify-end px-1">
                        <div className="w-3 h-3 bg-white rounded-full shadow-sm"></div>
                      </div>
                      <span className="text-xs text-gray-500 font-medium">
                        Immer aktiv
                      </span>
                    </div>
                  </div>
                </div>

                {/* Functional Cookies */}
                <div className="bg-white border border-gray-200 rounded-lg p-3 shadow-sm">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 pr-3">
                      <h4 className="font-semibold text-gray-900 text-sm mb-1">
                        Funktionale Cookies
                      </h4>
                      <p className="text-xs text-gray-600 mb-2">
                        Verbessern Ihre Erfahrung und Einstellungen
                      </p>
                      <p className="text-xs text-gray-500 leading-relaxed">
                        Merken sich Ihre Sprache, Währung und andere
                        Einstellungen.
                      </p>
                    </div>
                    <div className="flex flex-col items-center space-y-1">
                      <button
                        onClick={() =>
                          handlePreferenceChange(
                            "functional",
                            !preferences.functional
                          )
                        }
                        className={`w-10 h-5 rounded-full flex items-center transition-all duration-200 ${
                          preferences.functional
                            ? "bg-blue-600 justify-end"
                            : "bg-gray-300 justify-start"
                        }`}
                      >
                        <div className="w-3 h-3 bg-white rounded-full mx-0.5 shadow-sm"></div>
                      </button>
                      <span className="text-xs text-gray-500 font-medium">
                        {preferences.functional ? "Aktiv" : "Inaktiv"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Analytics Cookies */}
                <div className="bg-white border border-gray-200 rounded-lg p-3 shadow-sm">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 pr-3">
                      <h4 className="font-semibold text-gray-900 text-sm mb-1">
                        Analyse-Cookies
                      </h4>
                      <p className="text-xs text-gray-600 mb-2">
                        Helfen uns zu verstehen, wie die Website genutzt wird
                      </p>
                      <p className="text-xs text-gray-500 leading-relaxed">
                        Sammeln anonyme Daten über die Nutzung unserer Website.
                      </p>
                    </div>
                    <div className="flex flex-col items-center space-y-1">
                      <button
                        onClick={() =>
                          handlePreferenceChange(
                            "analytics",
                            !preferences.analytics
                          )
                        }
                        className={`w-10 h-5 rounded-full flex items-center transition-all duration-200 ${
                          preferences.analytics
                            ? "bg-blue-600 justify-end"
                            : "bg-gray-300 justify-start"
                        }`}
                      >
                        <div className="w-3 h-3 bg-white rounded-full mx-0.5 shadow-sm"></div>
                      </button>
                      <span className="text-xs text-gray-500 font-medium">
                        {preferences.analytics ? "Aktiv" : "Inaktiv"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Marketing Cookies */}
                <div className="bg-white border border-gray-200 rounded-lg p-3 shadow-sm">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 pr-3">
                      <h4 className="font-semibold text-gray-900 text-sm mb-1">
                        Marketing-Cookies
                      </h4>
                      <p className="text-xs text-gray-600 mb-2">
                        Zeigen relevante Werbung an
                      </p>
                      <p className="text-xs text-gray-500 leading-relaxed">
                        Werden verwendet, um personalisierte Werbung zu liefern
                        und Kampagnen zu verfolgen.
                      </p>
                    </div>
                    <div className="flex flex-col items-center space-y-1">
                      <button
                        onClick={() =>
                          handlePreferenceChange(
                            "marketing",
                            !preferences.marketing
                          )
                        }
                        className={`w-10 h-5 rounded-full flex items-center transition-all duration-200 ${
                          preferences.marketing
                            ? "bg-blue-600 justify-end"
                            : "bg-gray-300 justify-start"
                        }`}
                      >
                        <div className="w-3 h-3 bg-white rounded-full mx-0.5 shadow-sm"></div>
                      </button>
                      <span className="text-xs text-gray-500 font-medium">
                        {preferences.marketing ? "Aktiv" : "Inaktiv"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-200">
                <button
                  onClick={handleRejectAll}
                  className="px-6 py-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                >
                  Alle ablehnen
                </button>
                <button
                  onClick={handleAcceptAll}
                  className="px-6 py-3 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                >
                  Alle akzeptieren
                </button>
                <button
                  onClick={handleSavePreferences}
                  className="px-6 py-3 text-sm font-medium text-white bg-green-600 border border-transparent rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors"
                >
                  Einstellungen speichern
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
