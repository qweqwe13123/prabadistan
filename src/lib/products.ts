import iphoneProduct from "@/assets/iphone-product.jpg";
import type { Product } from "./store";

export const products: Product[] = [
  {
    id: "iphone-14-pro-max-1tb",
    name: "iPhone 14 Pro Max",
    price: 449,
    oldPrice: 599,
    image: iphoneProduct,
    description:
      "Флагманский смартфон Apple с чипом A16 Bionic, камерой 48 Мп, дисплеем Super Retina XDR 6.7\" и Dynamic Island. Максимальный объём памяти 1 ТБ для любых задач.",
    specs: [
      "Дисплей: 6.7\" Super Retina XDR, 120 Гц",
      "Процессор: A16 Bionic",
      "Камера: 48 Мп + 12 Мп + 12 Мп",
      "Память: 1 ТБ",
      "Аккумулятор: 4323 мАч",
      "Face ID, iOS 16",
    ],
    badge: "ХИТ",
    storage: "1 ТБ",
    color: "Deep Purple",
  },
];
