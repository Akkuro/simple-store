"use client";
import { useCart } from "@/context/CartContext";
import React from "react";

const Cart: React.FC<undefined> = () => {
  const { cart, setQuantity, adjustQuantity } = useCart();

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">Your cart</h1>
      {cart == null || cart.length === 0 ? (
        <p className="text-lg">You did not add any item to the cart.</p>
      ) : (
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
              <div className="flex items-center">
                <button
                  onClick={() => adjustQuantity(item.product.id, -1)}
                  className="px-2 py-1 border rounded-l bg-gray-100 hover:bg-gray-200"
                >
                  -
                </button>
                <input
                  type="number"
                  value={item.quantity}
                  onChange={(e) => {
                    const parsedValue = parseInt(e.target.value);
                    return setQuantity(
                      item.product.id,
                      isNaN(parsedValue) ? 1 : parsedValue
                    );
                  }}
                  className="w-16 px-2 py-1 border-t border-b text-center"
                  min="1"
                />
                <button
                  onClick={() => adjustQuantity(item.product.id, 1)}
                  className="px-2 py-1 border rounded-r bg-gray-100 hover:bg-gray-200"
                >
                  +
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Cart;
