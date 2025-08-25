import { useLocation, useNavigate } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";

export default function OrderConfirmation() {
  const location = useLocation();
  const navigate = useNavigate();

  // Get order details (from navigate state)
  const { orderId, totalPrice } = location.state || {};

  return (
    <section className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-50 via-white to-yellow-50 px-4">
      <div className="bg-white/90 backdrop-blur-xl shadow-2xl rounded-2xl p-8 sm:p-10 text-center max-w-md w-full border border-green-100">
        {/* Success Icon */}
        <FaCheckCircle
          className="text-green-500 mx-auto mb-4 animate-bounce"
          size={64}
        />

        {/* Title */}
        <h1 className="text-3xl font-extrabold text-gray-900 mb-3">
          Order Confirmed!
        </h1>

        {/* Subtitle */}
        <p className="text-gray-600">Thank you for your purchase!</p>
        <p className="text-gray-600 mb-6">
          Your order has been successfully placed
        </p>

        {/* Order Info */}
        {orderId && (
          <p className="text-sm text-gray-500 mb-2">
            <span className="font-semibold text-gray-700">Order ID:</span>{" "}
            {orderId}
          </p>
        )}
        {totalPrice && (
          <p className="text-lg font-bold text-gray-900 mb-6">
            Total: ₹{totalPrice.toLocaleString("en-IN")}
          </p>
        )}

        <button
          onClick={() => navigate("/products")}
          className="w-full sm:w-auto bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 px-8 py-3 rounded-full text-base sm:text-lg font-bold shadow-lg hover:from-yellow-500 hover:to-orange-600 hover:scale-105 active:scale-95 transition"
        >
          Continue Shopping
        </button>
      </div>
    </section>
  );
}
