import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useCartStore } from "../store/cartStore";
import { X, Star, Truck } from "lucide-react";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const addToCart = useCartStore((state) => state.addToCart);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.error("Error fetching product:", err));
  }, [id]);

  if (!product) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <div className="animate-spin rounded-full h-14 w-14 border-4 border-yellow-400 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <section className="py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 min-h-screen text-white">
      <div className="max-w-6xl mx-auto rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row relative">
        {/* Close Button */}
        <button
          onClick={() => navigate("/products")}
          className="absolute top-6 right-6 z-10 bg-black/60 text-white rounded-full p-2 hover:bg-yellow-400 hover:text-gray-900 transition shadow-lg"
        >
          <X size={20} />
        </button>

        {/* Image Section */}
        <div className="md:w-1/2 relative group">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-[32rem] object-cover transform group-hover:scale-105 transition duration-700 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
          <span className="absolute bottom-6 left-6 bg-yellow-400/95 text-gray-900 text-sm font-bold px-4 py-1.5 rounded-full shadow-lg backdrop-blur">
            {product.category || "Signature Dish"}
          </span>
        </div>

        {/* Info Section */}
        <div className="md:w-1/2 bg-white/10 backdrop-blur-xl p-10 flex flex-col justify-center relative">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">
            {product.name}
          </h1>

          {/* Rating + Delivery Info */}
          <div className="flex items-center gap-4 text-sm text-gray-300 mb-4">
            <span className="flex items-center gap-1">
              <Star size={16} className="text-yellow-400" />
              4.7 (220 reviews)
            </span>
            <span className="flex items-center gap-1">
              <Truck size={16} className="text-green-400" />
              Fast Delivery
            </span>
          </div>

          <p className="text-gray-300 leading-relaxed mb-6 text-lg">
            {product.description}
          </p>

          <div className="flex items-center gap-6 mb-10">
            <p className="text-4xl font-extrabold text-yellow-400 drop-shadow-sm">
              ₹{product.price}
            </p>
          </div>

          <button
            onClick={() => addToCart(product)}
            className="w-full md:w-auto bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 px-12 py-4 rounded-full text-lg font-bold shadow-xl hover:shadow-yellow-400/40 hover:scale-105 active:scale-95 transition"
          >
            Add to Cart
          </button>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-yellow-400 to-orange-500 p-4 shadow-xl md:hidden">
        <button
          onClick={() => addToCart(product)}
          className="w-full bg-black text-yellow-400 py-3 rounded-xl font-bold text-lg shadow-lg hover:bg-gray-900 transition"
        >
          Add to Cart • ₹{product.price}
        </button>
      </div>
    </section>
  );
}
