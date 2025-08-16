import { Link } from "react-router-dom";
import { useCartStore } from "../store/cartStore";
import { Star } from "lucide-react";

export default function ProductCard({ product }) {
  const addToCart = useCartStore((state) => state.addToCart);

  return (
    <div className="relative backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl shadow-lg p-5 hover:shadow-2xl transition transform hover:-translate-y-1 hover:scale-[1.02] duration-300">
      {/* Badge */}
      {product.isNew && (
        <span className="absolute top-3 left-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-xs px-3 py-1 rounded-full shadow">
          New
        </span>
      )}

      {/* Image */}
      <div className="overflow-hidden rounded-xl">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-56 object-cover rounded-xl transform transition-transform duration-500 hover:scale-110"
        />
      </div>

      {/* Info */}
      <div className="mt-4 space-y-2">
        <h3 className="text-xl font-bold text-white drop-shadow line-clamp-1">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={16}
              className={
                i < product.rating
                  ? "fill-yellow-400 text-yellow-400"
                  : "text-white/40"
              }
            />
          ))}
        </div>

        {/* Price */}
        <p className="text-2xl font-extrabold text-yellow-400 drop-shadow">
          ${product.price}
        </p>

        {/* Buttons */}
        <div className="mt-4 flex gap-3">
          <button
            onClick={() => addToCart(product)}
            className="flex-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 font-bold py-2 rounded-full hover:from-orange-500 hover:to-yellow-500 transition transform active:scale-95 shadow-lg"
          >
            Add to Cart
          </button>
          <Link
            to={`/product/${product._id}`}
            className="flex-1 text-center bg-white/30 text-white font-medium py-2 rounded-full hover:bg-white/50 transition"
          >
            View
          </Link>
        </div>
      </div>
    </div>
  );
}
