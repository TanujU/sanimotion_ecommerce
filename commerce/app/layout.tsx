import { CartProvider } from "components/cart/cart-context";
import { Navbar } from "components/layout/navbar";
import { WelcomeToast } from "components/welcome-toast";
import { GeistSans } from "geist/font/sans";
import { getCart } from "lib/shopify";
import { ReactNode } from "react";
import { Toaster } from "sonner";
import { AuthProvider } from "lib/auth-context";
import { SessionWarningModal } from "components/session-warning";
import { CookieConsentBanner } from "components/cookie-consent-banner";

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
  // Don't await the fetch, pass the Promise to the context provider
  const cart = getCart();

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
          <CartProvider cartPromise={cart}>
            <Navbar />
            <main className="pt-0">
              {children}
              <SafeToaster closeButton />
              <WelcomeToast />
              <SessionWarningModal />
              <CookieConsentBanner />
            </main>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
