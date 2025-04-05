import Link from "next/link";
import { AiOutlineLogin, AiOutlineShoppingCart } from "react-icons/ai";

export default function Navbar() {
  return (
    <nav className="bg-gray-800 text-white p-4 sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/">
          <span className="text-xl font-bold cursor-pointer">Fake Store</span>
        </Link>
        <div className="flex gap-6 justify-between">
          <Link href="/cart">
            <AiOutlineShoppingCart className="text-2xl cursor-pointer" />
          </Link>
          <Link href="/login">
            <AiOutlineLogin className="text-2xl cursor-pointer" />
          </Link>
        </div>
      </div>
    </nav>
  );
}
