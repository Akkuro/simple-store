import { useCart } from "@/context/CartContext";
import { Product } from "@/interfaces/Product";

interface Props {
  product: Product;
}

export const ProductCard: React.FC<Props> = ({ product }) => {
  const { id, title, price, description, category, image } = product;

  const { addToCart } = useCart();
  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <div className="product-card bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <img src={image} alt={title} className="w-full h-48 object-contain p-4" />
      <div className="p-4">
        <span className="text-sm text-gray-500 mb-2 block">{category}</span>
        <h3 className="text-lg font-semibold mb-2 truncate" title={title}>
          {title}
        </h3>
        <p className="text-gray-600 mb-4 line-clamp-3 min-h-[60px]">
          {description}
        </p>
        <div className="flex justify-between items-center">
          <span className="text-xl font-bold text-indigo-600">
            ${price.toFixed(2)}
          </span>
          <button
            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};
