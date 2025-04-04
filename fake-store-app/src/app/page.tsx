"use client";
import { ProductList } from "@/components/ProductList";
import { Product } from "@/interfaces/Product";
import { getProducts } from "@/utils/api";
import { useEffect, useState } from "react";

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const data: Product[] = await getProducts();
      setProducts(data);
    };
    fetchProducts();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Our Products</h1>
      <ProductList products={products} />
    </div>
  );
}
