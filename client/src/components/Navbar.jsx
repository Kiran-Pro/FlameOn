import { Link } from "react-router-dom";
import { useCartStore } from "../store/cartStore";
import { FaCartShopping, FaUser } from "react-icons/fa6";

export default function Navbar() {
  const cart = useCartStore((state) => state.cart);

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/70 backdrop-blur-lg shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <span className="text-2xl font-extrabold text-gray-900 tracking-wide">
            Flame<span className="text-yellow-500">On</span>
          </span>
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center gap-8">
          <Link
            to="/"
            className="text-gray-700 font-medium hover:text-yellow-500 transition"
          >
            Home
          </Link>
          <Link
            to="/products"
            className="text-gray-700 font-medium hover:text-yellow-500 transition"
          >
            Menu
          </Link>

          {/* Cart */}
          <Link
            to="/cart"
            className="relative flex items-center text-gray-700 hover:text-yellow-500 transition"
            aria-label="Cart"
          >
            <FaCartShopping size={22} />
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center animate-bounce">
                {cart.length}
              </span>
            )}
          </Link>

          {/* Profile */}
          <Link
            to="/profile"
            className="flex items-center text-gray-700 hover:text-yellow-500 transition"
            aria-label="Profile"
          >
            <FaUser size={22} />
          </Link>
        </div>
      </div>
    </nav>
  );
}
