import { FaLock } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Forbidden() {
  return (
    <section className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-red-50 via-white to-yellow-50 text-center px-6">
      {/* Lock Icon */}
      <FaLock className="text-red-500 mb-6 animate-pulse" size={64} />

      {/* Code */}
      <h1 className="text-6xl sm:text-7xl font-extrabold text-red-500">403</h1>

      {/* Title */}
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mt-3">
        Access Denied
      </h2>

      {/* Message */}
      <p className="text-gray-600 mt-2 max-w-md">
        You don’t have permission to view this page. Please check your access or
        return to the main menu.
      </p>

      <Link
        to="/"
        className="mt-8 inline-block bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-6 sm:px-8 py-2.5 sm:py-3 rounded-full font-semibold shadow-lg hover:from-yellow-500 hover:to-orange-600 hover:scale-[1.03] active:scale-[0.97] transition"
      >
        Back to Home
      </Link>
    </section>
  );
}
