import { useState, useEffect } from "react";
import {
  FaUser,
  FaEnvelope,
  FaBox,
  FaCog,
  FaSignOutAlt,
  FaSignInAlt,
  FaReceipt,
  FaRupeeSign,
  FaMedal,
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
    let alive = true;

    getProfile()
      .then((data) => alive && setUser(data.user))
      .catch(() => alive && setUser(null))
      .finally(() => alive && setLoading(false));

    getOrders()
      .then((data) => alive && setOrders(data))
      .catch(() => alive && setOrders([]));

    return () => {
      alive = false;
    };
  }, []);

  const handleLogout = () => {
    logout();
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
            {user?.name?.[0]?.toUpperCase() ?? "U"}
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
            <div className="relative overflow-hidden rounded-2xl bg-white shadow-xl p-8 border border-gray-100">
              {/* Gradient accent */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-yellow-200 to-orange-300 rounded-bl-[100px] opacity-20 pointer-events-none"></div>

              {/* Quick Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
                {/* Orders Count */}
                <div className="bg-gray-50 rounded-xl py-6 shadow hover:shadow-md transition transform hover:scale-[1.02]">
                  <p className="text-xs uppercase tracking-wide text-gray-500 flex justify-center items-center gap-2">
                    <FaReceipt className="text-yellow-500" /> Orders
                  </p>
                  <p className="text-2xl font-extrabold text-gray-900 mt-2">
                    {orders.length}
                  </p>
                </div>

                {/* Total Spent */}
                <div className="bg-gray-50 rounded-xl py-6 shadow hover:shadow-md transition transform hover:scale-[1.02]">
                  <p className="text-xs uppercase tracking-wide text-gray-500 flex justify-center items-center gap-2">
                    <FaRupeeSign className="text-yellow-500" /> Total Spent
                  </p>
                  <p className="text-2xl font-extrabold text-yellow-500 mt-2">
                    ₹
                    {orders.reduce(
                      (sum, o) => sum + (Number(o?.totalPrice) || 0),
                      0
                    )}
                  </p>
                </div>

                {/* Loyalty Level */}
                <div className="bg-gray-50 rounded-xl py-6 shadow hover:shadow-md transition transform hover:scale-[1.02]">
                  <p className="text-xs uppercase tracking-wide text-gray-500 flex justify-center items-center gap-2">
                    <FaMedal className="text-yellow-500" /> Loyalty
                  </p>
                  <p
                    className={`text-2xl font-extrabold mt-2 ${
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
                    {/* Header */}
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="font-bold text-gray-800">
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

                    {/* Items */}
                    <div className="flex flex-wrap gap-2 mb-3">
                      {order.cart.map((item, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-600"
                        >
                          {item.name} × {item.quantity}
                        </span>
                      ))}
                    </div>

                    {/* Total */}
                    <div className="flex justify-between items-center">
                      <p className="text-sm text-gray-500">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </p>
                      <p className="font-bold text-lg bg-gradient-to-r from-yellow-500 to-orange-500 text-transparent bg-clip-text">
                        ₹{order.totalPrice}
                      </p>
                    </div>
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
