import { X, Trash2, ShoppingBag } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import CheckoutModal from "./CheckoutModal";

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
}

const CartDrawer = ({ open, onClose }: CartDrawerProps) => {
  const { items, total, remove } = useCart();
  const [showCheckout, setShowCheckout] = useState(false);

  return (
    <>
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-foreground"
              onClick={onClose}
            />
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 26, stiffness: 200 }}
              className="fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-background shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-border px-6 py-4">
                <h2 className="text-lg font-bold text-foreground">Корзина</h2>
                <button onClick={onClose} className="rounded-md p-1 text-muted-foreground hover:text-foreground">
                  <X className="h-5 w-5" />
                </button>
              </div>

              {items.length === 0 ? (
                <div className="flex flex-1 flex-col items-center justify-center gap-3 text-muted-foreground">
                  <ShoppingBag className="h-12 w-12" />
                  <p>Корзина пуста</p>
                </div>
              ) : (
                <>
                  <div className="flex-1 overflow-y-auto p-6">
                    <div className="space-y-4">
                      {items.map((item) => (
                        <div
                          key={item.product.id}
                          className="flex items-center gap-4 rounded-lg border border-border bg-card p-3"
                        >
                          <img
                            src={item.product.image}
                            alt={item.product.name}
                            className="h-16 w-16 rounded-md bg-secondary object-contain p-1"
                          />
                          <div className="flex-1">
                            <p className="font-medium text-card-foreground">{item.product.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {item.quantity} × ${item.product.price}
                            </p>
                          </div>
                          <button
                            onClick={() => remove(item.product.id)}
                            className="rounded-md p-2 text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="border-t border-border p-6">
                    <div className="mb-4 flex items-center justify-between text-lg font-bold text-foreground">
                      <span>Итого:</span>
                      <span>${total}</span>
                    </div>
                    <button
                      onClick={() => {
                        onClose();
                        setShowCheckout(true);
                      }}
                      className="w-full rounded-lg bg-primary py-3 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.02] active:scale-[0.98]"
                    >
                      Оформить заказ
                    </button>
                  </div>
                </>
              )}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
      <CheckoutModal open={showCheckout} onClose={() => setShowCheckout(false)} />
    </>
  );
};

export default CartDrawer;
