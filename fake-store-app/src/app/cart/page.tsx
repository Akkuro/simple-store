"use client";
import { useCart } from "@/context/CartContext";
import React from "react";

const Cart: React.FC<undefined> = () => {
  const { cart } = useCart();

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">Your cart</h1>
      <p className="text-lg">
        {(cart == null || cart.length === 0) &&
          "You did not add any item to the cart."}
      </p>
      <ul className="space-y-4">
        {cart.map((item) => (
          <li
            key={item.product.id}
            className="flex justify-between items-center"
          >
            <div className="flex items-center space-x-4">
              <img
                src={item.product.image}
                alt={item.product.title}
                className="w-16 h-16"
              />
              <div>
                <h2 className="font-bold">{item.product.title}</h2>
                <p>{item.product.price} €</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Cart;
