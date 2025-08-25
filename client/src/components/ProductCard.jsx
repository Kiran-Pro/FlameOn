import { Link } from "react-router-dom";
import { useCartStore } from "../store/cartStore";
import getImageSrc from "../utils/getImageSrc";

export default function ProductCard({ product }) {
  const addToCart = useCartStore((state) => state.addToCart);

  const img = getImageSrc(product.image);
  const name = product.name || "Untitled Dish";
  const price = typeof product.price === "number" ? product.price : 0;
  const category = (product.category || "").trim();
  const description =
    product.description ||
    "Made fresh to order with our house seasonings and sauces.";

  return (
    <article
      className="group relative overflow-hidden rounded-2xl bg-white/5 ring-1 ring-white/10 hover:ring-white/20 shadow-md hover:shadow-xl transition"
      aria-label={name}
    >
      {/* Tag + Price */}
      {category && (
        <div className="absolute left-3 top-3 z-10 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 px-3 py-1 text-[11px] font-extrabold text-gray-900 shadow">
          {category}
        </div>
      )}
      <div className="absolute right-3 top-3 z-10 rounded-full bg-white/90 px-3 py-1 text-sm font-bold text-gray-900 shadow">
        ₹{price.toLocaleString("en-IN")}
      </div>

      {/* Image */}
      <div className="relative">
        <img
          src={img}
          alt={name}
          className="h-48 w-full object-cover transition duration-500 group-hover:scale-[1.03]"
          loading="lazy"
        />
      </div>

      {/* Body */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-white line-clamp-1">
          {name}
        </h3>
        <p className="mt-1 text-sm text-gray-300 line-clamp-2">{description}</p>

        {/* Actions */}
        <div className="mt-4 flex items-center justify-between gap-3">
          <button
            onClick={() => addToCart(product)}
            className="flex-1 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 px-4 py-2 text-sm font-bold text-gray-900 shadow hover:shadow-lg hover:scale-[1.02] active:scale-[0.99] transition"
            aria-label={`Add ${name} to cart`}
          >
            Add to Cart
          </button>
          <Link
            to={`/product/${product._id}`}
            className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white hover:bg-white/10 transition"
            aria-label={`View details for ${name}`}
          >
            View
          </Link>
        </div>
      </div>
    </article>
  );
}
