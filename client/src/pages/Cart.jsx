import { useState } from "react";
import { useCartStore } from "../store/cartStore";
import { Link } from "react-router-dom";
import getImageSrc from "../utils/getImageSrc";

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
      <section className="py-20 bg-gray-100 min-h-screen flex flex-col items-center justify-center text-center">
        <h2 className="text-3xl font-extrabold text-gray-800 mb-4">
          Your plate is empty!
        </h2>
        <p className="text-gray-600 mb-6">
          Add something delicious to your cart.
        </p>
        <Link
          to="/products"
          className="bg-yellow-400 text-gray-900 px-8 py-3 rounded-full font-bold shadow hover:bg-yellow-500 transition"
        >
          Browse Menu
        </Link>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gray-100 min-h-screen flex justify-center">
      <div className="bg-white w-full max-w-md rounded-lg shadow-lg border border-gray-300 p-6 font-mono">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-extrabold tracking-wider">
            Flame<span className="text-yellow-500">On</span>
          </h1>
          <p className="text-sm text-gray-500">Food Order Receipt</p>
        </div>

        <hr className="border-dashed border-gray-400 mb-6" />

        {/* Items */}
        <div className="space-y-4">
          {cart.map((item) => (
            <div
              key={item.name}
              className="flex items-center justify-between border-b border-dashed border-gray-300 pb-3"
            >
              <div className="flex items-center gap-3">
                <img
                  src={getImageSrc(item.image)}
                  alt={item.name}
                  className="w-12 h-12 rounded-md object-cover shadow"
                />
                <div>
                  <h3 className="text-gray-800 font-semibold">{item.name}</h3>
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
                      className="w-6 h-6 flex items-center justify-center rounded bg-gray-200 hover:bg-gray-300"
                    >
                      −
                    </button>
                    <span className="text-sm">{item.quantity}</span>
                    <button
                      onClick={() =>
                        updateQuantity(item.name, item.quantity + 1)
                      }
                      className="w-6 h-6 flex items-center justify-center rounded bg-gray-200 hover:bg-gray-300"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* Price + Remove */}
              <div className="text-right">
                <p className="font-bold text-gray-900">
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
          <label className="text-xs text-gray-500">Promo Code</label>
          <div className="mt-1 flex gap-2">
            <input
              type="text"
              value={promoInput}
              onChange={(e) => setPromoInput(e.target.value)}
              placeholder="Try FLAME10"
              className="flex-1 rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-yellow-400"
            />
            <button
              onClick={applyPromo}
              className="rounded-md bg-yellow-400 px-4 py-2 text-sm font-bold text-gray-900 hover:bg-yellow-500 transition"
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
        <div className="mt-6 border-t border-dashed border-gray-400 pt-4 space-y-1">
          <div className="flex justify-between text-sm text-gray-700">
            <span>Subtotal</span>
            <span>₹{formatINR(subtotal)}</span>
          </div>

          {discount > 0 && (
            <div className="flex justify-between text-sm text-green-600">
              <span>Discount ({Math.round(discountRate * 100)}%)</span>
              <span>− ₹{formatINR(discount)}</span>
            </div>
          )}

          <div className="flex justify-between text-sm text-gray-700">
            <span>GST (5%)</span>
            <span>₹{formatINR(gst)}</span>
          </div>

          <div className="mt-2 border-t border-dashed border-gray-300 pt-3">
            <div className="flex justify-between text-lg font-extrabold text-gray-900">
              <span>Total</span>
              <span>₹{formatINR(grandTotal)}</span>
            </div>
          </div>
        </div>

        <hr className="border-dashed border-gray-400 my-6" />

        <div className="flex flex-col gap-3">
          <button
            onClick={emptyCart}
            className="bg-gray-200 text-gray-800 px-6 py-3 rounded-md font-semibold hover:bg-gray-300 transition"
          >
            Clear Cart
          </button>
          <Link
            to="/checkout"
            className="bg-yellow-400 text-gray-900 px-6 py-3 rounded-md font-bold shadow hover:bg-yellow-500 transition text-center"
          >
            Proceed to Checkout
          </Link>
        </div>

        <p className="mt-6 text-xs text-center text-gray-500">
          GST is calculated on the discounted amount. Thank you for dining!
        </p>
      </div>
    </section>
  );
}
