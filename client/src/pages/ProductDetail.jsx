import { useEffect, useState, useMemo } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { useCartStore } from "../store/cartStore";
import {
  FaStar,
  FaTruck,
  FaTimes,
  FaChevronLeft,
  FaCheckCircle,
  FaClock,
} from "react-icons/fa";
import FlameLoader from "../components/loader/FlameLoader";
import getImageSrc from "../utils/getImageSrc";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const { cart, addToCart, updateQuantity, removeFromCart } = useCartStore();

  // Check if product is already in cart
  const cartItem = cart.find((item) => item._id === id);

  useEffect(() => {
    let alive = true;
    setLoading(true);
    axios
      .get(`${import.meta.env.VITE_API}/products/${id}`)
      .then((res) => alive && setProduct(res.data))
      .catch((err) => {
        console.error("Error fetching product:", err);
        setProduct(null);
      })
      .finally(() => alive && setLoading(false));
    return () => {
      alive = false;
    };
  }, [id]);

  const priceINR = useMemo(() => {
    const p = Number(product?.price || 0);
    return p.toLocaleString("en-IN");
  }, [product]);

  const imgMain = useMemo(() => {
    if (!product) return "";
    const primary = product.images?.[0] || product.image;
    return getImageSrc(primary);
  }, [product]);

  const thumbImages = useMemo(() => {
    if (!product) return [];
    const imgs =
      product.images && Array.isArray(product.images)
        ? product.images
        : [product.image].filter(Boolean);
    const urls = imgs.map(getImageSrc).filter(Boolean);
    return Array.from(new Set(urls)).slice(0, 4);
  }, [product]);

  if (loading) return <FlameLoader />;

  if (!product) {
    return (
      <section className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-center text-white">
        <h2 className="text-2xl sm:text-3xl font-bold mb-4">
          Product not found
        </h2>
        <button
          onClick={() => navigate("/products")}
          className="bg-gradient-to-r from-yellow-400 to-orange-500 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full font-semibold text-gray-900 shadow hover:from-yellow-500 hover:to-orange-600 transition"
        >
          Back to Menu
        </button>
      </section>
    );
  }

  return (
    <section className="relative py-16 md:py-20 bg-gradient-to-br from-gray-900 via-gray-900 to-black min-h-screen text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Breadcrumb */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 sm:px-4 py-1.5 sm:py-2 text-sm border border-white/15 hover:bg-white/15 transition"
          >
            <FaChevronLeft /> Back
          </button>
          <nav className="text-xs sm:text-sm text-gray-400">
            <Link to="/" className="hover:text-white transition">
              Home
            </Link>
            <span className="px-1 sm:px-2">/</span>
            <Link to="/products" className="hover:text-white transition">
              Menu
            </Link>
            {product.category && (
              <>
                <span className="px-1 sm:px-2">/</span>
                <span className="text-gray-300">{product.category}</span>
              </>
            )}
          </nav>
        </div>

        {/* Card container */}
        <div className="rounded-2xl sm:rounded-3xl overflow-hidden ring-1 ring-white/10 bg-white/5 backdrop-blur-xl grid md:grid-cols-2 shadow-2xl">
          {/* Media */}
          <div className="relative">
            <button
              onClick={() => navigate("/products")}
              className="absolute top-4 right-4 z-10 bg-black/60 text-white rounded-full p-2 hover:bg-yellow-400 hover:text-gray-900 transition shadow-lg"
              aria-label="Close"
            >
              <FaTimes size={16} />
            </button>

            {/* Main image */}
            <div className="relative overflow-hidden">
              <img
                src={imgMain}
                alt={product.name}
                className="w-full h-64 sm:h-80 md:h-[34rem] object-cover transition duration-700 ease-out hover:scale-[1.03]"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent pointer-events-none" />
              <span className="absolute bottom-4 left-4 bg-yellow-400/95 text-gray-900 text-xs sm:text-sm font-extrabold px-3 sm:px-4 py-1 sm:py-1.5 rounded-full shadow-lg">
                {product.category || "Signature Dish"}
              </span>
            </div>

            {/* Thumbnails */}
            {thumbImages.length > 1 && (
              <div className="px-3 sm:px-5 pb-4 pt-2 sm:pt-3 flex gap-2 sm:gap-3 overflow-x-auto hide-scrollbar">
                {thumbImages.map((src) => (
                  <div
                    key={src}
                    className="h-16 w-20 sm:h-20 sm:w-24 shrink-0 overflow-hidden rounded-xl ring-1 ring-white/10 bg-black/30"
                  >
                    <img
                      src={src}
                      alt="Preview"
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div className="p-4 sm:p-6 md:p-10 flex flex-col">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold leading-snug">
              {product.name}
            </h1>

            {/* Ratings & delivery */}
            <div className="mt-3 flex flex-wrap items-center gap-2 sm:gap-3 text-xs sm:text-sm text-gray-300">
              <span className="inline-flex items-center gap-1 rounded-full bg-white/10 px-2 sm:px-3 py-1 ring-1 ring-white/15">
                <FaStar className="text-yellow-400" /> 4.7
                <span className="text-gray-400">(220 reviews)</span>
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-white/10 px-2 sm:px-3 py-1 ring-1 ring-white/15">
                <FaTruck className="text-green-400" /> Fast Delivery
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-white/10 px-2 sm:px-3 py-1 ring-1 ring-white/15">
                <FaClock className="text-yellow-300" /> 25–35 mins
              </span>
            </div>

            {/* Price */}
            <div className="mt-5 flex items-end gap-2 sm:gap-4">
              <p className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-yellow-400 drop-shadow-sm">
                ₹{priceINR}
              </p>
            </div>

            {/* Add to Cart / Quantity Controls */}
            <div className="mt-6">
              {!cartItem ? (
                <button
                  onClick={() => addToCart({ ...product, quantity: 1 })}
                  className="w-full rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 px-6 py-3 text-lg font-extrabold text-gray-900 shadow-lg hover:shadow-yellow-400/30 transition"
                >
                  Add to Cart
                </button>
              ) : (
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-3 rounded-full bg-white/10 px-4 py-2">
                    <button
                      onClick={() =>
                        cartItem.quantity > 1
                          ? updateQuantity(cartItem.name, cartItem.quantity - 1)
                          : removeFromCart(cartItem.name)
                      }
                      className="h-8 w-8 rounded-full bg-black/40 text-white"
                    >
                      −
                    </button>
                    <span className="min-w-6 text-center text-lg font-bold text-yellow-400">
                      {cartItem.quantity}
                    </span>
                    <button
                      onClick={() =>
                        updateQuantity(cartItem.name, cartItem.quantity + 1)
                      }
                      className="h-8 w-8 rounded-full bg-black/40 text-white"
                    >
                      +
                    </button>
                  </div>
                  <p className="text-lg font-semibold text-gray-200">
                    ₹
                    {(cartItem.price * cartItem.quantity).toLocaleString(
                      "en-IN"
                    )}
                  </p>
                </div>
              )}
            </div>

            {/* Assurance */}
            <div className="mt-5 flex items-center gap-2 text-xs sm:text-sm text-gray-300">
              <FaCheckCircle className="text-green-400" />
              <span>
                Hygienic kitchen • FSSAI compliant • Contactless delivery
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
