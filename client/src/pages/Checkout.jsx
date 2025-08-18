import { useCartStore } from "../store/cartStore";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { CreditCard, MapPin, User, Mail, ArrowRight } from "lucide-react";

export default function Checkout() {
  const { cart, removeFromCart } = useCartStore();
  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    payment: "card",
  });
  const navigate = useNavigate();

  // Calculate total
  let totalPrice = 0;
  cart.forEach((item) => {
    totalPrice += item.price * item.quantity;
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/orders", {
        ...form,
        cart,
        totalPrice,
      });

      alert("✅ Order placed successfully!");
      cart.forEach((item) => removeFromCart(item._id));
      navigate("/");
    } catch (err) {
      console.error("Error placing order:", err);
      alert("❌ Error placing order. Please try again.");
    }
  };

  if (cart.length === 0) {
    return (
      <section className="flex flex-col items-center justify-center py-20 bg-gradient-to-br from-gray-100 via-gray-50 to-white min-h-screen">
        <h2 className="text-2xl font-bold text-gray-700 mb-4">
          Your cart is empty
        </h2>
        <button
          onClick={() => navigate("/products")}
          className="bg-gradient-to-r from-indigo-600 to-blue-500 text-white px-6 py-3 rounded-xl shadow hover:from-indigo-700 hover:to-blue-600 transition"
        >
          Browse Products
        </button>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gradient-to-br from-gray-100 via-gray-50 to-white min-h-screen">
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="grid md:grid-cols-2 gap-10">
          {/* Checkout Form */}
          <div className="bg-white/80 backdrop-blur-xl shadow-xl rounded-2xl p-10 border border-gray-200">
            <h1 className="text-3xl font-extrabold mb-8 text-gray-900">
              Checkout
            </h1>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="relative">
                <User
                  className="absolute left-3 top-3 text-gray-400"
                  size={20}
                />
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Full Name"
                  required
                  className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>

              <div className="relative">
                <Mail
                  className="absolute left-3 top-3 text-gray-400"
                  size={20}
                />
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Email Address"
                  required
                  className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>

              <div className="relative">
                <MapPin
                  className="absolute left-3 top-3 text-gray-400"
                  size={20}
                />
                <textarea
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  placeholder="Shipping Address"
                  required
                  rows={4}
                  className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>

              <div className="relative">
                <CreditCard
                  className="absolute left-3 top-3 text-gray-400"
                  size={20}
                />
                <select
                  name="payment"
                  value={form.payment}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none"
                >
                  <option value="card">Credit/Debit Card</option>
                  <option value="cod">Cash on Delivery</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-indigo-600 to-blue-500 text-white font-semibold px-6 py-3 rounded-xl shadow-lg hover:from-indigo-700 hover:to-blue-600 transition transform hover:scale-[1.02] active:scale-95"
              >
                Place Order
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="bg-white/90 backdrop-blur-xl rounded-2xl p-8 shadow-xl border border-gray-200 md:sticky md:top-20 h-fit">
            <h2 className="text-xl font-bold mb-6 text-gray-900">
              Order Summary
            </h2>
            <div className="space-y-5">
              {cart.map((item) => (
                <div
                  key={item._id}
                  className="flex justify-between items-center text-gray-700 bg-gray-50 px-4 py-3 rounded-lg"
                >
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-gray-500">
                      Qty: {item.quantity}
                    </p>
                  </div>
                  <p className="font-semibold">₹{item.price * item.quantity}</p>
                </div>
              ))}
            </div>
            <hr className="my-6" />
            <div className="flex justify-between text-lg font-bold text-gray-900">
              <p>Total:</p>
              <p>₹{totalPrice}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
