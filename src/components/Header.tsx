import { ShoppingCart, Smartphone } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { motion, AnimatePresence } from "framer-motion";

interface HeaderProps {
  onCartOpen: () => void;
}

const Header = ({ onCartOpen }: HeaderProps) => {
  const { count } = useCart();

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-lg">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Smartphone className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold tracking-tight text-foreground">TechStore</span>
        </div>

        <nav className="hidden gap-8 md:flex">
          <a href="#product" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
            Каталог
          </a>
          <a href="#about" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
            Доставка
          </a>
        </nav>

        <button
          onClick={onCartOpen}
          className="relative flex items-center gap-2 rounded-lg bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground transition-colors hover:bg-accent"
        >
          <ShoppingCart className="h-5 w-5" />
          <span className="hidden sm:inline">Корзина</span>
          <AnimatePresence>
            {count > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground"
              >
                {count}
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>
    </header>
  );
};

export default Header;
