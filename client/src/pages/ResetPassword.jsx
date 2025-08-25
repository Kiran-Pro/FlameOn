import { useState } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirm) {
      return setAlert({ type: "error", text: "Passwords do not match" });
    }
    setLoading(true);
    setAlert(null);

    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API}/auth/reset-password`,
        { token, password }
      );
      setAlert({ type: "success", text: data.message });

      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setAlert({
        type: "error",
        text: err.response?.data?.message || "Error resetting password",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black px-4 sm:px-6">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl p-6 sm:p-8 mt-16">
        {/* Heading */}
        <h1 className="text-2xl sm:text-3xl font-bold text-center text-white">
          Reset <span className="text-yellow-400">Password</span>
        </h1>
        <p className="text-center text-gray-300 mt-2 text-sm sm:text-base">
          Enter your new password below
        </p>

        {/* Alert */}
        {alert && (
          <div
            className={`mt-4 text-center text-sm sm:text-base px-3 py-2 rounded-lg ${
              alert.type === "success"
                ? "bg-green-500/10 text-green-300 border border-green-400/30"
                : "bg-red-500/10 text-red-300 border border-red-400/30"
            }`}
          >
            {alert.text}
            {alert.type === "error" && (
              <div className="mt-3 flex flex-col sm:flex-row justify-center gap-3">
                <Link
                  to="/forgot-password"
                  className="text-yellow-400 hover:underline"
                >
                  Request new link
                </Link>
                <Link to="/login" className="text-yellow-400 hover:underline">
                  Back to Login
                </Link>
              </div>
            )}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <input
            type="password"
            placeholder="New password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full bg-white/20 border border-white/30 rounded-lg px-4 py-2.5 sm:py-3 
                       text-sm sm:text-base text-white placeholder-gray-300 focus:ring-2 focus:ring-yellow-400 outline-none"
          />

          <input
            type="password"
            placeholder="Confirm password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            required
            className="w-full bg-white/20 border border-white/30 rounded-lg px-4 py-2.5 sm:py-3 
                       text-sm sm:text-base text-white placeholder-gray-300 focus:ring-2 focus:ring-yellow-400 outline-none"
          />

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2.5 sm:py-3 rounded-lg font-semibold shadow-lg transition text-sm sm:text-base ${
              loading
                ? "bg-gray-500 text-gray-200 cursor-not-allowed"
                : "bg-yellow-400 text-gray-900 hover:bg-yellow-300"
            }`}
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>

        {/* Back */}
        <p className="mt-6 text-center text-gray-300 text-sm sm:text-base">
          Remembered your password?{" "}
          <Link to="/login" className="text-yellow-400 hover:underline">
            Back to Login
          </Link>
        </p>
      </div>
    </section>
  );
}
