import { Product } from "@/interfaces/Product";
import React from "react";

interface Props {
  products: Product[];
}

const Cart: React.FC<Props> = ({ products }) => {
  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">Your cart</h1>
      <p className="text-lg">
        {(products == null || products.length === 0) &&
          "You did not add any item to the cart."}
      </p>
    </div>
  );
};

export default Cart;
