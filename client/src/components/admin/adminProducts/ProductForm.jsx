import { FaPlus } from "react-icons/fa";
import api from "../../../services/authService.js";
import getImageSrc from "../../../utils/getImageSrc.js";

export default function ProductForm({
  form,
  setForm,
  file,
  setFile,
  editingId,
  setProducts,
  setMessage,
  resetForm,
  loading,
  setLoading,
  hideMessage,
  categories,
}) {
  // Upload image
  const handleUpload = async () => {
    if (!file) return form.image;
    const formData = new FormData();
    formData.append("image", file);
    const res = await api.post("/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data.imageUrl;
  };

  // Submit handler
  const handleSubmit = async () => {
    setLoading(true);
    try {
      const uploadedUrl = await handleUpload();
      if (editingId) {
        const res = await api.put(`/admin/products/${editingId}`, {
          ...form,
          image: uploadedUrl,
        });
        setProducts((prev) =>
          prev.map((p) => (p._id === editingId ? res.data.product : p))
        );
        setMessage("Product updated!");
      } else {
        const res = await api.post("/admin/products", {
          ...form,
          image: uploadedUrl,
        });
        setProducts((prev) => [...prev, res.data.product]);
        setMessage("Product added!");
      }
      resetForm();
    } catch {
      setMessage("Failed to save product");
    }
    setLoading(false);
    hideMessage();
  };

  return (
    <div className="grid grid-cols-2 gap-4">
      {/* Name */}
      <input
        placeholder="Name"
        value={form.name || ""}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        className="border p-2 rounded focus:ring-2 focus:ring-yellow-400 outline-none"
      />

      {/* Price */}
      <input
        type="number"
        placeholder="Price"
        value={form.price || ""}
        onChange={(e) => setForm({ ...form, price: e.target.value })}
        className="border p-2 rounded focus:ring-2 focus:ring-yellow-400 outline-none"
      />

      {/* File Upload */}
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setFile(e.target.files[0])}
        className="col-span-2 border p-2 rounded"
      />

      {/* Image Preview */}
      {(file || form.image) && (
        <div className="col-span-2">
          <img
            src={file ? URL.createObjectURL(file) : getImageSrc(form.image)}
            alt="preview"
            className="h-32 object-cover rounded-lg shadow border"
          />
        </div>
      )}

      {/* Category */}
      <select
        value={form.category || ""}
        onChange={(e) => setForm({ ...form, category: e.target.value })}
        className="border p-2 rounded focus:ring-2 focus:ring-yellow-400 outline-none col-span-2"
      >
        <option value="">Select Category</option>
        {categories.map((cat) => (
          <option key={cat._id} value={cat.name}>
            {cat.name.charAt(0).toUpperCase() + cat.name.slice(1)}
          </option>
        ))}
      </select>

      {/* Description */}
      <textarea
        placeholder="Description"
        value={form.description || ""}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
        className="border p-2 rounded col-span-2 focus:ring-2 focus:ring-yellow-400 outline-none"
      />

      {/* Buttons */}
      <div className="col-span-2 mt-4 flex gap-3">
        <button
          onClick={handleSubmit}
          disabled={loading}
          className={`${
            editingId
              ? "bg-green-500 hover:bg-green-600"
              : "bg-yellow-500 hover:bg-yellow-600"
          } text-white px-6 py-2 rounded-lg ${
            loading ? "opacity-60 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Saving..." : editingId ? "Update Product" : "Add Product"}
        </button>

        {editingId && (
          <button
            onClick={resetForm}
            className="bg-gray-400 text-white px-6 py-2 rounded-lg hover:bg-gray-500"
          >
            Cancel
          </button>
        )}
      </div>
    </div>
  );
}
