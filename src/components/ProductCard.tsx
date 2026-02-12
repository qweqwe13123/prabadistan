import { motion } from "framer-motion";
import { ShoppingCart, Check } from "lucide-react";
import type { Product } from "@/lib/store";
import { useCart } from "@/hooks/useCart";
import { useState } from "react";

const ProductCard = ({ product }: { product: Product }) => {
  const { add } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    add(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <motion.div
      id="product"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm"
    >
      <div className="grid gap-0 md:grid-cols-2">
        {/* Image */}
        <div className="relative flex items-center justify-center bg-secondary p-8">
          {product.badge && (
            <span className="absolute left-4 top-4 rounded-md bg-badge-hot px-3 py-1 text-xs font-bold text-badge-hot-foreground">
              {product.badge}
            </span>
          )}
          <img
            src={product.image}
            alt={product.name}
            className="h-80 w-80 object-contain"
          />
        </div>

        {/* Info */}
        <div className="flex flex-col justify-between p-8">
          <div>
            <p className="mb-1 text-sm font-medium text-muted-foreground">
              {product.storage} · {product.color}
            </p>
            <h2 className="mb-3 text-3xl font-bold text-card-foreground">{product.name}</h2>
            <p className="mb-6 leading-relaxed text-muted-foreground">{product.description}</p>

            <ul className="mb-8 space-y-2">
              {product.specs.map((spec) => (
                <li key={spec} className="flex items-start gap-2 text-sm text-card-foreground">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                  {spec}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <span className="text-3xl font-extrabold text-card-foreground">${product.price}</span>
              {product.oldPrice && (
                <span className="ml-3 text-lg text-old-price line-through">${product.oldPrice}</span>
              )}
            </div>
            <button
              onClick={handleAdd}
              disabled={added}
              className="flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-all hover:scale-105 active:scale-95 disabled:opacity-80"
            >
              {added ? (
                <>
                  <Check className="h-5 w-5" /> Добавлено
                </>
              ) : (
                <>
                  <ShoppingCart className="h-5 w-5" /> В корзину
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
