import { FaTrash, FaTags } from "react-icons/fa";
import api from "../../../services/authService.js";
import { useState } from "react";

export default function CategoryManager({
  categories,
  setCategories,
  setMessage,
  hideMessage,
}) {
  const [newCategory, setNewCategory] = useState("");

  const handleAddCategory = async () => {
    if (!newCategory.trim()) return;
    try {
      const res = await api.post("/categories", { name: newCategory });
      setCategories((prev) => [...prev, res.data]);
      setNewCategory("");
      setMessage("Category added!");
    } catch {
      setMessage("Failed to add category");
    }
    hideMessage();
  };

  const handleDeleteCategory = async (id) => {
    if (!window.confirm("Delete this category?")) return;
    try {
      await api.delete(`/categories/${id}`);
      setCategories((prev) => prev.filter((c) => c._id !== id));
    } catch {
      setMessage("Failed to delete category");
    }
    hideMessage();
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
      <h3 className="font-bold text-lg mb-4 flex items-center gap-2 text-gray-800">
        <FaTags className="text-yellow-500" /> Manage Categories
      </h3>
      <div className="flex gap-3 mb-4">
        <input
          placeholder="New Category"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          className="border p-2 rounded-lg flex-1 focus:ring-2 focus:ring-yellow-400 outline-none"
        />
        <button
          onClick={handleAddCategory}
          className="bg-green-500 text-white px-5 py-2 rounded-lg hover:bg-green-600 transition"
        >
          Add
        </button>
      </div>
      <div className="flex flex-wrap gap-3">
        {categories.map((cat) => (
          <span
            key={cat._id}
            className="px-4 py-2 bg-gray-100 rounded-full flex items-center gap-2 shadow-sm"
          >
            <span className="capitalize">{cat.name}</span>
            <button
              onClick={() => handleDeleteCategory(cat._id)}
              className="text-red-500 hover:text-red-700"
            >
              <FaTrash />
            </button>
          </span>
        ))}
      </div>
    </div>
  );
}
