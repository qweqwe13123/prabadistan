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

let cartItems: CartItem[] = [];
let listeners: (() => void)[] = [];

// Cached snapshots - only updated on mutations
let itemsSnapshot: CartItem[] = [];
let totalSnapshot = 0;
let countSnapshot = 0;

function updateSnapshots() {
  itemsSnapshot = [...cartItems];
  totalSnapshot = cartItems.reduce((sum, i) => sum + i.product.price * i.quantity, 0);
  countSnapshot = cartItems.reduce((sum, i) => sum + i.quantity, 0);
}

function notify() {
  updateSnapshots();
  listeners.forEach((l) => l());
}

export const cart = {
  subscribe(listener: () => void) {
    listeners.push(listener);
    return () => {
      listeners = listeners.filter((l) => l !== listener);
    };
  },
  getItems: () => itemsSnapshot,
  getTotal: () => totalSnapshot,
  getCount: () => countSnapshot,
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
