import { motion } from "framer-motion";
import { CheckCircle, Package, ArrowLeft, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const PaymentSuccess = () => (
  <div className="flex min-h-screen flex-col items-center justify-center bg-background p-8">
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative flex max-w-lg flex-col items-center gap-6 text-center"
    >
      {/* Decorative glow */}
      <div className="absolute -top-20 h-40 w-40 rounded-full bg-success/20 blur-3xl" />

      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        className="relative flex h-24 w-24 items-center justify-center rounded-full bg-success/10"
      >
        <CheckCircle className="h-14 w-14 text-success" />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="absolute -right-1 -top-1"
        >
          <Sparkles className="h-6 w-6 text-success" />
        </motion.div>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-4xl font-extrabold tracking-tight text-foreground"
      >
        Спасибо за покупку!
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="text-lg leading-relaxed text-muted-foreground"
      >
        Ваш заказ успешно оформлен. Мы начали обработку и отправим подтверждение на вашу электронную почту.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="flex items-center gap-3 rounded-xl border border-border bg-secondary px-6 py-4"
      >
        <Package className="h-6 w-6 text-primary" />
        <div className="text-left">
          <p className="text-sm font-semibold text-foreground">Доставка</p>
          <p className="text-sm text-muted-foreground">Ожидайте посылку в течение 3–7 рабочих дней</p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <Link
          to="/"
          className="mt-4 inline-flex items-center gap-2 rounded-lg bg-primary px-8 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:scale-105 active:scale-95"
        >
          <ArrowLeft className="h-4 w-4" />
          Вернуться в магазин
        </Link>
      </motion.div>
    </motion.div>
  </div>
);

export default PaymentSuccess;
