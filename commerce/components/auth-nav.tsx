"use client";

import { useAuth } from "../lib/auth-context";
import Link from "next/link";

interface AuthNavProps {
  isMobile?: boolean;
  onMobileMenuClose?: () => void;
}

export function AuthNav({ isMobile = false, onMobileMenuClose }: AuthNavProps) {
  const { user, loading, signOut } = useAuth();

  if (loading) {
    return (
      <li className="flex items-center justify-center h-11 w-11">
        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-900"></div>
      </li>
    );
  }

  if (user) {
    return (
      <>
        {/* Profile link */}
        <li
          className={`transform transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:translate-x-2 ${
            !isMobile ? "opacity-100 translate-x-0" : ""
          }`}
          style={{ transitionDelay: !isMobile ? "0.4s" : "0s" }}
        >
        <div className="flex items-center">
          {/* Profile Icon - Left of PROFILE text */}
          <div className="mr-3 transition-all duration-300 hover:scale-105">
            <svg
              className="w-5 h-5 text-black hover:text-blue-600 transition-colors duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </div>
          <Link
            href="/profile"
            className={`transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group ${
              isMobile
                ? "flex items-center px-6 py-4 text-gray-700 hover:text-blue-600 hover:bg-blue-50/80 rounded-xl text-base font-medium hover:shadow-lg hover:scale-105 w-full"
                : "text-black hover:text-blue-600 text-sm font-medium tracking-wider uppercase hover:scale-105"
            }`}
            onClick={() => {
              if (onMobileMenuClose) onMobileMenuClose();
            }}
            title="Profile"
          >
            {isMobile ? (
              <>
                <svg
                  className="w-5 h-5 mr-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                PROFILE
              </>
            ) : (
              "PROFILE"
            )}
          </Link>
        </div>
        </li>

        {/* Logout option - visible when logged in */}
        <li
          className={`transform transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:translate-x-2 ${
            !isMobile ? "opacity-100 translate-x-0" : ""
          }`}
          style={{ transitionDelay: !isMobile ? "0.5s" : "0s" }}
        >
          <div className="flex items-center">
            {/* Logout Icon - Left of LOGOUT text */}
            <div className="mr-3 transition-all duration-300 hover:scale-105">
              <svg
                className="w-5 h-5 text-black hover:text-red-600 transition-colors duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
            </div>
            <button
              onClick={async () => {
                await signOut();
                if (onMobileMenuClose) onMobileMenuClose();
              }}
              className={`transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group ${
                isMobile
                  ? "flex items-center px-6 py-4 text-gray-700 hover:text-red-600 hover:bg-red-50/80 rounded-xl text-base font-medium hover:shadow-lg hover:scale-105 w-full"
                  : "text-black hover:text-red-600 text-sm font-medium tracking-wider uppercase hover:scale-105"
              }`}
            >
              {isMobile && (
                <svg
                  className="w-5 h-5 mr-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
              )}
              LOGOUT
            </button>
          </div>
        </li>
      </>
    );
  }

  return (
    <>
      {/* Login link */}
      <li
        className={`transform transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:translate-x-2 ${
          !isMobile ? "opacity-100 translate-x-0" : ""
        }`}
        style={{ transitionDelay: !isMobile ? "0.3s" : "0s" }}
      >
        <div className="flex items-center">
          {/* Login Icon - Left of LOGIN text */}
          <div className="mr-3 transition-all duration-300 hover:scale-105">
            <svg
              className="w-5 h-5 text-black hover:text-blue-600 transition-colors duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
              />
            </svg>
          </div>
          <Link
            href="/login"
            className={`transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group ${
              isMobile
                ? "flex items-center px-6 py-4 text-gray-700 hover:text-blue-600 hover:bg-blue-50/80 rounded-xl text-base font-medium hover:shadow-lg hover:scale-105"
                : "text-black hover:text-blue-600 text-sm font-medium tracking-wider uppercase hover:scale-105"
            }`}
            onClick={() => onMobileMenuClose && onMobileMenuClose()}
          >
            {isMobile && (
              <svg
                className="w-5 h-5 mr-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            )}
            LOGIN
          </Link>
        </div>
      </li>

      {/* Signup link - Commented out since signup is available from login page */}
      {/* <li
        className={`transform transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:translate-x-2 ${
          !isMobile ? "opacity-100 translate-x-0" : ""
        }`}
        style={{ transitionDelay: !isMobile ? "0.35s" : "0s" }}
      >
        <Link
          href="/signup"
          className={`transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group ${
            isMobile
              ? "flex items-center px-6 py-4 text-gray-700 hover:text-blue-600 hover:bg-blue-50/80 rounded-xl text-base font-medium hover:shadow-lg hover:scale-105"
              : "text-black hover:text-blue-600 text-sm font-medium tracking-wider uppercase hover:scale-105"
          }`}
          onClick={() => onMobileMenuClose && onMobileMenuClose()}
        >
          {isMobile && (
            <svg
              className="w-5 h-5 mr-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
              />
            </svg>
          )}
          SIGNUP
        </Link>
      </li> */}
    </>
  );
}
