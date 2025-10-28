import clsx from "clsx";

interface LogoIconProps {
  siteName?: string;
  className?: string;
}

export default function LogoIcon({ siteName, className }: LogoIconProps) {
  return (
    <div className={clsx("flex items-center space-x-3", className)}>
      {/* Logo Symbol */}
      <div className="relative">
        <svg
          width="36"
          height="36"
          viewBox="0 0 36 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient
              id="logoGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#B8860B" />
              <stop offset="50%" stopColor="#DAA520" />
              <stop offset="100%" stopColor="#FFD700" />
            </linearGradient>
          </defs>

          {/* Outer Circle */}
          <circle
            cx="18"
            cy="18"
            r="16"
            fill="url(#logoGradient)"
            stroke="#B8860B"
            strokeWidth="1"
          />

          {/* Inner Pattern - Stylized V */}
          <path
            d="M12 12 L18 24 L24 12"
            stroke="white"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />

          {/* Decorative Elements */}
          <circle cx="18" cy="10" r="1.5" fill="white" />
          <circle cx="13" cy="14" r="1" fill="white" opacity="0.8" />
          <circle cx="23" cy="14" r="1" fill="white" opacity="0.8" />
        </svg>
      </div>

      {/* Logo Text */}
      <div className="flex flex-col">
        <span className="text-2xl font-bold tracking-wider text-gray-800 leading-none">
          VITALORA
        </span>
        <span className="text-xs text-gray-500 tracking-widest uppercase leading-none mt-0.5">
          Medical Excellence
        </span>
      </div>
    </div>
  );
}
