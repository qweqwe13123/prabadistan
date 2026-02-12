import { Smartphone } from "lucide-react";

const Footer = () => (
  <footer className="border-t border-border bg-secondary py-10">
    <div className="container flex flex-col items-center gap-4 text-center">
      <div className="flex items-center gap-2">
        <Smartphone className="h-5 w-5 text-primary" />
        <span className="font-bold text-foreground">TechStore</span>
      </div>
      <p className="text-sm text-muted-foreground">
        © 2026 TechStore. Все права защищены. Быстрая доставка по всему миру.
      </p>
    </div>
  </footer>
);

export default Footer;
