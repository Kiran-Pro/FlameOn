import { useState } from "react";
import { useCartStore } from "../store/cartStore";
import { Link } from "react-router-dom";
import getImageSrc from "../utils/getImageSrc";
import { FaUtensils } from "react-icons/fa";

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, emptyCart } = useCartStore();

  const [promoInput, setPromoInput] = useState("");
  const [appliedCode, setAppliedCode] = useState("");
  const [promoMsg, setPromoMsg] = useState("");

  const formatINR = (n) =>
    Number(n || 0).toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  // Subtotal
  const subtotal = cart.reduce(
    (sum, item) => sum + (item.price || 0) * (item.quantity || 1),
    0
  );

  // Promo: FLAME10 → 10% off
  const discountRate = appliedCode === "FLAME10" ? 0.1 : 0;
  const discount = subtotal * discountRate;

  // GST @ 5% on (subtotal - discount)
  const gstRate = 0.05;
  const taxable = Math.max(0, subtotal - discount);
  const gst = taxable * gstRate;

  const grandTotal = taxable + gst;

  const applyPromo = () => {
    const code = promoInput.trim().toUpperCase();
    if (!code) {
      setAppliedCode("");
      setPromoMsg("Enter a promo code.");
      return;
    }
    if (code === "FLAME10") {
      setAppliedCode(code);
      setPromoMsg("FLAME10 applied: 10% off.");
    } else {
      setAppliedCode("");
      setPromoMsg("Invalid code. Try FLAME10.");
    }
  };

  // Empty cart state
  if (cart.length === 0) {
    return (
      <section className="py-20 bg-gray-100 min-h-screen flex flex-col items-center justify-center text-center px-4">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-800 mb-4 flex items-center gap-2">
          <FaUtensils className="text-yellow-500" />
          Your plate is empty!
        </h2>
        <p className="text-gray-600 mb-6 text-sm sm:text-base">
          Add something delicious to your cart.
        </p>
        <Link
          to="/products"
          className="bg-yellow-400 text-gray-900 px-6 sm:px-8 py-2.5 sm:py-3 rounded-full font-bold shadow hover:bg-yellow-500 transition"
        >
          Browse Menu
        </Link>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gray-100 min-h-screen flex justify-center px-4 sm:px-6">
      <div className="bg-white w-full max-w-2xl rounded-lg shadow-lg border border-gray-200 p-4 sm:p-6 font-sans">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-xl sm:text-2xl font-extrabold tracking-wider">
            Flame<span className="text-yellow-500">On</span>
          </h1>
          <p className="text-xs sm:text-sm text-gray-500">Food Order Receipt</p>
        </div>

        <hr className="border-dashed border-gray-300 mb-6" />

        {/* Items */}
        <div className="space-y-4">
          {cart.map((item) => (
            <div
              key={item._id || item.name}
              className="flex items-start sm:items-center justify-between border-b border-dashed border-gray-300 pb-3 gap-3"
            >
              <div className="flex items-start sm:items-center gap-3">
                <img
                  src={getImageSrc(item.image)}
                  alt={item.name}
                  className="w-12 h-12 sm:w-14 sm:h-14 rounded-md object-cover shadow"
                />
                <div>
                  <h3 className="text-gray-800 font-semibold text-sm sm:text-base">
                    {item.name}
                  </h3>
                  <p className="text-xs text-gray-500">
                    ₹{formatINR(item.price)} × {item.quantity}
                  </p>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-2 mt-1">
                    <button
                      onClick={() =>
                        item.quantity > 1
                          ? updateQuantity(item.name, item.quantity - 1)
                          : removeFromCart(item.name)
                      }
                      className="w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center rounded bg-gray-200 hover:bg-gray-300 text-sm"
                    >
                      −
                    </button>
                    <span className="text-sm sm:text-base font-medium">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() =>
                        updateQuantity(item.name, item.quantity + 1)
                      }
                      className="w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center rounded bg-gray-200 hover:bg-gray-300 text-sm"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* Price + Remove */}
              <div className="text-right">
                <p className="font-bold text-gray-900 text-sm sm:text-base">
                  ₹{formatINR((item.price || 0) * (item.quantity || 1))}
                </p>
                <button
                  onClick={() => removeFromCart(item.name)}
                  className="text-xs text-red-500 hover:underline"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Promo code */}
        <div className="mt-5">
          <label className="text-xs sm:text-sm text-gray-500">Promo Code</label>
          <div className="mt-1 flex gap-2">
            <input
              type="text"
              value={promoInput}
              onChange={(e) => setPromoInput(e.target.value)}
              placeholder="Try FLAME10"
              className="flex-1 rounded-md border border-gray-300 px-3 py-2 text-xs sm:text-sm outline-none focus:ring-2 focus:ring-yellow-400"
            />
            <button
              onClick={applyPromo}
              className="rounded-md bg-yellow-400 px-3 sm:px-4 py-2 text-xs sm:text-sm font-bold text-gray-900 hover:bg-yellow-500 transition"
            >
              Apply
            </button>
          </div>
          {promoMsg && (
            <p
              className={`mt-1 text-xs ${
                appliedCode ? "text-green-600" : "text-red-600"
              }`}
            >
              {promoMsg}
            </p>
          )}
        </div>

        {/* Totals */}
        <div className="mt-6 border-t border-dashed border-gray-300 pt-4 space-y-1 text-sm sm:text-base">
          <div className="flex justify-between text-gray-700">
            <span>Subtotal</span>
            <span>₹{formatINR(subtotal)}</span>
          </div>

          {discount > 0 && (
            <div className="flex justify-between text-green-600">
              <span>Discount ({Math.round(discountRate * 100)}%)</span>
              <span>− ₹{formatINR(discount)}</span>
            </div>
          )}

          <div className="flex justify-between text-gray-700">
            <span>GST (5%)</span>
            <span>₹{formatINR(gst)}</span>
          </div>

          <div className="mt-2 border-t border-dashed border-gray-200 pt-3 font-extrabold text-gray-900 flex justify-between">
            <span>Total</span>
            <span>₹{formatINR(grandTotal)}</span>
          </div>
        </div>

        <hr className="border-dashed border-gray-300 my-6" />

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={emptyCart}
            className="flex-1 bg-gray-200 text-gray-800 px-6 py-2.5 rounded-md font-semibold hover:bg-gray-300 transition text-sm sm:text-base"
          >
            Clear Cart
          </button>
          <Link
            to="/checkout"
            className="flex-1 bg-yellow-400 text-gray-900 px-6 py-2.5 rounded-md font-bold shadow hover:bg-yellow-500 transition text-center text-sm sm:text-base"
          >
            Proceed to Checkout
          </Link>
        </div>

        <p className="mt-6 text-xs sm:text-sm text-center text-gray-500">
          GST is calculated on the discounted amount. Thank you for dining!
        </p>
      </div>
    </section>
  );
}
