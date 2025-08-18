import { Link } from "react-router-dom";
import { useCartStore } from "../store/cartStore";

export default function ProductCard({ product }) {
  const addToCart = useCartStore((state) => state.addToCart);

  return (
    <div className="group relative bg-gradient-to-br from-gray-800/60 via-gray-900/60 to-black/70 border border-white/10 rounded-3xl shadow-xl p-5 backdrop-blur-md overflow-hidden hover:shadow-2xl transition duration-500 hover:-translate-y-2 hover:scale-[1.02]">
      {/* Product Image */}
      <div className="relative overflow-hidden rounded-2xl">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-56 object-cover rounded-2xl transform transition duration-700 group-hover:scale-110"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent rounded-2xl"></div>

        {/* Badge - Category */}
        {product.category && (
          <span className="absolute top-3 right-3 bg-black/60 text-white text-xs font-semibold px-3 py-1 rounded-full backdrop-blur-sm shadow-md">
            {product.category}
          </span>
        )}
      </div>

      {/* Info Section */}
      <div className="mt-5 flex flex-col gap-3">
        {/* Name */}
        <h3 className="text-2xl font-extrabold text-white drop-shadow line-clamp-1">
          {product.name}
        </h3>

        {/* Description */}
        {product.description && (
          <p className="text-sm text-gray-400 line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        )}

        {/* Price */}
        <p className="text-3xl font-extrabold text-yellow-400 tracking-wide drop-shadow">
          ₹{product.price}
        </p>

        {/* Buttons */}
        <div className="mt-4 flex gap-3">
          <button
            onClick={() => addToCart(product)}
            className="flex-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 font-bold py-2.5 rounded-full hover:from-orange-500 hover:to-yellow-500 transition transform active:scale-95 shadow-lg"
          >
            Add to Cart
          </button>
          <Link
            to={`/product/${product._id}`}
            className="flex-1 text-center bg-white/20 text-white font-semibold py-2.5 rounded-full hover:bg-white/30 transition shadow"
          >
            View
          </Link>
        </div>
      </div>
    </div>
  );
}
