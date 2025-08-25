import { useCartStore } from "../store/cartStore";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaCreditCard, FaUser, FaEnvelope, FaPhone } from "react-icons/fa6";
import { FaMapMarkerAlt } from "react-icons/fa";

export default function Checkout() {
  const { cart } = useCartStore();
  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
    payment: "card",
    cookingInstructions: "",
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

  //Lazy-load Razorpay script
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      if (document.querySelector("#razorpay-script")) return resolve(true);
      const script = document.createElement("script");
      script.id = "razorpay-script";
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.payment === "cod") {
      //COD Flow: save directly in DB
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API}/orders`,
          { ...form, cart, totalPrice },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        const orderId = response.data?._id || "ORD12345";
        useCartStore.getState().emptyCart();
        navigate("/order-confirmation", { state: { orderId, totalPrice } });
      } catch (err) {
        console.error("Error placing COD order:", err);
        alert("Error placing order. Please try again.");
      }
      return;
    }

    //Razorpay Flow
    try {
      //ensure Razorpay script is loaded
      const loaded = await loadRazorpayScript();
      if (!loaded) {
        alert("Failed to load Razorpay SDK. Please check your connection.");
        return;
      }

      //create order on backend
      const { data: razorpayOrder } = await axios.post(
        `${import.meta.env.VITE_API}/payments/create-order`,
        { amount: totalPrice }
      );

      //open Razorpay checkout
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: razorpayOrder.amount,
        currency: razorpayOrder.currency,
        order_id: razorpayOrder.id,
        name: "FlameOn Restaurant",
        description: "Test Transaction",
        handler: async function (response) {
          //verify payment
          await axios.post(`${import.meta.env.VITE_API}/payments/verify`, {
            orderId: response.razorpay_order_id,
            paymentId: response.razorpay_payment_id,
            signature: response.razorpay_signature,
          });

          //save order in DB
          await axios.post(
            `${import.meta.env.VITE_API}/orders`,
            {
              ...form,
              cart,
              totalPrice,
              paymentId: response.razorpay_payment_id,
            },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );

          useCartStore.getState().emptyCart();
          navigate("/order-confirmation", {
            state: { orderId: response.razorpay_order_id, totalPrice },
          });
        },
        theme: { color: "#F37254" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error("Payment error:", err);
      alert("Payment failed, please try again.");
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
          className="w-full md:w-auto bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 px-10 py-4 rounded-full text-lg font-bold shadow-lg hover:from-yellow-500 hover:to-orange-600 transition transform hover:scale-105 active:scale-95"
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
                <FaUser
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
                <FaEnvelope
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
                <FaMapMarkerAlt
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
                <FaPhone
                  className="absolute left-3 top-3 text-gray-400"
                  size={20}
                />
                <input
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="Phone Number"
                  required
                  className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>

              <div className="relative">
                <FaCreditCard
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

              <div className="relative">
                <textarea
                  name="cookingInstructions"
                  value={form.cookingInstructions}
                  onChange={handleChange}
                  placeholder="Cooking Instructions (optional)"
                  rows={3}
                  className="w-full border border-gray-300 rounded-lg pl-4 pr-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full md:w-auto bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 px-10 py-4 rounded-full text-lg font-bold shadow-lg hover:from-yellow-500 hover:to-orange-600 transition transform hover:scale-105 active:scale-95"
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
