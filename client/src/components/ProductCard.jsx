import { Link } from "react-router-dom";
import { useCartStore } from "../store/cartStore";

export default function ProductCard({ product }) {
  const addToCart = useCartStore((state) => state.addToCart);

  return (
    <div className="group flex items-center gap-4 bg-white/5 border border-white/10 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-4">
      {/* Image */}
      <div className="relative w-28 h-28 flex-shrink-0 rounded-lg overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {product.category && (
          <span className="absolute top-2 left-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-black text-[10px] font-bold px-2 py-0.5 rounded-full shadow">
            {product.category}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col justify-between flex-1 min-w-0">
        {/* Title */}
        <h3 className="text-lg font-bold text-white truncate">
          {product.name}
        </h3>

        {/* Price */}
        <p className="text-yellow-400 font-extrabold text-lg mt-1">
          ₹{product.price}
        </p>

        <div className="flex gap-2 mt-2">
          <button
            onClick={() => addToCart(product)}
            className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-semibold px-4 py-1.5 rounded-full text-sm shadow hover:from-orange-500 hover:to-yellow-400 transition"
          >
            Add
          </button>
          <Link
            to={`/product/${product._id}`}
            className="bg-white/10 text-white font-medium px-4 py-1.5 rounded-full text-sm hover:bg-white/20 transition"
          >
            View
          </Link>
        </div>
      </div>
    </div>
  );
}
