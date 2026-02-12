import { motion, AnimatePresence } from "framer-motion";
import { X, Loader2, MapPin } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";

interface Props {
  open: boolean;
  onClose: () => void;
}

const CheckoutModal = ({ open, onClose }: Props) => {
  const { items, total } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [step, setStep] = useState<"address" | "confirm">("address");

  const [address, setAddress] = useState({
    name: "",
    phone: "",
    city: "",
    street: "",
    apartment: "",
    zip: "",
  });

  const isAddressValid =
    address.name.trim() && address.phone.trim() && address.city.trim() && address.street.trim();

  const handleCheckout = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data, error: fnError } = await supabase.functions.invoke("create-payment", {
        body: {
          items: items.map((i) => ({
            productId: i.product.id,
            quantity: i.quantity,
          })),
        },
      });

      if (fnError) throw fnError;
      if (data?.url) {
        window.location.href = data.url;
      } else {
        throw new Error("No checkout URL returned");
      }
    } catch (e: any) {
      setError(e.message || "Ошибка при создании оплаты");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setStep("address");
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
                {step === "address" ? "Адрес доставки" : "Оформление заказа"}
              </h2>
              <button onClick={handleClose} className="rounded-md p-1 text-muted-foreground hover:text-foreground">
                <X className="h-5 w-5" />
              </button>
            </div>

            {step === "address" ? (
              <div className="space-y-4">
                <div className="flex items-center gap-2 rounded-lg border border-border bg-secondary px-4 py-3">
                  <MapPin className="h-5 w-5 text-primary" />
                  <p className="text-sm text-muted-foreground">Укажите адрес для доставки заказа</p>
                </div>

                <div className="grid gap-3">
                  <input
                    type="text"
                    placeholder="ФИО получателя *"
                    value={address.name}
                    onChange={(e) => setAddress({ ...address, name: e.target.value })}
                    className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                  <input
                    type="tel"
                    placeholder="Телефон *"
                    value={address.phone}
                    onChange={(e) => setAddress({ ...address, phone: e.target.value })}
                    className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                  <input
                    type="text"
                    placeholder="Город *"
                    value={address.city}
                    onChange={(e) => setAddress({ ...address, city: e.target.value })}
                    className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                  <input
                    type="text"
                    placeholder="Улица, дом *"
                    value={address.street}
                    onChange={(e) => setAddress({ ...address, street: e.target.value })}
                    className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="Квартира / офис"
                      value={address.apartment}
                      onChange={(e) => setAddress({ ...address, apartment: e.target.value })}
                      className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                    <input
                      type="text"
                      placeholder="Индекс"
                      value={address.zip}
                      onChange={(e) => setAddress({ ...address, zip: e.target.value })}
                      className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                  </div>
                </div>

                <button
                  onClick={() => setStep("confirm")}
                  disabled={!isAddressValid}
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary py-3 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
                >
                  Продолжить к оплате
                </button>
              </div>
            ) : (
              <>
                <div className="mb-4 rounded-lg border border-border bg-secondary p-4">
                  <p className="mb-2 text-xs font-medium text-muted-foreground">Доставка:</p>
                  <p className="text-sm text-foreground">
                    {address.name}, {address.phone}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {address.city}, {address.street}
                    {address.apartment ? `, кв. ${address.apartment}` : ""}
                    {address.zip ? `, ${address.zip}` : ""}
                  </p>
                  <button
                    onClick={() => setStep("address")}
                    className="mt-2 text-xs font-medium text-primary hover:underline"
                  >
                    Изменить адрес
                  </button>
                </div>

                <div className="mb-6 rounded-lg border border-border bg-secondary p-4">
                  {items.map((item) => (
                    <div key={item.product.id} className="flex justify-between text-sm">
                      <span className="text-foreground">
                        {item.product.name} × {item.quantity}
                      </span>
                      <span className="font-medium text-foreground">${item.product.price * item.quantity}</span>
                    </div>
                  ))}
                  <div className="mt-3 flex justify-between border-t border-border pt-3 text-base font-bold text-foreground">
                    <span>Итого</span>
                    <span>${total}</span>
                  </div>
                </div>

                {error && (
                  <p className="mb-4 rounded-lg bg-destructive/10 p-3 text-sm text-destructive">{error}</p>
                )}

                <button
                  onClick={handleCheckout}
                  disabled={loading}
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary py-3 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70"
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" /> Перенаправление...
                    </>
                  ) : (
                    `Оплатить · $${total}`
                  )}
                </button>

                <p className="mt-3 text-center text-xs text-muted-foreground">
                  Вы будете перенаправлены на безопасную страницу оплаты Stripe
                </p>
              </>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CheckoutModal;
