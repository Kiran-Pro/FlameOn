import { FaEnvelope, FaMapMarkerAlt, FaPhone } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-black text-gray-300">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        {/* Brand */}
        <div>
          <h2 className="text-2xl font-extrabold text-white tracking-wide">
            Flame<span className="text-yellow-500">On</span>
          </h2>
          <p className="mt-3 text-sm text-gray-400">
            Street-style flavor with restaurant-grade finesse. Hot, fresh, and
            fast!
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/" className="hover:text-yellow-500 transition">
                Home
              </Link>
            </li>
            <li>
              <Link to="/products" className="hover:text-yellow-500 transition">
                Menu
              </Link>
            </li>
            <li>
              <Link to="/cart" className="hover:text-yellow-500 transition">
                Cart
              </Link>
            </li>
            <li>
              <Link to="/profile" className="hover:text-yellow-500 transition">
                Profile
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Contact Us</h3>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2">
              <FaPhone className="text-yellow-500" /> +91 98765 43210
            </li>
            <li className="flex items-center gap-2">
              <FaEnvelope className="text-yellow-500" /> support@flameon.com
            </li>
            <li className="flex items-center gap-2">
              <FaMapMarkerAlt className="text-yellow-500" /> Chennai, India
            </li>
          </ul>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-700">
        <div className="max-w-7xl mx-auto p-6  text-center text-sm text-gray-400">
          <p>© {new Date().getFullYear()} FlameOn. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
