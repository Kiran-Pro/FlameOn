import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAlert(null);
    setLoading(true);
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API}/auth/forgot-password`,
        { email }
      );
      setAlert({ type: "success", text: data.message });
      setSent(true);
    } catch (err) {
      setAlert({
        type: "error",
        text: err.response?.data?.message || "Error sending reset email",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black px-4">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl p-6 sm:p-8 mt-16">
        <h1 className="text-2xl font-bold text-center text-white">
          Forgot Password
        </h1>
        <p className="text-center text-gray-300 mt-2 text-sm">
          Enter your email to receive a reset link
        </p>

        {/* Alert */}
        {alert && (
          <div
            className={`mt-4 text-center text-sm px-3 py-2 rounded-lg ${
              alert.type === "success"
                ? "bg-green-500/10 text-green-300 border border-green-400/30"
                : "bg-red-500/10 text-red-300 border border-red-400/30"
            }`}
          >
            {alert.text}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={sent}
            required
            className="w-full bg-white/20 border border-white/30 rounded-lg px-4 py-3 text-white placeholder-gray-300 focus:ring-2 focus:ring-yellow-400 outline-none"
          />

          <button
            type="submit"
            disabled={loading || sent}
            className={`w-full py-3 rounded-lg font-semibold shadow-lg transition ${
              loading || sent
                ? "bg-gray-500 text-gray-200 cursor-not-allowed"
                : "bg-yellow-400 text-gray-900 hover:bg-yellow-300"
            }`}
          >
            {loading ? "Sending..." : sent ? "Link Sent" : "Send Reset Link"}
          </button>
        </form>

        {/* Back to Login */}
        <div className="mt-6 text-center">
          <Link to="/login" className="text-yellow-400 hover:underline">
            Back to Login
          </Link>
        </div>
      </div>
    </section>
  );
}
