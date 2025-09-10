"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useAuth } from "../lib/auth-context";

export function WelcomeToast() {
  const [mounted, setMounted] = useState(false);
  const { user, loading } = useAuth();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    // Only show toast if user is not logged in and not loading
    if (loading || user) return;

    // ignore if screen height is too small
    if (window.innerHeight < 650) return;
    if (!document.cookie.includes("welcome-toast=2")) {
      toast("🏥 Welcome to Medical Equipment Store!", {
        id: "welcome-toast",
        duration: Infinity,
        onDismiss: () => {
          document.cookie = "welcome-toast=2; max-age=31536000; path=/";
        },
        description: (
          <>
            Professional medical equipment and healthcare supplies for
            healthcare professionals.{" "}
            <a href="/search" className="text-blue-600 hover:underline">
              Browse Equipment
            </a>
            .
          </>
        ),
      });
    }
  }, [mounted, user, loading]);

  // Don't render anything until mounted to prevent hydration mismatch
  if (!mounted) return null;

  return null;
}
