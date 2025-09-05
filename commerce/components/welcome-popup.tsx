"use client";

import { useState, useEffect } from "react";

export function WelcomePopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    // Show popup after 3 seconds
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsVisible(false);
      setIsClosing(false);
    }, 300);
  };

  const handleSignup = () => {
    // Redirect to signup page or open signup modal
    window.location.href = "/signup";
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ${
          isClosing ? 'opacity-0' : 'opacity-100'
        }`}
        onClick={handleClose}
      />
      
      {/* Popup */}
      <div 
        className={`relative bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 transform transition-all duration-300 ${
          isClosing ? 'scale-95 opacity-0' : 'scale-100 opacity-100'
        }`}
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors duration-200"
        >
          <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Content */}
        <div className="p-8 text-center">
          {/* Icon */}
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
            </svg>
          </div>

          {/* Title */}
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            Welcome to Sanimotion!
          </h3>
          
          {/* Subtitle */}
          <p className="text-gray-600 mb-6">
            Get started with our premium medical supplies
          </p>

          {/* Promo Code */}
          <div className="bg-gradient-to-r from-gray-50 to-green-50 border-2 border-dashed border-gray-300 rounded-lg p-4 mb-6">
            <p className="text-sm text-gray-600 mb-1">Your exclusive welcome offer:</p>
            <div className="flex items-center justify-center space-x-2">
              <span className="text-2xl font-bold text-gray-900">WELCOME50</span>
              <span className="text-lg font-semibold text-green-600">€50 OFF</span>
            </div>
            <p className="text-xs text-gray-500 mt-1">Valid on orders over €100</p>
          </div>

          {/* CTA Button */}
          <button
            onClick={handleSignup}
            className="w-full bg-gray-900 hover:bg-black text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 mb-3"
          >
            Sign Up & Claim Offer
          </button>

          {/* Terms */}
          <p className="text-xs text-gray-400">
            By signing up, you agree to our terms and conditions
          </p>
        </div>
      </div>
    </div>
  );
}
