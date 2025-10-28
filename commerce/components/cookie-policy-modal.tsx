"use client";

import { useState, useEffect } from "react";
import { XMarkIcon, ShieldCheckIcon } from "@heroicons/react/24/outline";

// Type-safe icon components for React 19 compatibility
const SafeXMarkIcon = (props: any) => {
  const IconComponent = XMarkIcon as any;
  return <IconComponent {...props} />;
};

const SafeShieldCheckIcon = (props: any) => {
  const IconComponent = ShieldCheckIcon as any;
  return <IconComponent {...props} />;
};

export default function CookiePolicyModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isAccepted, setIsAccepted] = useState(false);

  useEffect(() => {
    // Check if user has already accepted cookies
    const cookieAccepted = localStorage.getItem("cookiePolicyAccepted");
    if (!cookieAccepted) {
      // Show modal after a short delay
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookiePolicyAccepted", "true");
    setIsAccepted(true);
    setIsOpen(false);
  };

  const handleDecline = () => {
    localStorage.setItem("cookiePolicyAccepted", "false");
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      {/* Blurred Background */}
      <div
        className="absolute inset-0 bg-black/20 backdrop-blur-md"
        onClick={handleDecline}
      />

      {/* Modal Content */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-green-100 rounded-full">
              <SafeShieldCheckIcon className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                Cookie Policy
              </h2>
              <p className="text-sm text-gray-600">EU GDPR Compliant</p>
            </div>
          </div>
          <button
            onClick={handleDecline}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <SafeXMarkIcon className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* EU Compliance Highlight */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-bold">EU</span>
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-blue-900 mb-1">
                  GDPR Compliance
                </h3>
                <p className="text-sm text-blue-800">
                  We comply with EU General Data Protection Regulation (GDPR)
                  and respect your privacy rights.
                </p>
              </div>
            </div>
          </div>

          {/* Cookie Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">
              How We Use Cookies
            </h3>

            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <h4 className="font-medium text-gray-900">
                    Essential Cookies
                  </h4>
                  <p className="text-sm text-gray-600">
                    Required for basic website functionality, shopping cart, and
                    user authentication.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <h4 className="font-medium text-gray-900">
                    Analytics Cookies
                  </h4>
                  <p className="text-sm text-gray-600">
                    Help us understand how visitors interact with our website to
                    improve user experience.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-purple-600 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <h4 className="font-medium text-gray-900">
                    Marketing Cookies
                  </h4>
                  <p className="text-sm text-gray-600">
                    Used to deliver relevant advertisements and measure campaign
                    effectiveness.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Privacy Rights */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-semibold text-gray-900 mb-2">
              Your Privacy Rights (EU GDPR)
            </h4>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• Right to access your personal data</li>
              <li>• Right to rectification of inaccurate data</li>
              <li>• Right to erasure ("right to be forgotten")</li>
              <li>• Right to restrict processing</li>
              <li>• Right to data portability</li>
              <li>• Right to object to processing</li>
            </ul>
          </div>

          {/* Contact Information */}
          <div className="text-sm text-gray-600">
            <p>
              For questions about our cookie policy or to exercise your privacy
              rights, contact us at{" "}
              <a
                href="mailto:privacy@sanimotion.com"
                className="text-blue-600 hover:underline"
              >
                privacy@sanimotion.com
              </a>
            </p>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex flex-col sm:flex-row gap-3 p-6 border-t border-gray-200 bg-gray-50">
          <button
            onClick={handleDecline}
            className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
          >
            Decline Non-Essential
          </button>
          <button
            onClick={handleAccept}
            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Accept All Cookies
          </button>
        </div>
      </div>
    </div>
  );
}
