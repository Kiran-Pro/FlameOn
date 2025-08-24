import { useState } from "react";
import { FaBox, FaUsers, FaClipboardList, FaSignOutAlt } from "react-icons/fa";
import AdminProducts from "../components/admin/adminProducts/AdminProducts";
import AdminUsers from "../components/admin/AdminUsers";
import AdminOrders from "../components/admin/AdminOrders";
import { logout } from "../services/authService";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("products");
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // clears token + user from localStorage
    navigate("/login"); // redirect
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg p-6 hidden md:block py-24 sticky top-0">
        <nav className="space-y-4">
          <button
            onClick={() => setActiveTab("products")}
            aria-current={activeTab === "products" ? "page" : undefined}
            className={`flex items-center gap-2 w-full text-left px-4 py-2 rounded-lg transition ${
              activeTab === "products"
                ? "bg-yellow-500 text-white"
                : "hover:bg-gray-200"
            }`}
          >
            <FaBox /> Products
          </button>

          <button
            onClick={() => setActiveTab("users")}
            aria-current={activeTab === "users" ? "page" : undefined}
            className={`flex items-center gap-2 w-full text-left px-4 py-2 rounded-lg transition ${
              activeTab === "users"
                ? "bg-yellow-500 text-white"
                : "hover:bg-gray-200"
            }`}
          >
            <FaUsers /> Users
          </button>

          <button
            onClick={() => setActiveTab("orders")}
            aria-current={activeTab === "orders" ? "page" : undefined}
            className={`flex items-center gap-2 w-full text-left px-4 py-2 rounded-lg transition ${
              activeTab === "orders"
                ? "bg-yellow-500 text-white"
                : "hover:bg-gray-200"
            }`}
          >
            <FaClipboardList /> Orders
          </button>
        </nav>

        {/* Logout button */}
        <button
          onClick={handleLogout}
          className="mt-10 flex items-center gap-2 w-full text-left px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600"
        >
          <FaSignOutAlt /> Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        {activeTab === "products" && <AdminProducts />}
        {activeTab === "users" && <AdminUsers />}
        {activeTab === "orders" && <AdminOrders />}
      </main>
    </div>
  );
}
