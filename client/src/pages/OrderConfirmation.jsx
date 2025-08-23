import { useLocation, useNavigate } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";

export default function OrderConfirmation() {
  const location = useLocation();
  const navigate = useNavigate();

  // Retrieve order details passed via navigate state
  const { orderId, totalPrice } = location.state || {};

  return (
    <section className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-50 to-white">
      <div className="bg-white shadow-2xl rounded-2xl p-10 text-center max-w-md">
        <FaCheckCircle className="text-green-500 mx-auto mb-4" size={60} />
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Order Confirmed!
        </h1>
        <p className="text-gray-600 mb-6">
          Thank you for your purchase. Your order has been successfully placed.
        </p>

        {orderId && (
          <p className="text-sm text-gray-500 mb-2">
            <span className="font-semibold">Order ID:</span> {orderId}
          </p>
        )}
        {totalPrice && (
          <p className="text-lg font-semibold text-gray-800 mb-6">
            Total: ₹{totalPrice}
          </p>
        )}

        <button
          onClick={() => navigate("/products")}
          className="w-full md:w-auto bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 px-10 py-4 rounded-full text-lg font-bold shadow-lg hover:from-yellow-500 hover:to-orange-600 transition transform hover:scale-105 active:scale-95"
        >
          Continue Shopping
        </button>
      </div>
    </section>
  );
}
