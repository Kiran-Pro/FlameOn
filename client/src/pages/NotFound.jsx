import { FaFire as Flame } from "react-icons/fa6";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-orange-50 via-white to-yellow-50 text-gray-900 px-6">
      <div className="text-center">
        <Flame
          className="mx-auto text-orange-500 mb-6 animate-pulse"
          size={64}
        />

        <h1 className="text-7xl font-extrabold text-gray-900 tracking-wider">
          404
        </h1>

        <h2 className="text-2xl font-semibold mt-4">Oops! Page Burnt Out </h2>
        <p className="mt-2 text-gray-600">
          Looks like the dish you ordered doesn’t exist on our menu.
        </p>

        <Link
          to="/"
          className="mt-8 inline-block bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-8 py-3 rounded-full font-semibold shadow hover:from-yellow-500 hover:to-orange-600 transition"
        >
          Back to Home
        </Link>
      </div>
    </section>
  );
}
