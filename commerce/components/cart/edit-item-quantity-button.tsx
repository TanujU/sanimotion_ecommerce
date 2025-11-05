"use client";

import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";
// Safe icon wrappers for React 19 compatibility
const SafePlusIcon = (props: any) => {
  const Icon = PlusIcon as any;
  return <Icon {...props} />;
};
const SafeMinusIcon = (props: any) => {
  const Icon = MinusIcon as any;
  return <Icon {...props} />;
};
import clsx from "clsx";
import { updateItemQuantity } from "components/cart/actions";
import type { CartItem } from "lib/types";
import { useActionState } from "react";
import { useCart } from "./cart-context";
import { useGlobalToast } from "lib/global-toast";

function SubmitButton({ type }: { type: "plus" | "minus" }) {
  return (
    <button
      type="submit"
      aria-label={
        type === "plus" ? "Artikelmenge erhöhen" : "Artikelmenge reduzieren"
      }
      className={clsx(
        "ease flex h-full min-w-[36px] max-w-[36px] flex-none items-center justify-center rounded-full p-2 transition-all duration-200 hover:border-neutral-800 hover:opacity-80",
        {
          "ml-auto": type === "minus",
        }
      )}
    >
      {type === "plus" ? (
        <SafePlusIcon className="h-4 w-4 text-neutral-500" />
      ) : (
        <SafeMinusIcon className="h-4 w-4 text-neutral-500" />
      )}
    </button>
  );
}

export function EditItemQuantityButton({
  item,
  type,
  optimisticUpdate,
}: {
  item: CartItem;
  type: "plus" | "minus";
  optimisticUpdate: any;
}) {
  const [message, formAction] = useActionState(updateItemQuantity, null);
  const { updateCartItem } = useCart();
  const { showSuccess, showInfo } = useGlobalToast();
  const payload = {
    merchandiseId: item.productId,
    quantity: type === "plus" ? item.quantity + 1 : item.quantity - 1,
  };
  const updateItemQuantityAction = formAction.bind(null, payload);

  return (
    <form
      action={async () => {
        // Optimistic local update
        updateCartItem(payload.merchandiseId, type);
        
        // Show toast based on action
        if (type === "plus") {
          showSuccess("Menge erhöht", `${item.productName} (${payload.quantity})`, 2000);
        } else if (payload.quantity === 0) {
          showInfo("Aus Warenkorb entfernt", item.productName, 3000);
        } else {
          showInfo("Menge reduziert", `${item.productName} (${payload.quantity})`, 2000);
        }
        
        // Server sync (best-effort)
        updateItemQuantityAction();
      }}
    >
      <SubmitButton type={type} />
      <p aria-live="polite" className="sr-only" role="status">
        {message}
      </p>
    </form>
  );
}
