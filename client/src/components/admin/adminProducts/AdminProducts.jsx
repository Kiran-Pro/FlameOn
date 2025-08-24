import { useEffect, useState } from "react";
import api from "../../../services/authService.js";
import CategoryManager from "./CategoryManager.jsx";
import ProductForm from "./ProductForm.jsx";
import ProductTable from "./ProductTable.jsx";
import { FaPlus } from "react-icons/fa6";

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
    image: "",
    category: "",
  });
  const [file, setFile] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // Fetch products & categories
  useEffect(() => {
    const fetchData = async () => {
      try {
        const resProducts = await api.get("/products");
        setProducts(resProducts.data);
        const resCats = await api.get("/categories");
        setCategories(resCats.data);
      } catch (err) {
        console.error("Failed to fetch:", err);
      }
    };
    fetchData();
  }, []);

  // Helpers
  const resetForm = () => {
    setForm({ name: "", price: "", description: "", image: "", category: "" });
    setFile(null);
    setEditingId(null);
    setShowModal(false);
  };
  const hideMessage = () => setTimeout(() => setMessage(""), 3000);

  return (
    <div className="space-y-12 py-12">
      {message && (
        <div className="p-3 rounded-lg bg-yellow-100 text-yellow-800 shadow text-center font-semibold">
          {message}
        </div>
      )}

      {/* Category Manager */}
      <CategoryManager
        categories={categories}
        setCategories={setCategories}
        setMessage={setMessage}
        hideMessage={hideMessage}
      />

      {/* Add Product (inline card) */}
      {!editingId && (
        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
          <h3 className="font-bold text-lg mb-6 text-gray-800">
            <div className="flex items-center gap-2">
              <FaPlus className="inline-block mr-2 text-yellow-500" />
              Add New Product
            </div>
          </h3>
          <ProductForm
            form={form}
            setForm={setForm}
            file={file}
            setFile={setFile}
            editingId={editingId}
            setEditingId={setEditingId}
            setProducts={setProducts}
            setMessage={setMessage}
            resetForm={resetForm}
            loading={loading}
            setLoading={setLoading}
            hideMessage={hideMessage}
            categories={categories}
          />
        </div>
      )}

      {/* Product Table */}
      <ProductTable
        products={products}
        setProducts={setProducts}
        setForm={setForm}
        setFile={setFile}
        setEditingId={setEditingId}
        setMessage={setMessage}
        hideMessage={hideMessage}
        setShowModal={setShowModal}
      />

      {/* Edit Modal */}
      {showModal && editingId && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl p-8 relative animate-fadeIn">
            {/* Close button */}
            <button
              onClick={resetForm}
              className="absolute top-4 right-4 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-full w-8 h-8 flex items-center justify-center shadow"
            >
              ✕
            </button>

            {/* Modal Header */}
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Edit Product
            </h2>

            <ProductForm
              form={form}
              setForm={setForm}
              file={file}
              setFile={setFile}
              editingId={editingId}
              setEditingId={setEditingId}
              setProducts={setProducts}
              setMessage={setMessage}
              resetForm={resetForm}
              loading={loading}
              setLoading={setLoading}
              hideMessage={hideMessage}
              categories={categories}
            />
          </div>
        </div>
      )}
    </div>
  );
}
