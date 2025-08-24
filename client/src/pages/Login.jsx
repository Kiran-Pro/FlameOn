import { useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { login, googleLogin } from "../services/authService.js";
import Input from "../components/Input.jsx";

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPass, setShowPass] = useState(false);
  const [loadingEmail, setLoadingEmail] = useState(false);
  const [loadingGoogle, setLoadingGoogle] = useState(false);
  const [alert, setAlert] = useState(null);

  const emailValid = useMemo(
    () => /^\S+@\S+\.\S+$/.test(form.email.trim()),
    [form.email]
  );
  const canSubmit = emailValid && form.password.length >= 6;

  const showAlert = (type, text) => setAlert({ type, text });

  // Email/password
  const handleEmailLogin = async (e) => {
    e.preventDefault();
    if (!canSubmit) {
      showAlert("error", "Please enter a valid email and a 6+ char password.");
      return;
    }
    setLoadingEmail(true);
    setAlert(null);
    try {
      await login(form.email.trim(), form.password);
      showAlert("success", "Logged in successfully!");
      navigate("/profile", { replace: true });
    } catch {
      showAlert("error", "Login failed. Check your credentials.");
    } finally {
      setLoadingEmail(false);
    }
  };

  // Google popup
  const handleGoogle = async () => {
    setLoadingGoogle(true);
    setAlert(null);
    try {
      await googleLogin();
      showAlert("success", "Signed in with Google!");
      navigate("/profile", { replace: true });
    } catch (e) {
      let msg = "Google sign-in failed.";
      const code = e?.code || e?.message || "";
      if (code.includes("popup-closed-by-user"))
        msg = "Popup closed before sign-in was completed.";
      else if (code.includes("cancelled-popup-request"))
        msg = "Another sign-in is already in progress.";
      else if (code.includes("account-exists-with-different-credential"))
        msg =
          "Account exists with a different sign-in method. Try email/password.";
      else if (code.includes("popup-blocked"))
        msg = "Popup was blocked. Allow popups and try again.";
      showAlert("error", msg);
    } finally {
      setLoadingGoogle(false);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black px-4">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl p-6 sm:p-8">
        <h1 className="text-3xl font-bold text-center text-white">
          Welcome <span className="text-yellow-400">back</span>
        </h1>
        <p className="text-center text-gray-300 mt-2 text-sm">
          Sign in with your email
        </p>

        {/* Alert */}
        {alert && (
          <div
            className={`mt-4 mb-2 text-center text-sm px-3 py-2 rounded-lg ${
              alert.type === "success"
                ? "bg-green-500/10 text-green-300 border border-green-400/30"
                : "bg-red-500/10 text-red-300 border border-red-400/30"
            }`}
          >
            {alert.text}
          </div>
        )}

        {/* Email/Password */}
        <form onSubmit={handleEmailLogin} className="mt-4 space-y-4">
          <Input
            aria-label="Email address"
            icon={FiMail}
            type="email"
            name="email"
            placeholder="Email address"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />

          <div className="relative">
            <Input
              aria-label="Password"
              icon={FiLock}
              type={showPass ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
            />
            <button
              type="button"
              aria-label={showPass ? "Hide password" : "Show password"}
              className="absolute right-3 top-3.5 text-gray-300"
              onClick={() => setShowPass((s) => !s)}
            >
              {showPass ? <FiEyeOff /> : <FiEye />}
            </button>
          </div>
          <div className="text-right">
            <Link
              to="/forgot-password"
              className="text-sm text-yellow-400 hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={loadingEmail || !canSubmit}
            className={`w-full py-3 rounded-lg font-semibold shadow-lg transition ${
              loadingEmail || !canSubmit
                ? "bg-gray-500 text-gray-200 cursor-not-allowed"
                : "bg-yellow-400 text-gray-900 hover:bg-yellow-300"
            }`}
          >
            {loadingEmail ? "Signing in..." : "Login"}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-grow border-t border-white/20" />
          <span className="px-3 text-gray-300 text-sm">OR</span>
          <div className="flex-grow border-t border-white/20" />
        </div>

        {/* Google */}
        <button
          onClick={handleGoogle}
          disabled={loadingGoogle}
          className={`w-full flex items-center justify-center gap-3 bg-white text-gray-900 py-3 rounded-lg border border-gray-200 shadow hover:bg-gray-50 transition ${
            loadingGoogle ? "opacity-70 cursor-not-allowed" : ""
          }`}
        >
          <FcGoogle size={22} />
          {loadingGoogle ? "Connecting..." : "Continue with Google"}
        </button>

        <p className="mt-6 text-center text-gray-300 text-sm">
          Don’t have an account?{" "}
          <Link to="/register" className="text-yellow-400 hover:underline">
            Create Account
          </Link>
        </p>
      </div>
    </section>
  );
}
