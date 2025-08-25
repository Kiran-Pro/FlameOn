import { Link } from "react-router-dom";
import { useCartStore } from "../store/cartStore";
import getImageSrc from "../utils/getImageSrc";

export default function ProductCard({ product }) {
  const { cart, addToCart, updateQuantity, removeFromCart } = useCartStore();

  const img = getImageSrc(product.image);
  const name = product.name || "Untitled Dish";
  const price = typeof product.price === "number" ? product.price : 0;
  const category = (product.category || "").trim();
  const description =
    product.description ||
    "Made fresh to order with our house seasonings and sauces.";

  // find if product is already in cart
  const cartItem = cart.find((item) => item._id === product._id);

  return (
    <article
      className="
        group relative overflow-hidden rounded-2xl bg-white/5 
        ring-1 ring-white/10 hover:ring-white/20 shadow-md hover:shadow-xl 
        transition flex flex-row md:flex-col
      "
      aria-label={name}
    >
      {/* Image */}
      <div className="relative w-28 h-28 sm:w-32 sm:h-32 md:w-full md:h-48 shrink-0">
        <img
          src={img}
          alt={name}
          className="w-full h-full object-cover transition duration-500 group-hover:scale-[1.03]"
          loading="lazy"
        />
        {category && (
          <div className="absolute left-2 top-2 z-10 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 px-2 py-0.5 text-[10px] sm:text-xs font-extrabold text-gray-900 shadow md:hidden">
            {category}
          </div>
        )}
      </div>

      {/* Body */}
      <div className="flex flex-col justify-between flex-1 p-3 sm:p-4">
        <div>
          <h3 className="text-base sm:text-lg font-semibold text-white line-clamp-1">
            {name}
          </h3>
          <p className="mt-0.5 sm:mt-1 text-xs sm:text-sm text-gray-300 line-clamp-2">
            {description}
          </p>
        </div>

        {/* Price + Actions */}
        <div className="mt-2 sm:mt-3 flex items-center justify-between gap-2">
          <span className="font-bold text-yellow-400 text-sm sm:text-base">
            ₹{price.toLocaleString("en-IN")}
          </span>

          {!cartItem ? (
            <div className="flex gap-2">
              <button
                onClick={() => addToCart({ ...product, quantity: 1 })}
                className="rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 px-3 sm:px-4 py-1.5 text-xs sm:text-sm font-bold text-gray-900 shadow hover:shadow-lg hover:scale-[1.02] active:scale-[0.99] transition"
                aria-label={`Add ${name} to cart`}
              >
                Add
              </button>
              <Link
                to={`/product/${product._id}`}
                className="rounded-full border border-white/15 bg-white/5 px-3 sm:px-4 py-1.5 text-xs sm:text-sm font-semibold text-white hover:bg-white/10 transition"
                aria-label={`View details for ${name}`}
              >
                View
              </Link>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={() =>
                  cartItem.quantity > 1
                    ? updateQuantity(cartItem.name, cartItem.quantity - 1)
                    : removeFromCart(cartItem.name)
                }
                className="h-7 w-7 sm:h-8 sm:w-8 flex items-center justify-center rounded-full bg-black/40 text-white"
              >
                −
              </button>
              <span className="min-w-6 text-center text-sm sm:text-base font-bold text-yellow-400">
                {cartItem.quantity}
              </span>
              <button
                onClick={() =>
                  updateQuantity(cartItem.name, cartItem.quantity + 1)
                }
                className="h-7 w-7 sm:h-8 sm:w-8 flex items-center justify-center rounded-full bg-black/40 text-white"
              >
                +
              </button>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
