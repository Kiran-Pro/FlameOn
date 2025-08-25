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
    logout();
    navigate("/login");
  };

  const navItems = [
    { key: "products", label: "Products", icon: <FaBox /> },
    { key: "users", label: "Users", icon: <FaUsers /> },
    { key: "orders", label: "Orders", icon: <FaClipboardList /> },
  ];

  return (
    // push below fixed Navbar (h-16)
    <div className="min-h-screen bg-gray-50 flex flex-col lg:flex-row pt-16">
      {/* -------- Mobile/Tablet: Horizontal Tab Bar -------- */}
      <div className="lg:hidden fixed top-[52px] left-0 right-0 z-40 bg-white backdrop-blur-xl border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-3 py-2">
          <div className="flex px-3 py-4 justify-around gap-2 overflow-x-auto no-scrollbar">
            {navItems.map((item) => {
              const active = activeTab === item.key;
              return (
                <button
                  key={item.key}
                  onClick={() => setActiveTab(item.key)}
                  aria-current={active ? "page" : undefined}
                  className={`flex items-center gap-2 whitespace-nowrap px-3 py-2 rounded-full text-sm transition
                    ${
                      active
                        ? "bg-gradient-to-r from-yellow-500 to-orange-400 text-white shadow"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                >
                  <span className="text-base">{item.icon}</span>
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* spacer under the fixed horizontal bar */}
      <div className="lg:hidden h-12" />

      {/* -------- Desktop: Sticky Vertical Sidebar -------- */}
      <aside
        className="hidden lg:flex lg:sticky lg:top-16 lg:h-[calc(100vh-4rem)]
                   w-64 flex-col border-r border-gray-200 bg-white/95 backdrop-blur-xl shadow"
      >
        <div className="px-4 py-4 border-b">
          <h2 className="text-xl font-extrabold text-yellow-600 tracking-wide">
            Flame<span className="text-gray-800">On</span>
          </h2>
        </div>

        <nav className="flex-1 p-3 space-y-2 overflow-y-auto">
          {navItems.map((item) => {
            const active = activeTab === item.key;
            return (
              <button
                key={item.key}
                onClick={() => setActiveTab(item.key)}
                aria-current={active ? "page" : undefined}
                className={`relative flex items-center gap-3 w-full px-4 py-2 rounded-lg text-left transition
                  ${
                    active
                      ? "bg-gradient-to-r from-yellow-500 to-orange-400 text-white shadow"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
              >
                {active && (
                  <span className="absolute left-0 top-0 h-full w-1 bg-orange-500 rounded-r" />
                )}
                <span className="text-lg">{item.icon}</span>
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="p-3 border-t">
          <button
            onClick={handleLogout}
            className="flex items-center justify-center gap-2 w-full px-4 py-2 rounded-lg bg-red-500 text-white font-semibold hover:bg-red-600 transition"
          >
            <FaSignOutAlt />
            Logout
          </button>
        </div>
      </aside>

      {/* -------- Main Content -------- */}
      <main className="flex-1 p-4 md:p-8">
        {activeTab === "products" && <AdminProducts />}
        {activeTab === "users" && <AdminUsers />}
        {activeTab === "orders" && <AdminOrders />}
      </main>
    </div>
  );
}
