"use client";

import { useState, useEffect } from 'react';
import { sessionManager, SessionWarning } from '../lib/session-manager';

export function SessionWarningModal() {
  const [warning, setWarning] = useState<SessionWarning | null>(null);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Ensure we're on the client side
    setIsClient(true);
    
    if (typeof window === 'undefined') return;

    // Set up warning callback
    sessionManager.setOnWarningCallback((warningData: SessionWarning) => {
      setWarning(warningData);
      setTimeRemaining(warningData.timeRemaining);
    });

    // Set up logout callback
    sessionManager.setOnLogoutCallback(() => {
      setWarning(null);
      // Keep user on current page - no automatic redirect to login
      console.log('Session expired - user remains on current page');
    });

    return () => {
      // Cleanup
      sessionManager.setOnWarningCallback(() => {});
      sessionManager.setOnLogoutCallback(() => {});
    };
  }, []);

  useEffect(() => {
    if (!warning?.showWarning) return;

    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1000) {
          // Time's up, will be handled by session manager
          return 0;
        }
        return prev - 1000;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [warning]);

  const handleExtendSession = () => {
    sessionManager.extendSession();
    setWarning(null);
  };

  const formatTime = (milliseconds: number) => {
    const minutes = Math.floor(milliseconds / 60000);
    const seconds = Math.floor((milliseconds % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  // Don't render on server side
  if (!isClient || !warning?.showWarning) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 p-6">
        <div className="flex items-center mb-4">
          <div className="flex-shrink-0">
            <svg
              className="h-8 w-8 text-yellow-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-lg font-medium text-gray-900">
              Session Timeout Warning
            </h3>
          </div>
        </div>

        <div className="mb-4">
          <p className="text-sm text-gray-600">
            Your session will expire due to inactivity in:
          </p>
          <div className="mt-2 text-center">
            <span className="text-3xl font-bold text-red-600">
              {formatTime(timeRemaining)}
            </span>
          </div>
        </div>

        <div className="mb-4">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-red-600 h-2 rounded-full transition-all duration-1000"
              style={{
                width: `${(timeRemaining / warning.timeRemaining) * 100}%`
              }}
            />
          </div>
        </div>

        <div className="flex space-x-3">
          <button
            onClick={handleExtendSession}
            className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            Stay Logged In
          </button>
          <button
            onClick={() => {
              setWarning(null);
              // Let the session manager handle the logout
            }}
            className="flex-1 bg-gray-300 text-gray-700 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
          >
            Logout Now
          </button>
        </div>

        <div className="mt-4 text-xs text-gray-500 text-center">
          <p>
            For security reasons, you will be automatically logged out after 30 minutes of inactivity.
          </p>
        </div>
      </div>
    </div>
  );
}
