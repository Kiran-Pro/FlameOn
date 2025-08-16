import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useCartStore } from "../store/cartStore";

export default function ProductDetail() {
  const { id } = useParams();
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
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-yellow-400 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-gray-100 min-h-screen">
      <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-2xl p-10 flex flex-col md:flex-row gap-12 relative overflow-hidden">
        {/* Floating Badge */}
        <span className="absolute top-6 right-6 bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 px-5 py-1.5 rounded-full text-sm font-bold shadow-md">
          ⭐ Chef’s Special
        </span>

        {/* Product Image */}
        <div className="flex-1 relative group">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-[30rem] object-cover rounded-2xl shadow-xl transform group-hover:scale-105 transition duration-500"
          />
          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent rounded-2xl"></div>
        </div>

        {/* Product Info */}
        <div className="flex-1 flex flex-col justify-center">
          <h1 className="text-5xl font-extrabold text-gray-900 mb-4">
            {product.name}
          </h1>
          <p className="text-gray-600 leading-relaxed mb-6 text-lg">
            {product.description}
          </p>
          <p className="text-4xl font-extrabold text-yellow-500 mb-8 tracking-tight">
            ₹{product.price}
          </p>

          <button
            onClick={() => addToCart(product)}
            className="w-full md:w-auto bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 px-10 py-4 rounded-full text-lg font-bold shadow-lg hover:from-yellow-500 hover:to-orange-600 transition transform hover:scale-105 active:scale-95"
          >
            Add to Cart
          </button>
        </div>
      </div>

      {/* Related Products */}
      <div className="max-w-6xl mx-auto mt-20 px-6">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-10 text-center">
          You may also like
        </h2>
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {/* Placeholder cards */}
          {["🍕 Pizza", "🥤 Drink", "🍰 Dessert"].map((item, i) => (
            <div
              key={i}
              className="bg-white rounded-xl shadow-lg h-48 flex items-center justify-center text-gray-600 font-semibold text-lg hover:shadow-2xl hover:-translate-y-1 transition"
            >
              Coming Soon {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
