import { CartProvider } from "components/cart/cart-context";
import { Navbar } from "components/layout/navbar";
import { GeistSans } from "geist/font/sans";
import { getCart } from "lib/cart";
import { ReactNode } from "react";
import { Toaster } from "sonner";
import { AuthProvider } from "lib/auth-context";
import { SessionWarningModal } from "components/session-warning";
import { CookieConsentBanner } from "components/cookie-consent-banner";
import { FavoritesProvider } from "lib/favorites-context";
import { GlobalToastProvider } from "lib/global-toast";

// Type-safe Toaster for React 19 compatibility
const SafeToaster = ({
  closeButton,
  ...props
}: {
  closeButton?: boolean;
  [key: string]: any;
}) => {
  const ToasterComponent = Toaster as any;
  return <ToasterComponent closeButton={closeButton} {...props} />;
};
import "./globals.css";
import { baseUrl } from "lib/utils";
import Script from "next/script";

const { SITE_NAME } = process.env;

export const metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: SITE_NAME!,
    template: `%s | ${SITE_NAME}`,
  },
  robots: {
    follow: true,
    index: true,
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Get cart as Promise for context provider
  const cart = Promise.resolve(getCart());

  return (
    <html lang="de" className={GeistSans.variable} suppressHydrationWarning>
      <head>
        <Script id="hydration-fix" strategy="beforeInteractive">
          {`
            // Prevent hydration mismatch by ensuring consistent rendering
            if (typeof window !== 'undefined') {
              // Remove any browser extension attributes that might cause issues
              const html = document.documentElement;
              const body = document.body;
              
              // Clean up potential hydration issues
              if (html.hasAttribute('data-qb-installed')) {
                html.removeAttribute('data-qb-installed');
              }
              
              // Ensure consistent language
              if (html.lang !== 'en') {
                html.lang = 'en';
              }
            }
          `}
        </Script>
        <Script id="scroll-fix" strategy="beforeInteractive">
          {`
            // Simple scroll restoration prevention
            (function() {
              // Disable browser scroll restoration
              if ('scrollRestoration' in history) {
                history.scrollRestoration = 'manual';
              }
            })();
          `}
        </Script>
      </head>
      <body
        className="bg-neutral-50 text-black selection:bg-teal-300"
        suppressHydrationWarning
      >
        <AuthProvider>
          <FavoritesProvider>
            <GlobalToastProvider>
              <CartProvider cartPromise={cart}>
                <Navbar />
                <main className="relative z-10">
                  {children}
                  <SafeToaster closeButton />
                  <SessionWarningModal />
                  <CookieConsentBanner />
                </main>
              </CartProvider>
            </GlobalToastProvider>
          </FavoritesProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
