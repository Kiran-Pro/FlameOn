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
  const [qty, setQty] = useState(1);
  const addToCart = useCartStore((state) => state.addToCart);

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
    // support either product.image or product.images[0]
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

  const handleAdd = () => {
    // Many stores accept quantity on the item; if auto-increments by 1, to loop or adjust store logic.
    addToCart({ ...product, quantity: qty });
  };

  if (loading) return <FlameLoader />;

  if (!product) {
    return (
      <section className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-center text-white">
        <h2 className="text-3xl font-bold mb-4">Product not found</h2>
        <button
          onClick={() => navigate("/products")}
          className="bg-gradient-to-r from-yellow-400 to-orange-500 px-6 py-3 rounded-full font-semibold text-gray-900 shadow hover:from-yellow-500 hover:to-orange-600 transition"
        >
          Back to Menu
        </button>
      </section>
    );
  }

  return (
    <section className="relative py-18 md:py-20 bg-gradient-to-br from-gray-900 via-gray-900 to-black min-h-screen text-white">
      <div className="max-w-6xl mx-auto px-6">
        {/*breadcrumb */}
        <div className="mb-6 flex items-center justify-between gap-3">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm border border-white/15 hover:bg-white/15 transition"
          >
            <FaChevronLeft />
            Back
          </button>
          <nav className="text-sm text-gray-400">
            <Link to="/" className="hover:text-white transition">
              Home
            </Link>
            <span className="px-2">/</span>
            <Link to="/products" className="hover:text-white transition">
              Menu
            </Link>
            {product.category && (
              <>
                <span className="px-2">/</span>
                <span className="text-gray-300">{product.category}</span>
              </>
            )}
          </nav>
        </div>

        {/* Card container */}
        <div className="rounded-3xl overflow-hidden ring-1 ring-white/10 bg-white/5 backdrop-blur-xl grid md:grid-cols-2 shadow-2xl">
          {/* Media */}
          <div className="relative">
            <button
              onClick={() => navigate("/products")}
              className="absolute top-5 right-5 z-10 bg-black/60 text-white rounded-full p-2 hover:bg-yellow-400 hover:text-gray-900 transition shadow-lg"
              aria-label="Close"
              title="Close"
            >
              <FaTimes size={18} />
            </button>

            {/* Main image */}
            <div className="relative overflow-hidden">
              <img
                src={imgMain}
                alt={product.name}
                className="w-full h-[28rem] md:h-[34rem] object-cover transition duration-700 ease-out hover:scale-[1.03]"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent pointer-events-none" />
              {/* category tag */}
              <span className="absolute bottom-5 left-5 bg-yellow-400/95 text-gray-900 text-xs md:text-sm font-extrabold px-4 py-1.5 rounded-full shadow-lg">
                {product.category || "Signature Dish"}
              </span>
            </div>

            {/* Thumbnails */}
            {thumbImages.length > 1 && (
              <div className="px-5 pb-5 pt-3 flex gap-3 overflow-x-auto hide-scrollbar">
                {thumbImages.map((src) => (
                  <div
                    key={src}
                    className="h-20 w-24 shrink-0 overflow-hidden rounded-xl ring-1 ring-white/10 bg-black/30"
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
          <div className="p-6 md:p-10 flex flex-col">
            {/* Title row */}
            <div className="flex items-start justify-between gap-3">
              <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight leading-tight">
                {product.name}
              </h1>
            </div>

            {/* Ratings & delivery */}
            <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-gray-300">
              <span className="inline-flex items-center gap-1 rounded-full bg-white/10 px-3 py-1 ring-1 ring-white/15">
                <FaStar className="text-yellow-400" />
                4.7 <span className="text-gray-400">(220 reviews)</span>
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-white/10 px-3 py-1 ring-1 ring-white/15">
                <FaTruck className="text-green-400" />
                Fast Delivery
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-white/10 px-3 py-1 ring-1 ring-white/15">
                <FaClock className="text-yellow-300" />
                25–35 mins
              </span>
            </div>

            {/* Price */}
            <div className="mt-6 flex items-end gap-4">
              <p className="text-4xl font-extrabold text-yellow-400 drop-shadow-sm">
                ₹{priceINR}
              </p>
              {product.mrp && Number(product.mrp) > Number(product.price) && (
                <p className="text-sm text-gray-400 line-through">
                  ₹{Number(product.mrp).toLocaleString("en-IN")}
                </p>
              )}
            </div>

            {/* Description */}
            <p className="mt-5 text-gray-200/90 leading-relaxed">
              {product.description ||
                "Crafted with fresh ingredients and our house seasoning to deliver bold, memorable flavor every time."}
            </p>

            {/* Quantity + Add */}
            <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                onClick={handleAdd}
                className="flex-1 sm:flex-none rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 px-8 py-3 text-lg font-extrabold text-gray-900 shadow-lg hover:shadow-yellow-400/30 hover:scale-[1.02] active:scale-[0.99] transition"
              >
                Add to Cart
              </button>
            </div>

            {/* Assurance */}
            <div className="mt-6 flex items-center gap-2 text-sm text-gray-300">
              <FaCheckCircle className="text-green-400" />
              <span>
                Hygienic kitchen • FSSAI compliant • Contactless delivery
                available
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky mobile bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-yellow-400 to-orange-500 p-3 shadow-2xl md:hidden">
        <div className="mx-auto max-w-6xl px-2 flex items-center gap-3">
          <div className="flex items-center gap-2 rounded-full bg-black/60 text-yellow-400 px-3 py-2">
            <button
              onClick={() => setQty((q) => Math.max(1, q - 1))}
              className="h-8 w-8 rounded-full bg-black/40 text-white"
              aria-label="Decrease quantity"
            >
              −
            </button>
            <span className="min-w-6 text-center text-white">{qty}</span>
            <button
              onClick={() => setQty((q) => q + 1)}
              className="h-8 w-8 rounded-full bg-black/40 text-white"
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>
          <button
            onClick={handleAdd}
            className="flex-1 bg-black text-yellow-400 py-3 rounded-2xl font-bold text-lg shadow-lg hover:bg-gray-900 transition"
          >
            Add • ₹{priceINR}
          </button>
        </div>
      </div>
    </section>
  );
}
