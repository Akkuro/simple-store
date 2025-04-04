"use client";
import { CartItem } from "@/interfaces/CartItem";
import { Product } from "@/interfaces/Product";
import { createContext, ReactNode, useContext, useState } from "react";

type CartContextProps = {
  cart: CartItem[];
  addToCart: (product: Product) => void;
};

const CartContext = createContext<CartContextProps>({
  cart: [],
  addToCart: () => {},
});

type CartProviderProps = {
  children: ReactNode;
};

export const CartProvider = ({ children }: CartProviderProps) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (product: Product) => {
    const cartItem: CartItem = { product: product, quantity: 1 };
    setCart((prevCart: CartItem[]) => [...prevCart, cartItem]);
  };

  console.log(cart);

  return (
    <CartContext.Provider value={{ cart, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
