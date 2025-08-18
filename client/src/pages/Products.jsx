import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";

export default function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <section className="relative py-24 bg-gradient-to-br from-gray-900 via-gray-800 to-black min-h-screen text-white overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0">
        <div className="absolute -top-40 -left-40 w-[30rem] h-[30rem] bg-yellow-500/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -right-40 w-[30rem] h-[30rem] bg-orange-500/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Title */}
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-extrabold tracking-wide drop-shadow-lg">
            <span className="text-yellow-400">Menu</span>
          </h2>
          <p className="mt-6 text-gray-300 max-w-2xl mx-auto text-lg leading-relaxed">
            Crafted with passion, served with love. Choose from our chef-curated
            collection of dishes and drinks that bring flavor to life.
          </p>
          <div className="mt-8 w-24 h-1.5 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full mx-auto shadow"></div>
        </div>

        {/* Products Grid */}
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p) => (
            <div
              key={p._id}
              className="transform hover:-translate-y-2 hover:scale-[1.02] transition duration-500"
            >
              <ProductCard product={p} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
