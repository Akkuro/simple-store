import Link from "next/link";
import { AiOutlineShoppingCart } from "react-icons/ai";

export default function Navbar() {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/">
          <span className="text-xl font-bold cursor-pointer">Fake Store</span>
        </Link>
        <Link href="/cart">
          <AiOutlineShoppingCart className="text-2xl cursor-pointer" />
        </Link>
      </div>
    </nav>
  );
}
