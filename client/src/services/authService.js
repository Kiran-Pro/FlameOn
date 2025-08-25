import axios from "axios";
import {
  auth,
  googleProvider,
  signInWithPopup,
} from "../services/firebase/firebase.js";

const API = import.meta.env.VITE_API;
const api = axios.create({ baseURL: API });

// attach token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// clear storage on 401 and go to /login (prevents stale user-only state)
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      if (
        typeof window !== "undefined" &&
        window.location.pathname !== "/login"
      ) {
        window.location.replace("/login");
      }
    }
    return Promise.reject(err);
  }
);

// REGISTER – sends OTP, no token yet
export const register = async (name, email, password) => {
  const { data } = await api.post("/auth/register", { name, email, password });
  return data; // { message: "OTP sent..." }
};

// VERIFY OTP – backend activates account & returns JWT
export const verifyOtp = async (email, otp) => {
  const { data } = await api.post("/auth/verify-otp", { email, otp });
  if (data.token) {
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
  }
  return data;
};

// RESEND OTP
export const resendOtp = async (email) => {
  const { data } = await api.post("/auth/resend-otp", { email });
  return data;
};

// LOGIN – only for verified users
export const login = async (email, password) => {
  const { data } = await api.post("/auth/login", { email, password });
  if (data.token) {
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
  }
  return data;
};

// LOGOUT
export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

// DATA
export const getProfile = async () => (await api.get("/users/profile")).data;
export const getOrders = async () => (await api.get("/orders")).data;

// GOOGLE LOGIN
export const googleLogin = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const idToken = await result.user.getIdToken(true);

    const { data } = await api.post("/firebase-auth/login", { token: idToken });
    if (data.token) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
    }
    return data.user;
  } catch (err) {
    console.error("Google login error:", err);
    throw err;
  }
};

export default api;
