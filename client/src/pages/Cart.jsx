import { useCartStore } from "../store/cartStore";
import { Link } from "react-router-dom";

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, emptyCart } = useCartStore();

  // Calculate total
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

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
    <section className="py-16 bg-gray-100 min-h-screen flex justify-center">
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
              {/* Thumbnail + Info */}
              <div className="flex items-center gap-3">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-12 h-12 rounded-md object-cover shadow"
                />
                <div>
                  <h3 className="text-gray-800 font-semibold">{item.name}</h3>
                  <p className="text-xs text-gray-500">
                    ₹{item.price} × {item.quantity}
                  </p>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-2 mt-1">
                    <button
                      onClick={() =>
                        updateQuantity(
                          item.name,
                          Math.max(1, item.quantity - 1)
                        )
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
                  ₹{(item.price * item.quantity).toFixed(2)}
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

        {/* Total */}
        <div className="mt-6 border-t border-dashed border-gray-400 pt-4">
          <div className="flex justify-between text-lg font-bold text-gray-900">
            <span>Total</span>
            <span>₹{totalPrice.toFixed(2)}</span>
          </div>
        </div>

        <hr className="border-dashed border-gray-400 my-6" />

        {/* Actions */}
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

        {/* Footer note */}
        <p className="mt-6 text-xs text-center text-gray-500">
          Thank you for dining!
        </p>
      </div>
    </section>
  );
}
