"use client";

import { useFavorites } from "lib/favorites-context";
import { useAuth } from "lib/auth-context";
import { useRouter } from "next/navigation";

interface FavoriteButtonProps {
  product: {
    id: string;
    title: string;
    price: string;
    sizes: string[];
    image: string;
    alt: string;
  };
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function FavoriteButton({
  product,
  className = "",
  size = "md",
}: FavoriteButtonProps) {
  const { toggleFavorite, isFavorite } = useFavorites();
  const { user, loading } = useAuth();
  const router = useRouter();

  const sizeClasses = {
    sm: "w-6 h-6",
    md: "w-8 h-8",
    lg: "w-10 h-10",
  };

  const iconSizes = {
    sm: "w-3 h-3",
    md: "w-4 h-4",
    lg: "w-5 h-5",
  };

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        // Verify auth only when attempting to add/remove favorite
        if (!loading && !user) {
          try {
            const redirect =
              typeof window !== "undefined" ? window.location.pathname : "/";
            router.push(`/login?redirectTo=${encodeURIComponent(redirect)}`);
          } catch {
            router.push("/login");
          }
          return;
        }
        toggleFavorite(product);
      }}
      className={`${sizeClasses[size]} bg-white/80 hover:bg-white rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 ${
        isFavorite(product.id) ? "text-red-500" : "text-gray-600"
      } ${className}`}
      aria-label={
        isFavorite(product.id) ? "Remove from favorites" : "Add to favorites"
      }
    >
      <svg
        className={iconSizes[size]}
        fill={isFavorite(product.id) ? "currentColor" : "none"}
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
        />
      </svg>
    </button>
  );
}
