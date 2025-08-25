import { useState, useMemo } from "react";
import api from "../../../services/authService.js";
import getImageSrc from "../../../utils/getImageSrc.js";
import { FaSearch } from "react-icons/fa";

export default function ProductTable({
  products,
  setProducts,
  setForm,
  setFile,
  setEditingId,
  setMessage,
  hideMessage,
  setShowModal,
}) {
  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [sort, setSort] = useState("");

  // filter + sort
  const filteredProducts = useMemo(() => {
    let list = [...products];
    if (search.trim()) {
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(search.toLowerCase()) ||
          p.description.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (filterCategory) {
      list = list.filter(
        (p) => p.category?.toLowerCase() === filterCategory.toLowerCase()
      );
    }
    if (sort === "low") list.sort((a, b) => a.price - b.price);
    else if (sort === "high") list.sort((a, b) => b.price - a.price);

    return list;
  }, [products, search, filterCategory, sort]);

  const handleEdit = (product) => {
    setEditingId(product._id);
    setForm(product);
    setFile(null);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this product?")) return;
    try {
      await api.delete(`/admin/products/${id}`);
      setProducts((prev) => prev.filter((p) => p._id !== id));
      setMessage("Product deleted");
    } catch {
      setMessage("Failed to delete product");
    }
    hideMessage();
  };

  const categories = [...new Set(products.map((p) => p.category))];

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6 items-center justify-between">
        <div className="relative flex-1 min-w-[200px]">
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-400 outline-none"
          />
        </div>

        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400"
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400"
        >
          <option value="">Sort By</option>
          <option value="low">Price: Low → High</option>
          <option value="high">Price: High → Low</option>
        </select>
      </div>

      {/* Desktop Table */}
      <div className="overflow-x-auto hidden md:block">
        <table className="w-full border-collapse text-sm md:text-base">
          <thead>
            <tr className="bg-gradient-to-r from-yellow-400/20 to-orange-400/20 text-gray-700">
              <th className="p-4 text-left">Image</th>
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Category</th>
              <th className="p-4 text-left">Price</th>
              <th className="p-4 text-left">Description</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredProducts.map((p) => (
              <tr key={p._id} className="hover:bg-yellow-50 transition">
                <td className="p-4">
                  <img
                    src={getImageSrc(p.image)}
                    alt={p.name}
                    className="w-14 h-14 rounded-lg shadow border object-cover"
                  />
                </td>
                <td className="font-semibold text-gray-800">{p.name}</td>
                <td>{p.category}</td>
                <td className="text-yellow-600 font-bold">₹{p.price}</td>
                <td className="max-w-xs truncate text-gray-600">
                  {p.description}
                </td>
                <td className="p-4 flex gap-3 justify-center">
                  <button
                    onClick={() => handleEdit(p)}
                    className="bg-blue-50 text-blue-600 px-3 py-1.5 rounded-lg hover:bg-blue-100 text-xs"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(p._id)}
                    className="bg-red-50 text-red-600 px-3 py-1.5 rounded-lg hover:bg-red-100 text-xs"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-4">
        {filteredProducts.map((p) => (
          <div key={p._id} className="bg-white border rounded-lg p-4 shadow-sm">
            <div className="flex items-center gap-3">
              <img
                src={getImageSrc(p.image)}
                alt={p.name}
                className="w-16 h-16 rounded-lg object-cover"
              />
              <div>
                <h4 className="font-semibold">{p.name}</h4>
                <p className="text-sm text-gray-500">{p.category}</p>
                <p className="text-yellow-600 font-bold">₹{p.price}</p>
              </div>
            </div>
            <p className="text-gray-600 mt-2 text-sm line-clamp-2">
              {p.description}
            </p>
            <div className="flex gap-2 mt-3">
              <button
                onClick={() => handleEdit(p)}
                className="bg-blue-50 text-blue-600 px-3 py-1 rounded-lg text-xs"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(p._id)}
                className="bg-red-50 text-red-600 px-3 py-1 rounded-lg text-xs"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
        {filteredProducts.length === 0 && (
          <p className="text-center text-gray-500">No products found 🚫</p>
        )}
      </div>
    </div>
  );
}
