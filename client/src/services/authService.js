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

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem("token");
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
  if (data.token) localStorage.setItem("token", data.token);
  return data;
};

// RESEND OTP
export const resendOtp = async (email) => {
  const { data } = await api.post("/auth/resend-otp", { email });
  return data;
};

// LOGIN – only works for verified users
export const login = async (email, password) => {
  const { data } = await api.post("/auth/login", { email, password });
  if (data.token) localStorage.setItem("token", data.token);
  return data;
};

// LOGOUT
export const logout = () => localStorage.removeItem("token");

// DATA
export const getProfile = async () => (await api.get("/users/profile")).data;
export const getOrders = async () => (await api.get("/orders")).data;

// GOOGLE LOGIN
export const googleLogin = async () => {
  const result = await signInWithPopup(auth, googleProvider);
  const idToken = await result.user.getIdToken(true);

  const { data } = await api.post("/firebase-auth/login", { token: idToken });
  localStorage.setItem("token", data.token);

  return data.user;
};
