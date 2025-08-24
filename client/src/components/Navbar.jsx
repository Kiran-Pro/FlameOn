import { NavLink, useNavigate } from "react-router-dom";
import { useCartStore } from "../store/cartStore";
import { FaCartShopping, FaUser, FaUserShield } from "react-icons/fa6";
import { logout } from "../services/authService";

export default function Navbar() {
  const cart = useCartStore((state) => state.cart);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const linkClasses =
    "relative font-medium transition px-2 py-1 hover:text-yellow-500";
  const activeClasses =
    "text-yellow-600 font-bold after:absolute after:-bottom-1 after:left-0 after:w-full after:h-[2px] after:bg-yellow-500";

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-md shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <NavLink to="/" className="flex items-center gap-2">
          <span className="text-2xl font-extrabold text-gray-900 tracking-wide">
            Flame<span className="text-yellow-500">On</span>
          </span>
        </NavLink>

        {/* Navigation Links */}
        <div className="flex items-center gap-8 text-gray-700">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `${linkClasses} ${isActive ? activeClasses : ""}`
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/products"
            className={({ isActive }) =>
              `${linkClasses} ${isActive ? activeClasses : ""}`
            }
          >
            Menu
          </NavLink>

          {user?.isAdmin && (
            <NavLink
              to="/admin"
              className={({ isActive }) =>
                `flex items-center gap-1 ${
                  isActive
                    ? "text-yellow-600 font-bold"
                    : "text-gray-700 hover:text-yellow-500"
                }`
              }
            >
              <FaUserShield /> Admin
            </NavLink>
          )}

          {/* Cart */}
          <NavLink
            to="/cart"
            className={({ isActive }) =>
              `relative flex items-center ${
                isActive ? "text-yellow-600" : "text-gray-700"
              } hover:text-yellow-500 transition`
            }
            aria-label="Cart"
          >
            <FaCartShopping size={22} />
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 w-5 h-5 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold rounded-full flex items-center justify-center animate-bounce">
                {cart.length}
              </span>
            )}
          </NavLink>

          {/* Profile / Auth */}
          {user ? (
            <>
              <NavLink
                to="/profile"
                className={({ isActive }) =>
                  `flex items-center ${
                    isActive ? "text-yellow-600" : "text-gray-700"
                  } hover:text-yellow-500 transition`
                }
                aria-label="Profile"
              >
                <FaUser size={22} />
              </NavLink>
              <button
                onClick={handleLogout}
                className="ml-2 bg-red-500 hover:bg-red-600 text-white px-4 py-1.5 rounded-full font-semibold shadow transition"
              >
                Logout
              </button>
            </>
          ) : (
            <NavLink
              to="/login"
              className="ml-2 bg-yellow-400 hover:bg-yellow-500 text-gray-900 px-5 py-2 rounded-full font-semibold shadow transition"
            >
              Login
            </NavLink>
          )}
        </div>
      </div>
    </nav>
  );
}
