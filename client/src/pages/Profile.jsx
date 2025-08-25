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
  FaSort,
  FaFilter,
} from "react-icons/fa";
import { logout, getProfile, getOrders } from "../services/authService";
import AccountSettings from "../components/AccountSettings.jsx";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const [activeTab, setActiveTab] = useState("info");
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState("recent");
  const [statusFilter, setStatusFilter] = useState("all");
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
    navigate("/login");
  };

  if (loading) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-500">Loading...</p>
      </section>
    );
  }

  if (!user) {
    return (
      <section className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="bg-white shadow-xl rounded-2xl p-6 sm:p-10 text-center w-full max-w-md">
          <FaSignInAlt className="mx-auto mb-4 text-yellow-500" size={50} />
          <h2 className="text-xl sm:text-2xl font-bold mb-2">Login Required</h2>
          <p className="mb-6 text-gray-500 text-sm sm:text-base">
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

  // Apply filters + sort
  let filteredOrders = [...orders];
  if (statusFilter !== "all") {
    filteredOrders = filteredOrders.filter(
      (o) => (o.status || "Pending").toLowerCase() === statusFilter
    );
  }
  const sortedOrders = filteredOrders.sort((a, b) =>
    sortOrder === "recent"
      ? new Date(b.createdAt) - new Date(a.createdAt)
      : new Date(a.createdAt) - new Date(b.createdAt)
  );

  return (
    <section className="min-h-screen py-16 sm:py-20 bg-gradient-to-br from-indigo-50 via-white to-indigo-100 text-gray-900">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-10">
        {/* Profile Header */}
        <div className="text-center space-y-3">
          <div className="mx-auto h-20 w-20 sm:h-28 sm:w-28 flex items-center justify-center rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 text-3xl sm:text-4xl font-bold text-white shadow-lg">
            {user?.name?.[0]?.toUpperCase() ?? "U"}
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold">{user.name}</h2>
          <p className="flex items-center justify-center gap-2 text-gray-600 text-sm sm:text-base">
            <FaEnvelope className="h-4 w-4 text-yellow-500" /> {user.email}
          </p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-4">
          {[
            { id: "info", label: "Info", icon: FaUser },
            { id: "orders", label: "Orders", icon: FaBox },
            { id: "settings", label: "Settings", icon: FaCog },
            // eslint-disable-next-line no-unused-vars
          ].map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`flex items-center gap-1 sm:gap-2 px-4 sm:px-6 py-2 rounded-full text-sm font-medium shadow-sm transition ${
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
            <div className="rounded-2xl bg-white shadow-xl p-6 sm:p-8 border border-gray-100">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                <div className="bg-gray-50 rounded-xl py-5 shadow">
                  <p className="text-xs uppercase text-gray-500 flex justify-center items-center gap-2">
                    <FaReceipt className="text-yellow-500" /> Orders
                  </p>
                  <p className="text-2xl font-extrabold">{orders.length}</p>
                </div>
                <div className="bg-gray-50 rounded-xl py-5 shadow">
                  <p className="text-xs uppercase text-gray-500 flex justify-center items-center gap-2">
                    <FaRupeeSign className="text-yellow-500" /> Total Spent
                  </p>
                  <p className="text-2xl font-extrabold text-yellow-500">
                    ₹
                    {orders.reduce(
                      (sum, o) => sum + (Number(o?.totalPrice) || 0),
                      0
                    )}
                  </p>
                </div>
                <div className="bg-gray-50 rounded-xl py-5 shadow">
                  <p className="text-xs uppercase text-gray-500 flex justify-center items-center gap-2">
                    <FaMedal className="text-yellow-500" /> Loyalty
                  </p>
                  <p
                    className={`text-2xl font-extrabold ${
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
            <div className="space-y-4">
              {/* Filter Controls */}
              <div className="bg-white rounded-xl p-4 shadow flex flex-col sm:flex-row gap-3 sm:gap-6 items-start sm:items-center justify-between">
                <div className="flex items-center gap-2 text-gray-600 font-medium">
                  <FaFilter className="text-yellow-500" />
                  <span>Filter Orders</span>
                </div>
                <div className="flex flex-wrap gap-3">
                  {/* Status Filter */}
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-yellow-400 outline-none"
                  >
                    <option value="all">All Status</option>
                    <option value="pending">Pending</option>
                    <option value="preparing">Preparing</option>
                    <option value="delivered">Delivered</option>
                  </select>

                  {/* Sort Filter */}
                  <select
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                    className="border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-yellow-400 outline-none"
                  >
                    <option value="recent">Most Recent</option>
                    <option value="oldest">Oldest First</option>
                  </select>
                </div>
              </div>

              {/* Orders */}
              {sortedOrders.length === 0 ? (
                <p className="text-center text-gray-500">
                  No orders match the selected filters.
                </p>
              ) : (
                sortedOrders.map((order) => (
                  <div
                    key={order._id}
                    className="bg-white rounded-2xl p-4 sm:p-6 shadow-md hover:shadow-xl transition border hover:border-yellow-400/40"
                  >
                    {/* Header row */}
                    <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-3 gap-2">
                      <h4 className="font-bold text-gray-800 text-sm sm:text-base">
                        Order #{order._id.slice(-6)}
                      </h4>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium w-fit ${
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
                          className="px-2 py-1 bg-gray-100 rounded-full text-xs sm:text-sm text-gray-600"
                        >
                          {item.name} × {item.quantity}
                        </span>
                      ))}
                    </div>

                    {/* Footer row */}
                    <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
                      <p className="text-xs sm:text-sm text-gray-500">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </p>
                      <p className="font-bold text-base sm:text-lg bg-gradient-to-r from-yellow-500 to-orange-500 text-transparent bg-clip-text">
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
            <FaSignOutAlt className="h-4 w-4 sm:h-5 sm:w-5" /> Logout
          </div>
        </button>
      </div>
    </section>
  );
}
