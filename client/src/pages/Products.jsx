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
    <section className="py-20 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 min-h-screen text-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Title */}
        <div className="text-center mb-14">
          <h2 className="text-5xl font-extrabold tracking-wide">
            Our <span className="text-yellow-400">Menu</span>
          </h2>
          <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
            Delicious meals made fresh for you. Choose your favorite and add it
            to your cart.
          </p>
          <div className="mt-6 w-20 h-1 bg-yellow-400 rounded-full mx-auto"></div>
        </div>

        {/* Products Grid */}
        <div className="grid gap-10 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {products.map((p) => (
            <div
              key={p._id}
              className="transform hover:-translate-y-2 hover:shadow-2xl transition duration-300"
            >
              <ProductCard product={p} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
