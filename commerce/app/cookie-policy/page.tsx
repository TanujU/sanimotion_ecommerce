"use client";

import Link from "next/link";

export default function CookiePolicyPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white shadow-lg rounded-lg p-8 mb-8">
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <svg
                className="w-6 h-6 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Cookie Policy
              </h1>
              <p className="text-gray-600">
                Last updated: {new Date().toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="bg-white shadow-lg rounded-lg p-8">
          <div className="prose prose-lg max-w-none">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              What Are Cookies?
            </h2>
            <p className="text-gray-700 mb-6">
              Cookies are small text files that are placed on your computer or
              mobile device when you visit our website. They are widely used to
              make websites work more efficiently and to provide information to
              website owners.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              How We Use Cookies
            </h2>
            <p className="text-gray-700 mb-4">
              Sanimotion uses cookies for several purposes to enhance your
              experience on our medical equipment e-commerce platform:
            </p>

            <div className="space-y-6">
              {/* Essential Cookies */}
              <div className="border-l-4 border-blue-500 pl-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Essential Cookies
                </h3>
                <p className="text-gray-700 mb-3">
                  These cookies are necessary for the website to function
                  properly and cannot be disabled.
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>
                    <strong>Authentication:</strong> Remember your login status
                    and session information
                  </li>
                  <li>
                    <strong>Security:</strong> Protect against cross-site
                    request forgery (CSRF) attacks
                  </li>
                  <li>
                    <strong>Cart Management:</strong> Remember items in your
                    shopping cart
                  </li>
                  <li>
                    <strong>Form Data:</strong> Preserve form data during
                    checkout process
                  </li>
                </ul>
              </div>

              {/* Functional Cookies */}
              <div className="border-l-4 border-green-500 pl-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Functional Cookies
                </h3>
                <p className="text-gray-700 mb-3">
                  These cookies enhance your experience by remembering your
                  preferences and settings.
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>
                    <strong>Language Preferences:</strong> Remember your
                    preferred language
                  </li>
                  <li>
                    <strong>Currency Settings:</strong> Display prices in your
                    preferred currency
                  </li>
                  <li>
                    <strong>User Preferences:</strong> Remember your display
                    preferences and settings
                  </li>
                  <li>
                    <strong>Welcome Messages:</strong> Control display of
                    welcome popups and notifications
                  </li>
                </ul>
              </div>

              {/* Analytics Cookies */}
              <div className="border-l-4 border-yellow-500 pl-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Analytics Cookies
                </h3>
                <p className="text-gray-700 mb-3">
                  These cookies help us understand how visitors interact with
                  our website.
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>
                    <strong>Page Views:</strong> Track which pages are most
                    popular
                  </li>
                  <li>
                    <strong>User Behavior:</strong> Understand how users
                    navigate our site
                  </li>
                  <li>
                    <strong>Performance:</strong> Monitor website performance
                    and loading times
                  </li>
                  <li>
                    <strong>Error Tracking:</strong> Identify and fix technical
                    issues
                  </li>
                </ul>
              </div>

              {/* Marketing Cookies */}
              <div className="border-l-4 border-purple-500 pl-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Marketing Cookies
                </h3>
                <p className="text-gray-700 mb-3">
                  These cookies are used to deliver relevant advertisements and
                  track marketing campaigns.
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>
                    <strong>Ad Targeting:</strong> Show relevant medical
                    equipment advertisements
                  </li>
                  <li>
                    <strong>Campaign Tracking:</strong> Measure effectiveness of
                    marketing campaigns
                  </li>
                  <li>
                    <strong>Retargeting:</strong> Show ads to users who have
                    visited our site
                  </li>
                  <li>
                    <strong>Social Media:</strong> Enable sharing on social
                    media platforms
                  </li>
                </ul>
              </div>
            </div>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4 mt-8">
              Cookie Duration
            </h2>
            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <ul className="space-y-3 text-gray-700">
                <li>
                  <strong>Session Cookies:</strong> Deleted when you close your
                  browser
                </li>
                <li>
                  <strong>Persistent Cookies:</strong> Remain on your device for
                  a set period (typically 30 days to 2 years)
                </li>
                <li>
                  <strong>Authentication Cookies:</strong> Expire after 7 days
                  of inactivity
                </li>
                <li>
                  <strong>Preference Cookies:</strong> Last for 1 year
                </li>
              </ul>
            </div>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Managing Your Cookie Preferences
            </h2>
            <p className="text-gray-700 mb-4">
              You have several options for managing cookies:
            </p>

            <div className="space-y-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-semibold text-blue-900 mb-2">
                  Browser Settings
                </h4>
                <p className="text-blue-800 text-sm">
                  Most browsers allow you to control cookies through their
                  settings. You can block all cookies, accept only first-party
                  cookies, or delete existing cookies.
                </p>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h4 className="font-semibold text-green-900 mb-2">
                  Cookie Consent Banner
                </h4>
                <p className="text-green-800 text-sm">
                  When you first visit our site, you'll see a cookie consent
                  banner where you can choose which types of cookies to accept.
                </p>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h4 className="font-semibold text-yellow-900 mb-2">
                  Opt-Out Links
                </h4>
                <p className="text-yellow-800 text-sm">
                  For third-party cookies, you can often opt out directly
                  through the service provider's website.
                </p>
              </div>
            </div>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4 mt-8">
              Third-Party Cookies
            </h2>
            <p className="text-gray-700 mb-4">
              We may use third-party services that set their own cookies:
            </p>

            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Service
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Purpose
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Privacy Policy
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      Google Analytics
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      Website analytics and performance monitoring
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <a
                        href="https://policies.google.com/privacy"
                        className="text-blue-600 hover:text-blue-800"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Google Privacy Policy
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      Supabase
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      Authentication and database services
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <a
                        href="https://supabase.com/privacy"
                        className="text-blue-600 hover:text-blue-800"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Supabase Privacy Policy
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      Payment Processors
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      Secure payment processing
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <span className="text-gray-500">Varies by processor</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4 mt-8">
              Medical Data Privacy
            </h2>
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
              <h4 className="font-semibold text-red-900 mb-2">
                Important Notice
              </h4>
              <p className="text-red-800 text-sm">
                As a medical equipment supplier, we understand the importance of
                data privacy in healthcare. We do not collect or store any
                patient medical information through cookies. All cookie data is
                used solely for website functionality and user experience
                enhancement.
              </p>
            </div>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Updates to This Policy
            </h2>
            <p className="text-gray-700 mb-6">
              We may update this Cookie Policy from time to time to reflect
              changes in our practices or for other operational, legal, or
              regulatory reasons. We will notify you of any material changes by
              posting the updated policy on our website.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Contact Us
            </h2>
            <p className="text-gray-700 mb-4">
              If you have any questions about our use of cookies or this Cookie
              Policy, please contact us:
            </p>

            <div className="bg-gray-50 rounded-lg p-6">
              <div className="space-y-2 text-gray-700">
                <p>
                  <strong>Email:</strong> privacy@sanimotion.com
                </p>
                <p>
                  <strong>Phone:</strong> +1 (555) 123-4567
                </p>
                <p>
                  <strong>Address:</strong> 123 Medical Equipment Drive,
                  Healthcare City, HC 12345
                </p>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
                <div>
                  <p className="text-sm text-gray-600">
                    This Cookie Policy is part of our broader Privacy Policy and
                    Terms of Service.
                  </p>
                </div>
                <div className="flex space-x-4">
                  <Link
                    href="/privacy-policy"
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    Privacy Policy
                  </Link>
                  <Link
                    href="/terms-of-service"
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    Terms of Service
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
