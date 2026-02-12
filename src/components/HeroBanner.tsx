import { motion } from "framer-motion";
import heroImg from "@/assets/iphone-hero.jpg";

const HeroBanner = () => {
  return (
    <section className="relative overflow-hidden bg-hero text-hero-foreground">
      <img
        src={heroImg}
        alt="iPhone 14 Pro Max"
        className="absolute inset-0 h-full w-full object-cover opacity-60"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-hero/90 via-hero/70 to-transparent" />
      <div className="container relative z-10 flex min-h-[480px] flex-col justify-center py-20">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-2 text-sm font-semibold uppercase tracking-widest text-hero-muted"
        >
          Специальное предложение
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-4 text-4xl font-extrabold leading-tight md:text-6xl"
        >
          iPhone 14 Pro Max
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="mb-6 max-w-md text-lg text-hero-muted"
        >
          1 ТБ памяти. Камера 48 Мп. Dynamic Island. Теперь по невероятной цене.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex items-center gap-4"
        >
          <a
            href="#product"
            className="rounded-lg bg-primary px-8 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:scale-105 active:scale-95"
          >
            Купить за $500
          </a>
          <span className="text-old-price line-through">$599</span>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroBanner;
