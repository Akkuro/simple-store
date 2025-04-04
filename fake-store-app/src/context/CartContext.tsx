"use client";
import { CartItem } from "@/interfaces/CartItem";
import { Product } from "@/interfaces/Product";
import { createContext, ReactNode, useContext, useState } from "react";

type CartContextProps = {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  setQuantity: (productId: number, delta: number) => void;
  adjustQuantity: (productId: number, delta: number) => void;
};

const CartContext = createContext<CartContextProps>({
  cart: [],
  addToCart: () => {},
  setQuantity: () => {},
  adjustQuantity: () => {},
});

type CartProviderProps = {
  children: ReactNode;
};

export const CartProvider = ({ children }: CartProviderProps) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (product: Product) => {
    setCart((prevCart: CartItem[]) => {
      const existingItem = prevCart.find(
        (item: CartItem) => item.product.id === product.id
      );
      return existingItem
        ? prevCart.map((prevCartItem: CartItem) =>
            prevCartItem.product.id === product.id
              ? { ...prevCartItem, quantity: prevCartItem.quantity + 1 }
              : prevCartItem
          )
        : [...prevCart, { product: product, quantity: 1 }];
    });
  };

  const setQuantity = (productId: number, quantity: number) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.product.id === productId
          ? { ...item, quantity: Math.max(1, quantity) }
          : item
      )
    );
  };

  const adjustQuantity = (productId: number, delta: number) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.product.id === productId
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  console.log(cart);

  return (
    <CartContext.Provider
      value={{ cart, addToCart, setQuantity, adjustQuantity }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
