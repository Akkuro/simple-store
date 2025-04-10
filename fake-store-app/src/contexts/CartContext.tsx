"use client";
import { CartItem } from "@/interfaces/CartItem";
import { Product } from "@/interfaces/Product";
import { eventEmitter } from "@/utils/eventEmitter";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

type CartContextProps = {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  setQuantity: (productId: number, quantity: number) => void;
  adjustQuantity: (productId: number, delta: number) => void;
  removeFromCart: (productId: number) => void;
};

const CartContext = createContext<CartContextProps | undefined>(undefined);

type CartProviderProps = {
  children: ReactNode;
};

export const CartProvider = ({ children }: CartProviderProps) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      try {
        const parsedCart = JSON.parse(storedCart);
        setCart(parsedCart);
      } catch (error) {
        console.error("Failed to parse cart data", error);
        setCart([]);
        localStorage.removeItem("cart");
      }
    }
  }, []);

  useEffect(() => {
    const handleLogout = () => {
      setCart([]);
      localStorage.removeItem("cart");
    };
  
    eventEmitter.on("logout", handleLogout);
  
    return () => {
      eventEmitter.off("logout", handleLogout);
    };
  }, []);
  
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

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

  const removeFromCart = (productId: number) => {
    setCart((prevCart) =>
      prevCart.filter((item: CartItem) => item.product.id !== productId)
    );
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, setQuantity, adjustQuantity, removeFromCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("Cart context should be used within CartContextProvider");
  }
  return context;
};
