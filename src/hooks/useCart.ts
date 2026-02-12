import { useSyncExternalStore } from "react";
import { cart } from "@/lib/store";

export function useCart() {
  const items = useSyncExternalStore(cart.subscribe, cart.getItems);
  const total = useSyncExternalStore(cart.subscribe, cart.getTotal);
  const count = useSyncExternalStore(cart.subscribe, cart.getCount);

  return { items, total, count, add: cart.add, remove: cart.remove, clear: cart.clear };
}
