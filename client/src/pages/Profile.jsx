import { useState, useEffect } from "react";
import {
  FaUser,
  FaEnvelope,
  FaBox,
  FaCog,
  FaSignOutAlt,
  FaSignInAlt,
} from "react-icons/fa";

import { logout, getProfile, getOrders } from "../services/authService";
import AccountSettings from "../components/AccountSettings.jsx";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const [activeTab, setActiveTab] = useState("info");
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    getProfile()
      .then((data) => setUser(data.user))
      .catch(() => setUser(null))
      .finally(() => setLoading(false));

    getOrders()
      .then((data) => setOrders(data))
      .catch(() => setOrders([]));
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (loading) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-500">Loading...</p>
      </section>
    );
  }

  //Logged-out fallback
  if (!user) {
    return (
      <section className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white shadow-xl rounded-2xl p-10 text-center max-w-md">
          <FaSignInAlt className="mx-auto mb-4 text-yellow-500" size={50} />
          <h2 className="text-2xl font-bold mb-2">Login Required</h2>
          <p className="mb-6 text-gray-500">
            Please log in to view your profile and orders.
          </p>
          <button
            onClick={() => navigate("/login")}
            className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 text-black py-3 rounded-lg font-semibold shadow hover:scale-[1.02] active:scale-95 transition"
          >
            Go to Login
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen py-20 bg-gradient-to-br from-indigo-50 via-white to-indigo-100 text-gray-900">
      <div className="max-w-5xl mx-auto px-6 space-y-10">
        {/* Profile Header */}
        <div className="text-center space-y-3">
          <div className="mx-auto h-28 w-28 flex items-center justify-center rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 text-4xl font-bold text-white shadow-lg">
            {user.name.charAt(0)}
          </div>
          <h2 className="text-3xl font-extrabold">{user.name}</h2>
          <p className="flex items-center justify-center gap-2 text-gray-600">
            <FaEnvelope className="h-4 w-4 text-yellow-500" /> {user.email}
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center gap-4">
          {[
            { id: "info", label: "Info", icon: FaUser },
            { id: "orders", label: "Orders", icon: FaBox },
            { id: "settings", label: "Settings", icon: FaCog },
            // eslint-disable-next-line no-unused-vars
          ].map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`flex items-center gap-2 px-6 py-2 rounded-full text-sm font-medium shadow-sm transition ${
                activeTab === id
                  ? "bg-yellow-400 text-black"
                  : "bg-white text-gray-500 hover:bg-gray-100"
              }`}
            >
              <Icon className="h-4 w-4" /> {label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div>
          {activeTab === "info" && (
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-white to-gray-50 shadow-xl p-8 border border-gray-100">
              {/* Decorative gradient accent */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-yellow-200 to-orange-300 rounded-bl-[100px] opacity-20 pointer-events-none"></div>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-4 text-center">
                {/* Orders Count */}
                <div className="bg-gray-50 rounded-xl py-4 shadow-sm hover:shadow-md transition">
                  <p className="text-xs text-gray-500 uppercase tracking-wide">
                    Orders
                  </p>
                  <p className="text-lg font-semibold text-gray-900">
                    {orders.length}
                  </p>
                </div>

                {/* Total Spent */}
                <div className="bg-gray-50 rounded-xl py-4 shadow-sm hover:shadow-md transition">
                  <p className="text-xs text-gray-500 uppercase tracking-wide">
                    Total Spent
                  </p>
                  <p className="text-lg font-semibold text-gray-900">
                    ₹{orders.reduce((sum, order) => sum + order.totalPrice, 0)}
                  </p>
                </div>

                {/* Loyalty Level */}
                <div className="bg-gray-50 rounded-xl py-4 shadow-sm hover:shadow-md transition">
                  <p className="text-xs text-gray-500 uppercase tracking-wide">
                    Loyalty
                  </p>
                  <p
                    className={`text-lg font-semibold ${
                      orders.length > 10
                        ? "text-yellow-600"
                        : orders.length > 5
                        ? "text-indigo-600"
                        : "text-gray-600"
                    }`}
                  >
                    {orders.length > 10
                      ? "Gold"
                      : orders.length > 5
                      ? "Silver"
                      : "Bronze"}
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === "orders" && (
            <div className="space-y-5">
              {orders.length === 0 ? (
                <p className="text-center text-gray-500">No orders yet.</p>
              ) : (
                orders.map((order) => (
                  <div
                    key={order._id}
                    className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition border border-transparent hover:border-yellow-400/40"
                  >
                    <div className="flex justify-between items-center mb-3">
                      <h4 className="font-semibold">
                        Order #{order._id.slice(-6)}
                      </h4>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          order.status === "Delivered"
                            ? "bg-green-100 text-green-700"
                            : order.status === "Shipped"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {order.status || "Pending"}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">
                      {order.cart.map((item) => item.name).join(", ")}
                    </p>
                    <p className="font-bold text-yellow-600">
                      ₹{order.totalPrice}
                    </p>
                  </div>
                ))
              )}
            </div>
          )}

          {activeTab === "settings" && (
            <AccountSettings user={user} setUser={setUser} />
          )}
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="mt-10 w-full bg-gradient-to-r from-red-500 to-red-600 py-3 rounded-xl font-semibold text-white shadow hover:scale-[1.02] active:scale-95 transition"
        >
          <div className="flex items-center justify-center gap-2">
            <FaSignOutAlt className="h-5 w-5" /> Logout
          </div>
        </button>
      </div>
    </section>
  );
}
