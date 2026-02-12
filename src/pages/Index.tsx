import { useState } from "react";
import Header from "@/components/Header";
import HeroBanner from "@/components/HeroBanner";
import ProductCard from "@/components/ProductCard";
import CartDrawer from "@/components/CartDrawer";
import Footer from "@/components/Footer";
import { products } from "@/lib/products";

const Index = () => {
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header onCartOpen={() => setCartOpen(true)} />
      <HeroBanner />

      <main className="container py-16">
        <h2 className="mb-8 text-2xl font-bold text-foreground">Рекомендуемые товары</h2>
        <div className="space-y-8">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </main>

      <Footer />
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </div>
  );
};

export default Index;
