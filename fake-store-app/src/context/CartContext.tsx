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

  console.log(cart);

  return (
    <CartContext.Provider value={{ cart, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
