import { useState } from "react";
import {
  LogOut,
  User,
  Mail,
  Package,
  CheckCircle,
  Clock,
  Settings,
} from "lucide-react";

export default function Profile() {
  const [activeTab, setActiveTab] = useState("info");

  // Mock user data
  const [user] = useState({
    name: "Kiran Madhav",
    email: "kiran@example.com",
  });

  // Mock order history
  const orders = [
    {
      id: "ORD12345",
      item: "Classic Cheeseburger",
      price: "₹199",
      status: "Delivered",
    },
    {
      id: "ORD12346",
      item: "Pepperoni Pizza",
      price: "₹299",
      status: "On the way",
    },
    {
      id: "ORD12347",
      item: "Chocolate Milkshake",
      price: "₹149",
      status: "Pending",
    },
  ];

  const handleLogout = () => {
    console.log("User logged out");
    // TODO: clear auth and redirect
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white py-16">
      <div className="max-w-5xl mx-auto px-6">
        {/* Profile Header */}
        <div className="relative flex flex-col items-center bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl p-10 mb-12">
          {/* Avatar */}
          <div className="w-28 h-28 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 flex items-center justify-center text-4xl font-bold text-gray-900 shadow-lg">
            {user.name.charAt(0)}
          </div>

          <h2 className="mt-6 text-3xl font-extrabold">{user.name}</h2>
          <p className="text-gray-300 flex items-center gap-2 mt-2">
            <Mail className="w-4 h-4 text-yellow-400" />
            {user.email}
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center gap-6 mb-8">
          <button
            onClick={() => setActiveTab("info")}
            className={`px-6 py-2 rounded-full font-semibold transition ${
              activeTab === "info"
                ? "bg-yellow-500 text-black shadow-lg"
                : "bg-white/10 hover:bg-white/20"
            }`}
          >
            Profile Info
          </button>
          <button
            onClick={() => setActiveTab("orders")}
            className={`px-6 py-2 rounded-full font-semibold transition ${
              activeTab === "orders"
                ? "bg-yellow-500 text-black shadow-lg"
                : "bg-white/10 hover:bg-white/20"
            }`}
          >
            Orders
          </button>
          <button
            onClick={() => setActiveTab("settings")}
            className={`px-6 py-2 rounded-full font-semibold transition ${
              activeTab === "settings"
                ? "bg-yellow-500 text-black shadow-lg"
                : "bg-white/10 hover:bg-white/20"
            }`}
          >
            Settings
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === "info" && (
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-xl border border-white/20">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <User className="text-yellow-400" /> Profile Info
            </h2>
            <p className="mb-4">
              <span className="font-semibold">Name:</span> {user.name}
            </p>
            <p>
              <span className="font-semibold">Email:</span> {user.email}
            </p>
          </div>
        )}

        {activeTab === "orders" && (
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-xl border border-white/20">
            <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
              <Package className="text-yellow-400" /> Order History
            </h2>
            {orders.length === 0 ? (
              <p className="text-gray-400 italic">No orders placed yet.</p>
            ) : (
              <div className="space-y-4">
                {orders.map((order) => (
                  <div
                    key={order.id}
                    className="flex items-center justify-between bg-white/5 rounded-lg px-5 py-4 border border-white/10 hover:border-yellow-400/50 transition shadow-md hover:shadow-lg"
                  >
                    <div>
                      <p className="text-lg font-semibold">{order.item}</p>
                      <p className="text-sm text-gray-400">#{order.id}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-yellow-400 font-bold">{order.price}</p>
                      <span
                        className={`inline-flex items-center gap-1 px-3 py-1 mt-1 rounded-full text-xs font-semibold 
                          ${
                            order.status === "Delivered"
                              ? "bg-green-500/20 text-green-400"
                              : order.status === "On the way"
                              ? "bg-yellow-500/20 text-yellow-400"
                              : "bg-gray-500/20 text-gray-300"
                          }`}
                      >
                        {order.status === "Delivered" && (
                          <CheckCircle className="w-3 h-3" />
                        )}
                        {order.status === "On the way" && (
                          <Clock className="w-3 h-3" />
                        )}
                        {order.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === "settings" && (
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-xl border border-white/20">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Settings className="text-yellow-400" /> Settings
            </h2>
            <p className="text-gray-300">
              Settings options can go here (e.g., update password, notification
              preferences, delete account).
            </p>
          </div>
        )}

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="mt-12 w-full flex items-center justify-center gap-3 bg-gradient-to-r from-red-500 to-red-700 py-3 rounded-xl font-bold shadow-lg hover:scale-[1.02] active:scale-95 transition transform"
        >
          <LogOut className="w-5 h-5" />
          Logout
        </button>
      </div>
    </section>
  );
}
