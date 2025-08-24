import { useEffect, useState } from "react";
import api from "../../services/authService.js";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [message, setMessage] = useState("");

  // Load all orders
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await api.get("/admin/orders");
        setOrders(res.data);
      } catch (err) {
        console.error("Failed to fetch orders:", err);
      }
    };
    fetchOrders();
  }, []);

  // Update order status
  const updateStatus = async (id, status) => {
    try {
      const res = await api.put(`/admin/orders/${id}/status`, { status });
      setOrders((prev) =>
        prev.map((o) =>
          o._id === id ? { ...o, status: res.data.order.status } : o
        )
      );
      setMessage(`Order marked as ${status}`);
    } catch (err) {
      console.error("Failed to update order:", err);
      setMessage("Failed to update order");
    }
    setTimeout(() => setMessage(""), 3000);
  };

  // Badge color helper
  const getStatusBadge = (status) => {
    const base = "px-3 py-1 text-xs font-bold rounded-full";
    switch (status) {
      case "Pending":
        return `${base} bg-yellow-100 text-yellow-700`;
      case "Preparing":
        return `${base} bg-blue-100 text-blue-700`;
      case "Delivered":
        return `${base} bg-green-100 text-green-700`;
      default:
        return `${base} bg-gray-200 text-gray-700`;
    }
  };

  return (
    <div className="space-y-6 py-24">
      <h2 className="text-2xl font-extrabold text-gray-800">Manage Orders</h2>

      {message && (
        <div className="p-3 rounded-lg bg-yellow-100 text-yellow-800 text-center font-medium shadow">
          {message}
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-6">
        {orders.map((order) => (
          <div
            key={order._id}
            className="bg-white rounded-xl shadow-md hover:shadow-lg transition p-6 border border-gray-100"
          >
            {/* Header */}
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-bold text-gray-800">
                  {order.userId?.name || order.name}
                </h3>
                <p className="text-sm text-gray-500">
                  {order.userId?.email || "No email"}
                </p>
              </div>
              <span className={getStatusBadge(order.status)}>
                {order.status}
              </span>
            </div>

            {/* Order details */}
            <div className="space-y-2 text-sm text-gray-700 mb-3">
              <p>
                <b>Total:</b> ₹{order.totalPrice}
              </p>
              <p>
                <b>Placed on:</b>{" "}
                {new Date(order.createdAt).toLocaleString("en-IN")}
              </p>
              {order.address && (
                <p>
                  <b>Address:</b> {order.address}
                </p>
              )}
            </div>

            {/* Ordered items */}
            <div className="bg-gray-50 rounded-lg p-3 mb-4">
              <p className="font-semibold text-gray-800 mb-2">🛒 Items:</p>
              <ul className="space-y-2">
                {order.cart?.map((item) => (
                  <li
                    key={item._id}
                    className="flex justify-between text-sm text-gray-700"
                  >
                    <span>
                      {item.name} × {item.quantity}
                    </span>
                    <span className="font-medium">
                      ₹{(item.price * item.quantity).toFixed(2)}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Status Controls */}
            <div className="flex gap-2">
              {["Pending", "Preparing", "Delivered"].map((s) => (
                <button
                  key={s}
                  onClick={() => updateStatus(order._id, s)}
                  className={`px-4 py-1.5 rounded-lg text-sm font-medium transition ${
                    order.status === s
                      ? "bg-yellow-500 text-white shadow"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {orders.length === 0 && (
        <p className="text-gray-500 text-center italic">No orders available</p>
      )}
    </div>
  );
}
