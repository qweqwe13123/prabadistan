export interface Product {
  id: string;
  name: string;
  price: number;
  oldPrice?: number;
  image: string;
  description: string;
  specs: string[];
  badge?: string;
  storage: string;
  color: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

// Simple cart state using a singleton pattern
let cartItems: CartItem[] = [];
let listeners: (() => void)[] = [];

function notify() {
  listeners.forEach((l) => l());
}

export const cart = {
  subscribe(listener: () => void) {
    listeners.push(listener);
    return () => {
      listeners = listeners.filter((l) => l !== listener);
    };
  },
  getItems: () => [...cartItems],
  getTotal: () => cartItems.reduce((sum, i) => sum + i.product.price * i.quantity, 0),
  getCount: () => cartItems.reduce((sum, i) => sum + i.quantity, 0),
  add(product: Product) {
    const existing = cartItems.find((i) => i.product.id === product.id);
    if (existing) {
      existing.quantity++;
    } else {
      cartItems.push({ product, quantity: 1 });
    }
    notify();
  },
  remove(productId: string) {
    cartItems = cartItems.filter((i) => i.product.id !== productId);
    notify();
  },
  clear() {
    cartItems = [];
    notify();
  },
};
