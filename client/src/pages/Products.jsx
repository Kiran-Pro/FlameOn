import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import { FaSearch } from "react-icons/fa";
import { FaArrowDownWideShort, FaXmark, FaFilter } from "react-icons/fa6";
import FlameLoader from "../components/loader/FlameLoader";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState(""); // "", "low", "high", "az", "za"
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // fetch once
  useEffect(() => {
    let alive = true;
    setLoading(true);
    axios
      .get(`${import.meta.env.VITE_API}/products`)
      .then((res) => {
        if (!alive) return;
        const list = Array.isArray(res.data) ? res.data : [];
        setProducts(list);

        // unique categories (case-insensitive), sorted
        const uniqueCats = Array.from(
          new Set(
            list
              .map((p) => (p.category || "").trim())
              .filter(Boolean)
              .map((c) => c.toLowerCase())
          )
        ).sort((a, b) => a.localeCompare(b));
        setCategories(uniqueCats);
      })
      .catch((err) => console.error(err))
      .finally(() => alive && setLoading(false));
    return () => {
      alive = false;
    };
  }, []);

  // derived filtering + sorting (fast + no extra renders)
  const filteredProducts = useMemo(() => {
    let updated = [...products];

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      updated = updated.filter(
        (p) =>
          p.name?.toLowerCase().includes(q) ||
          p.category?.toLowerCase().includes(q) ||
          p.description?.toLowerCase().includes(q)
      );
    }

    if (category) {
      updated = updated.filter(
        (p) => (p.category || "").toLowerCase() === category.toLowerCase()
      );
    }

    switch (sort) {
      case "low":
        updated.sort((a, b) => (a.price ?? 0) - (b.price ?? 0));
        break;
      case "high":
        updated.sort((a, b) => (b.price ?? 0) - (a.price ?? 0));
        break;
      case "az":
        updated.sort((a, b) => (a.name || "").localeCompare(b.name || ""));
        break;
      case "za":
        updated.sort((a, b) => (b.name || "").localeCompare(a.name || ""));
        break;
      default:
        // keep API order
        break;
    }

    return updated;
  }, [products, searchQuery, category, sort]);

  const activeFilters = Boolean(searchQuery || category || sort);

  const clearFilters = () => {
    setSearchQuery("");
    setCategory("");
    setSort("");
    // no need to set filtered state; useMemo handles it
  };

  if (loading) return <FlameLoader />;

  return (
    <section className="relative min-h-screen py-20 bg-gradient-to-br from-gray-900 via-black to-gray-950 text-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Title */}
        <div className="text-center mb-12">
          <h2 className="text-5xl md:text-6xl font-extrabold tracking-tight drop-shadow">
            <span className="text-yellow-400">Menu</span>
          </h2>
          <p className="mt-4 text-gray-300 max-w-2xl mx-auto text-lg">
            Explore a curated menu of flavors—from quick bites to gourmet
            feasts.
          </p>
        </div>

        {/* Controls */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-8">
          {/* Search */}
          <div className="relative w-full md:max-w-md">
            <FaSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search your favorite dish..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/10 border border-white/20 text-white rounded-full pl-14 pr-5 py-3.5 placeholder-gray-400 focus:ring-2 focus:ring-yellow-400 outline-none shadow-xl transition text-base"
              aria-label="Search products"
            />
          </div>

          {/* Sort & clear */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full border border-white/20 backdrop-blur-sm">
              <FaArrowDownWideShort className="w-5 h-5 text-yellow-400" />
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="bg-transparent outline-none text-white text-sm"
                aria-label="Sort products"
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
                <option className="text-black" value="az">
                  Name: A → Z
                </option>
                <option className="text-black" value="za">
                  Name: Z → A
                </option>
              </select>
            </div>

            {activeFilters && (
              <button
                onClick={clearFilters}
                className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 border border-white/20 text-sm hover:bg-white/20 transition"
                aria-label="Clear filters"
              >
                <FaXmark className="w-4 h-4" />
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Categories */}
        <div className="mb-6">
          <div className="flex items-center gap-2 text-gray-400 mb-3">
            <FaFilter className="w-4 h-4 text-yellow-400" />
            <span className="text-sm">
              Categories · {categories.length || 0}
            </span>
            <span className="ml-auto text-sm text-gray-400">
              Showing{" "}
              <strong className="text-yellow-400">
                {filteredProducts.length}
              </strong>{" "}
              items
            </span>
          </div>

          <div className="flex gap-3 overflow-x-auto pb-2 hide-scrollbar">
            <button
              onClick={() => setCategory("")}
              className={`px-5 py-2.5 rounded-full font-medium transition whitespace-nowrap ${
                category === ""
                  ? "bg-gradient-to-r from-yellow-400 to-orange-500 text-black shadow-lg"
                  : "bg-white/10 hover:bg-white/20 text-gray-300 border border-white/10"
              }`}
            >
              All
            </button>
            {categories.map((cat) => {
              const label = cat.charAt(0).toUpperCase() + cat.slice(1);
              const active = category === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`px-5 py-2.5 rounded-full font-medium transition whitespace-nowrap ${
                    active
                      ? "bg-gradient-to-r from-yellow-400 to-orange-500 text-black shadow-lg"
                      : "bg-white/10 hover:bg-white/20 text-gray-300 border border-white/10"
                  }`}
                  aria-pressed={active}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="mt-16 text-center">
            <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-white/10 flex items-center justify-center text-2xl">
              🍽️
            </div>
            <h3 className="text-xl font-semibold">No items found</h3>
            <p className="mt-2 text-gray-400">
              Try adjusting your search or clearing filters.
            </p>
            {activeFilters && (
              <button
                onClick={clearFilters}
                className="mt-6 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 px-6 py-2 font-bold text-black shadow hover:scale-[1.02] transition"
              >
                Reset Filters
              </button>
            )}
          </div>
        ) : (
          <div
            className="
              grid gap-6
              sm:grid-cols-2
              lg:grid-cols-3
              xl:grid-cols-4
            "
          >
            {filteredProducts.map((p) => (
              <ProductCard key={p._id} product={p} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
