import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { useState } from "react";

interface Props {
  open: boolean;
  onClose: () => void;
}

const CheckoutModal = ({ open, onClose }: Props) => {
  const { items, total, clear } = useCart();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    clear();
  };

  const handleClose = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-foreground"
            onClick={handleClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-4 z-50 m-auto h-fit max-h-[90vh] max-w-lg overflow-y-auto rounded-2xl bg-background p-6 shadow-2xl"
          >
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-bold text-foreground">
                {submitted ? "Заказ оформлен!" : "Оформление заказа"}
              </h2>
              <button onClick={handleClose} className="rounded-md p-1 text-muted-foreground hover:text-foreground">
                <X className="h-5 w-5" />
              </button>
            </div>

            {submitted ? (
              <div className="flex flex-col items-center gap-4 py-8 text-center">
                <CheckCircle className="h-16 w-16 text-success" />
                <p className="text-lg font-medium text-foreground">Спасибо за покупку!</p>
                <p className="text-muted-foreground">
                  Мы свяжемся с вами для подтверждения доставки.
                </p>
                <button
                  onClick={handleClose}
                  className="mt-4 rounded-lg bg-primary px-8 py-3 text-sm font-semibold text-primary-foreground"
                >
                  Закрыть
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="mb-4 rounded-lg border border-border bg-secondary p-4">
                  {items.map((item) => (
                    <div key={item.product.id} className="flex justify-between text-sm">
                      <span className="text-foreground">
                        {item.product.name} × {item.quantity}
                      </span>
                      <span className="font-medium text-foreground">${item.product.price * item.quantity}</span>
                    </div>
                  ))}
                  <div className="mt-3 border-t border-border pt-3 text-base font-bold text-foreground flex justify-between">
                    <span>Итого</span>
                    <span>${total}</span>
                  </div>
                </div>

                <input
                  required
                  placeholder="Имя"
                  className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
                <input
                  required
                  type="email"
                  placeholder="Email"
                  className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
                <input
                  required
                  placeholder="Телефон"
                  className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
                <input
                  required
                  placeholder="Адрес доставки"
                  className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />

                <button
                  type="submit"
                  className="w-full rounded-lg bg-primary py-3 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  Подтвердить заказ · ${total}
                </button>
              </form>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CheckoutModal;
