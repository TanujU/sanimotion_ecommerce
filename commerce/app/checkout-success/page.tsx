'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { useCart } from 'components/cart/cart-context';

export default function CheckoutSuccessPage() {
  const { setCart } = useCart();
  const hasClearedCart = useRef(false);

  useEffect(() => {
    // Clear the cart only once after successful checkout
    if (!hasClearedCart.current) {
      setCart({
        id: 'mock-cart-id',
        checkoutUrl: '#',
        cost: {
          subtotalAmount: { amount: '0.00', currencyCode: 'EUR' },
          totalAmount: { amount: '0.00', currencyCode: 'EUR' },
          totalTaxAmount: { amount: '0.00', currencyCode: 'EUR' }
        },
        lines: [],
        totalQuantity: 0
      });
      hasClearedCart.current = true;
    }
  }, [setCart]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8 text-center">
        <div className="mb-6">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
            <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Bestellung erfolgreich!</h1>
        <p className="text-gray-600 mb-6">
          Vielen Dank für Ihren Kauf. Ihre Bestellung wurde erfolgreich aufgegeben.
          In einer echten Implementierung würden Sie zu einem Zahlungsanbieter weitergeleitet.
        </p>
        <div className="space-y-3">
          <Link
            href="/"
            className="block w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
          >
            Weiter einkaufen
          </Link>
          <p className="text-sm text-gray-500">
            Dies ist eine Demo-Umgebung. Es wurde keine echte Zahlung abgewickelt.
          </p>
        </div>
      </div>
    </div>
  );
}
