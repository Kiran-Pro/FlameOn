import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { verifyOtp, resendOtp } from "../services/authService.js";

export default function VerifyOtp() {
  const navigate = useNavigate();
  const location = useLocation();
  const emailFromState = location.state?.email || "";
  const [email] = useState(emailFromState);
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);

  const handleVerify = async (e) => {
    e.preventDefault();
    setLoading(true);
    setAlert(null);
    try {
      const { message } = await verifyOtp(email, otp);
      setAlert({ type: "success", text: message || "Verified successfully!" });
      setTimeout(() => navigate("/profile"), 1500);
    } catch (err) {
      setAlert({
        type: "error",
        text: err.response?.data?.message || "Verification failed",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setLoading(true);
    setAlert(null);
    try {
      const { message } = await resendOtp(email);
      setAlert({ type: "success", text: message || "OTP resent successfully" });
    } catch (err) {
      setAlert({
        type: "error",
        text: err.response?.data?.message || "Failed to resend OTP",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black px-4">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl p-6 sm:p-8 mt-16">
        <h1 className="text-2xl sm:text-3xl font-bold text-center text-white">
          Verify Your Account
        </h1>
        <p className="text-center text-gray-300 mt-2 text-sm sm:text-base">
          Enter the OTP sent to <span className="text-yellow-400">{email}</span>
        </p>

        {/* Alert */}
        {alert && (
          <div
            className={`mt-4 text-center text-sm px-3 py-2 rounded-lg animate-fade-in ${
              alert.type === "success"
                ? "bg-green-500/10 text-green-300 border border-green-400/30"
                : "bg-red-500/10 text-red-300 border border-red-400/30"
            }`}
          >
            {alert.text}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleVerify} className="mt-6 space-y-4">
          {/* OTP Input */}
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
            placeholder="Enter 6-digit OTP"
            required
            maxLength={6}
            className="w-full bg-white/20 border border-white/30 rounded-lg px-4 py-3 
              text-white placeholder-gray-300 focus:ring-2 focus:ring-yellow-400 outline-none 
              tracking-widest text-center text-lg sm:text-xl"
          />

          <button
            type="submit"
            disabled={loading || otp.length < 6}
            className={`w-full py-3 rounded-lg font-semibold shadow-lg transition ${
              loading || otp.length < 6
                ? "bg-gray-500 text-gray-200 cursor-not-allowed"
                : "bg-yellow-400 text-gray-900 hover:bg-yellow-300"
            }`}
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </button>
        </form>

        {/* Actions */}
        <div className="flex items-center justify-between mt-6">
          <button
            onClick={handleResend}
            disabled={loading}
            className="text-yellow-400 text-sm hover:underline"
          >
            Resend OTP
          </button>
          <button
            onClick={() => navigate("/login")}
            className="text-gray-300 text-sm hover:underline"
          >
            Back to Login
          </button>
        </div>
      </div>
    </section>
  );
}
