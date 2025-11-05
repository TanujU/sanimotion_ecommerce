"use client";

import { XMarkIcon } from "@heroicons/react/24/outline";
// Safe icon wrapper for React 19 compatibility
const SafeXIcon = (props: any) => {
  const Icon = XMarkIcon as any;
  return <Icon {...props} />;
};
import { removeItem } from "components/cart/actions";
import type { CartItem } from "lib/types";
import { useActionState } from "react";
import { useCart } from "./cart-context";
import { useGlobalToast } from "lib/global-toast";

export function DeleteItemButton({
  item,
  optimisticUpdate,
}: {
  item: CartItem;
  optimisticUpdate: any;
}) {
  const [message, formAction] = useActionState(removeItem, null);
  const { updateCartItem } = useCart();
  const { showInfo } = useGlobalToast();
  const merchandiseId = item.productId;
  const removeItemAction = formAction.bind(null, merchandiseId);

  return (
    <form
      action={async () => {
        // Optimistic local update
        updateCartItem(merchandiseId, "delete");
        // Show toast
        showInfo("Aus Warenkorb entfernt", item.productName, 3000);
        // Server sync (best-effort)
        removeItemAction();
      }}
    >
      <button
        type="submit"
        aria-label="Warenkorb-Artikel entfernen"
        className="flex h-[24px] w-[24px] items-center justify-center rounded-full bg-neutral-500"
      >
        <SafeXIcon className="mx-[1px] h-4 w-4 text-white" />
      </button>
      <p aria-live="polite" className="sr-only" role="status">
        {message}
      </p>
    </form>
  );
}
