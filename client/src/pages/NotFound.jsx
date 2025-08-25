import { FaFire as Flame } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-orange-50 via-white to-yellow-50 text-gray-900 px-6">
      <div className="text-center max-w-lg">
        {/* Flame Icon */}
        <Flame
          className="mx-auto text-orange-500 mb-6 animate-pulse drop-shadow"
          size={72}
        />

        {/* Error Code */}
        <h1 className="text-6xl sm:text-7xl md:text-8xl font-extrabold text-gray-900 tracking-wider">
          404
        </h1>

        {/* Title */}
        <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold mt-4">
          Oops! Page Burnt Out
        </h2>

        {/* Description */}
        <p className="mt-3 text-gray-600 text-sm sm:text-base">
          Looks like the dish you ordered doesn’t exist on our menu. Maybe try
          heading back to the main course?
        </p>

        {/* CTA */}
        <Link
          to="/"
          className="mt-8 inline-block bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-6 sm:px-8 py-2.5 sm:py-3 rounded-full font-semibold shadow-lg hover:from-yellow-500 hover:to-orange-600 hover:scale-[1.03] active:scale-[0.97] transition"
        >
          Back to Home
        </Link>
      </div>
    </section>
  );
}
