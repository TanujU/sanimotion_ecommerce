"use client";

import { PlusIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { addItem } from "components/cart/actions";
import { ProductWithVariants as Product, ProductVariant } from "lib/types";
import { useActionState } from "react";
import { useCart } from "./cart-context";

function SubmitButton({
  availableForSale,
  selectedVariantId,
  pending,
  compact = false,
}: {
  availableForSale: boolean;
  selectedVariantId: string | undefined;
  pending: boolean;
  compact?: boolean;
}) {
  // Compact mode - small button with text
  if (compact) {
    const compactClasses =
      "flex items-center justify-center rounded-full bg-blue-600 text-white shadow-md hover:shadow-lg transition-all hover:scale-105 px-4 py-2 text-xs font-medium";
    const disabledClasses = "cursor-not-allowed opacity-60 hover:opacity-60 hover:scale-100";

    if (!availableForSale || !selectedVariantId) {
      return (
        <button
          aria-label="Nicht verfügbar"
          disabled
          className={clsx(compactClasses, disabledClasses)}
        >
          <PlusIcon className="h-4 w-4 mr-1" />
          In den Warenkorb
        </button>
      );
    }

    return (
      <button
        aria-label="In den Warenkorb"
        disabled={pending}
        className={clsx(compactClasses, {
          "opacity-60": pending,
        })}
      >
        <PlusIcon className="h-4 w-4 mr-1" />
        {pending ? "Hinzufügen..." : "In den Warenkorb"}
      </button>
    );
  }

  // Full mode - button with text
  const buttonClasses =
    "relative flex w-auto items-center justify-center rounded-full bg-blue-600 px-6 py-2 tracking-wide text-white text-sm";
  const disabledClasses = "cursor-not-allowed opacity-60 hover:opacity-60";

  if (!availableForSale) {
    return (
      <button disabled className={clsx(buttonClasses, disabledClasses)}>
        Nicht verfügbar
      </button>
    );
  }

  if (!selectedVariantId) {
    return (
      <button
        aria-label="Bitte wählen Sie eine Option"
        disabled
        className={clsx(buttonClasses, disabledClasses)}
      >
        <div className="absolute left-0 ml-8">
          <PlusIcon className="h-4" />
        </div>
        In den Warenkorb
      </button>
    );
  }

  return (
    <button
      aria-label="In den Warenkorb"
      disabled={pending}
      className={clsx(buttonClasses, {
        "hover:opacity-90": !pending,
        "opacity-60": pending,
      })}
    >
      <div className="absolute left-0 ml-2">
        <PlusIcon className="h-4" />
      </div>
      {pending ? "Wird hinzugefügt..." : "In den Warenkorb"}
    </button>
  );
}

export function AddToCart({ product, compact = false }: { product: Product; compact?: boolean }) {
  const { variants, availableForSale } = product;
  const { addCartItem } = useCart();
  const [message, formAction, pending] = useActionState(addItem, null);

  // For simplicity, just use the first variant if available
  const selectedVariantId = variants.length > 0 ? variants[0]?.id : undefined;
  const selectedVariant = variants.find((v) => v.id === selectedVariantId);

  const handleSubmit = async () => {
    if (selectedVariant) {
      // Optimistically add to cart
      addCartItem(selectedVariant, product);
    }
    // Then call the server action
    formAction(selectedVariantId);
  };

  return (
    <form action={handleSubmit}>
      <SubmitButton
        availableForSale={availableForSale}
        selectedVariantId={selectedVariantId}
        pending={pending}
        compact={compact}
      />
      {message && !compact && (
        <p
          aria-live="polite"
          className="mt-2 text-sm text-red-600"
          role="status"
        >
          {message}
        </p>
      )}
    </form>
  );
}
