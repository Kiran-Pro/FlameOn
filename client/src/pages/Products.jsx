import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import { FaSearch } from "react-icons/fa";
import { FaArrowDownWideShort } from "react-icons/fa6";
import FlameLoader from "../components/loader/FlameLoader";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("");
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${import.meta.env.VITE_API}/products`)
      .then((res) => {
        setProducts(res.data);
        setFilteredProducts(res.data);

        // unique categories
        const uniqueCats = [
          ...new Set(res.data.map((p) => p.category?.toLowerCase())),
        ];
        setCategories(uniqueCats);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, []);

  // filtering + sorting
  useEffect(() => {
    let updated = [...products];
    if (searchQuery) {
      updated = updated.filter((p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    if (category) {
      updated = updated.filter(
        (p) => p.category?.toLowerCase() === category.toLowerCase()
      );
    }
    if (sort === "low") updated.sort((a, b) => a.price - b.price);
    else if (sort === "high") updated.sort((a, b) => b.price - a.price);

    setFilteredProducts(updated);
  }, [searchQuery, category, sort, products]);

  if (loading) {
    return <FlameLoader />;
  }

  return (
    <section className="relative py-20 bg-gradient-to-br from-gray-900 via-black to-gray-950 min-h-screen text-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Title */}
        <div className="text-center mb-14">
          <h2 className="text-6xl md:text-7xl font-extrabold tracking-tight drop-shadow">
            <span className="text-yellow-400">Menu</span>
          </h2>
          <p className="mt-5 text-gray-300 max-w-2xl mx-auto text-lg">
            Explore a curated menu of flavors, from quick bites to gourmet
            feasts. Your cravings, delivered in style.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative max-w-2xl mx-auto mb-12">
          <FaSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search your favorite dish..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white/10 border border-white/20 text-white 
            rounded-full pl-14 pr-5 py-4 placeholder-gray-400 focus:ring-2 focus:ring-yellow-400 
            outline-none shadow-xl transition text-lg"
          />
        </div>

        {/* Categories & Sort */}
        <div className="flex flex-wrap justify-between items-center gap-4 mb-10">
          {/* Category Pills */}
          <div className="flex gap-3 overflow-x-auto pb-2 hide-scrollbar">
            <button
              onClick={() => setCategory("")}
              className={`px-5 py-2.5 rounded-full font-medium transition whitespace-nowrap ${
                category === ""
                  ? "bg-gradient-to-r from-yellow-400 to-orange-500 text-black shadow-lg"
                  : "bg-white/10 hover:bg-white/20 text-gray-300"
              }`}
            >
              All
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-5 py-2.5 rounded-full font-medium transition whitespace-nowrap ${
                  category === cat
                    ? "bg-gradient-to-r from-yellow-400 to-orange-500 text-black shadow-lg"
                    : "bg-white/10 hover:bg-white/20 text-gray-300"
                }`}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>

          {/* Sort */}
          <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full border border-white/20 backdrop-blur-sm">
            <FaArrowDownWideShort className="w-5 h-5 text-yellow-400" />
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="bg-transparent outline-none text-white text-sm"
            >
              <option className="text-black" value="">
                Default
              </option>
              <option className="text-black" value="low">
                Price: Low → High
              </option>
              <option className="text-black" value="high">
                Price: High → Low
              </option>
            </select>
          </div>
        </div>

        {/* Products Grid */}
        <div className="flex flex-col gap-8">
          {filteredProducts.length === 0 ? (
            <p className="col-span-full text-center text-gray-400 text-lg">
              No items found
            </p>
          ) : (
            filteredProducts.map((p) => <ProductCard key={p._id} product={p} />)
          )}
        </div>
      </div>
    </section>
  );
}
