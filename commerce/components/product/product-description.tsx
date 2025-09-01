'use client';

import { AddToCart } from 'components/cart/add-to-cart';
import Price from 'components/price';
import Prose from 'components/prose';
import { Product } from 'lib/shopify/types';
import { VariantSelector } from './variant-selector';
import { useState } from 'react';
import { useCart } from 'components/cart/cart-context';

export function ProductDescription({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1);
  const { addCartItem } = useCart();

  const handleIncrement = () => {
    setQuantity(prev => prev + 1);
  };

  const handleDecrement = () => {
    setQuantity(prev => Math.max(1, prev - 1));
  };

  const handleAddToCart = () => {
    if (product.variants && product.variants.length > 0) {
      const variant = product.variants[0];
      if (variant) {
        // Add the item to cart with the selected quantity
        for (let i = 0; i < quantity; i++) {
          addCartItem(variant, product);
        }
      }
    }
  };

  return (
    <>


      {/* Product Title */}
      <div className="mb-4">
        <h1 className="text-3xl font-medium text-black">{product.title}</h1>
      </div>

      {/* Pricing Section */}
      <div className="mb-6">
        <div className="flex items-center space-x-2">
          <span className="text-2xl font-bold text-blue-600">
            <Price
              amount={product.priceRange.maxVariantPrice.amount}
              currencyCode={product.priceRange.maxVariantPrice.currencyCode}
            />
          </span>
          <span className="text-blue-600">*</span>
        </div>
        <div className="mt-2 text-sm text-gray-500">
          Preise inkl. MwSt. zzgl. Versandkosten
        </div>
      </div>





      {/* Quantity Selector and Add to Cart */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Menge:</label>
        <div className="flex items-center space-x-1">
          <button 
            onClick={handleDecrement}
            className="w-10 h-10 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
          >
            <span className="text-lg font-semibold">-</span>
          </button>
          <span className="w-12 text-center text-lg font-medium">{quantity}</span>
          <button 
            onClick={handleIncrement}
            className="w-10 h-10 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
          >
            <span className="text-lg font-semibold">+</span>
          </button>
          <button 
            onClick={handleAddToCart}
            className="ml-4 bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            In den Warenkorb
          </button>
        </div>
      </div>

      {/* Product Information */}
      <div className="border-t border-gray-200 pt-6">
        <div className="space-y-2 text-sm text-gray-600">
          <div>Produktnummer: ART-{product.id}</div>
          <div>Hersteller: {product.title.includes('Croma') ? 'CROMA Pharma GmbH' : 'FREYARU'}</div>
        </div>
      </div>
    </>
  );
}
