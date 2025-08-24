import { useState, useMemo } from "react";
import api from "../../../services/authService.js";
import getImageSrc from "../../../utils/getImageSrc.js";
import { FaEdit, FaTrash, FaSearch } from "react-icons/fa";

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

  //Filter + Sort Logic
  const filteredProducts = useMemo(() => {
    let list = [...products];

    // search
    if (search.trim()) {
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(search.toLowerCase()) ||
          p.description.toLowerCase().includes(search.toLowerCase())
      );
    }

    // category
    if (filterCategory) {
      list = list.filter(
        (p) => p.category?.toLowerCase() === filterCategory.toLowerCase()
      );
    }

    // sort
    if (sort === "low") list.sort((a, b) => a.price - b.price);
    else if (sort === "high") list.sort((a, b) => b.price - a.price);

    return list;
  }, [products, search, filterCategory, sort]);

  const handleEdit = (product) => {
    setEditingId(product._id);
    setForm({
      name: product.name,
      price: product.price,
      description: product.description,
      image: product.image,
      category: product.category,
    });
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

  // get unique categories
  const categories = [...new Set(products.map((p) => p.category))];

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
      {/* Search + Filters */}
      <div className="flex flex-wrap gap-4 mb-6 items-center justify-between">
        {/* Search Bar */}
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

        {/* Category Filter */}
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400"
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </option>
          ))}
        </select>

        {/* Sort */}
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

      {/* Table */}
      <div className="overflow-x-auto">
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
              <tr
                key={p._id}
                className="hover:bg-yellow-50 transition duration-200"
              >
                <td className="p-4">
                  <img
                    src={getImageSrc(p.image)}
                    alt={p.name}
                    className="w-14 h-14 rounded-lg shadow border object-cover"
                  />
                </td>
                <td className="font-semibold text-gray-800">{p.name}</td>
                <td>
                  <span className="px-3 py-1 bg-gray-100 rounded-full text-xs font-medium capitalize">
                    {p.category}
                  </span>
                </td>
                <td className="text-yellow-600 font-bold">₹{p.price}</td>
                <td className="max-w-xs truncate text-gray-600">
                  {p.description}
                </td>
                <td className="p-4 flex gap-3 justify-center">
                  <button
                    onClick={() => handleEdit(p)}
                    className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold 
                               bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition"
                  >
                    <FaEdit /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(p._id)}
                    className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold 
                               bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition"
                  >
                    <FaTrash /> Delete
                  </button>
                </td>
              </tr>
            ))}

            {filteredProducts.length === 0 && (
              <tr>
                <td
                  colSpan="6"
                  className="p-6 text-center text-gray-500 italic"
                >
                  No products found 🚫
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
