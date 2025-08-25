import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiUser, FiMail } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { register, googleLogin } from "../services/authService.js";
import Input from "../components/Input/Input.jsx";
import PasswordInput from "../components/Input/PasswordInput.jsx";

export default function Register() {
  const navigate = useNavigate();
  const [alert, setAlert] = useState(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });

  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loadingEmail, setLoadingEmail] = useState(false);
  const [loadingGoogle, setLoadingGoogle] = useState(false);

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const emailOk = /^\S+@\S+\.\S+$/.test(form.email);
  const confirmOk = form.password && form.password === form.confirm;
  const canSubmit =
    form.name.trim() && emailOk && form.password.length >= 6 && confirmOk;

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!canSubmit)
      return setAlert({ type: "error", text: "Fill the form correctly." });

    setLoadingEmail(true);
    try {
      await register(form.name.trim(), form.email.trim(), form.password);
      setAlert({
        type: "success",
        text: "OTP sent to your email. Verify to activate account.",
      });

      setTimeout(() => {
        navigate("/verify-otp", { state: { email: form.email.trim() } });
      }, 800);
    } catch (err) {
      setAlert({
        type: "error",
        text: err.response?.data?.message || "Registration failed. Try again.",
      });
    } finally {
      setLoadingEmail(false);
    }
  };

  const handleGoogle = async () => {
    setLoadingGoogle(true);
    setAlert(null);
    try {
      await googleLogin();
      setAlert({
        type: "success",
        text: "Signed in with Google! Redirecting...",
      });
      setTimeout(() => navigate("/profile"), 800);
    } catch (error) {
      setAlert({ type: "error", text: "Google sign-in failed. Try again." });
      console.log(error);
    } finally {
      setLoadingGoogle(false);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black px-4 sm:px-6">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl p-5 sm:p-8 mt-16">
        {/* Header */}
        <h1 className="text-2xl sm:text-3xl font-bold text-center text-white">
          Create <span className="text-yellow-400">Account</span>
        </h1>
        <p className="text-center text-gray-300 mt-2 text-sm sm:text-base">
          Join FlameOn in seconds
        </p>

        {/* Form */}
        <form onSubmit={handleRegister} className="mt-6 space-y-4">
          <Input
            icon={FiUser}
            type="text"
            name="name"
            placeholder="Full name"
            value={form.name}
            onChange={handleChange}
            required
          />
          <Input
            icon={FiMail}
            type="email"
            name="email"
            placeholder="Email address"
            value={form.email}
            onChange={handleChange}
            required
          />
          <PasswordInput
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Password (min 6 chars)"
            show={showPass}
            setShow={setShowPass}
          />
          <PasswordInput
            name="confirm"
            value={form.confirm}
            onChange={handleChange}
            placeholder="Confirm password"
            show={showConfirm}
            setShow={setShowConfirm}
          />
          {!confirmOk && form.confirm && (
            <p className="text-xs sm:text-sm text-red-400">
              Passwords do not match.
            </p>
          )}

          <button
            type="submit"
            disabled={!canSubmit || loadingEmail}
            className={`w-full font-semibold py-3 sm:py-3.5 rounded-lg shadow-lg transition text-sm sm:text-base ${
              !canSubmit || loadingEmail
                ? "bg-gray-500 text-gray-200 cursor-not-allowed"
                : "bg-yellow-400 text-gray-900 hover:bg-yellow-300"
            }`}
          >
            {loadingEmail ? "Creating account..." : "Create Account"}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-grow border-t border-white/20" />
          <span className="px-3 text-gray-300 text-xs sm:text-sm">OR</span>
          <div className="flex-grow border-t border-white/20" />
        </div>

        {/* Google button */}
        <button
          onClick={handleGoogle}
          disabled={loadingGoogle}
          className={`w-full flex items-center justify-center gap-3 bg-white text-gray-900 py-3 sm:py-3.5 rounded-lg border border-gray-200 shadow hover:bg-gray-50 transition text-sm sm:text-base ${
            loadingGoogle ? "opacity-70 cursor-not-allowed" : ""
          }`}
        >
          <FcGoogle size={22} />
          {loadingGoogle ? "Connecting..." : "Continue with Google"}
        </button>

        {/* Alerts */}
        {alert && (
          <p
            className={`mt-4 text-center text-sm sm:text-base ${
              alert.type === "success" ? "text-green-400" : "text-red-400"
            }`}
          >
            {alert.text}
          </p>
        )}

        {/* Footer link */}
        <p className="mt-6 text-center text-gray-300 text-sm sm:text-base">
          Already have an account?{" "}
          <Link to="/login" className="text-yellow-400 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </section>
  );
}
