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

// email/password (unchanged)
export const register = async (name, email, password) => {
  const { data } = await api.post("/auth/register", { name, email, password });
  if (data.token) localStorage.setItem("token", data.token);
  return data;
};

export const login = async (email, password) => {
  const { data } = await api.post("/auth/login", { email, password });
  if (data.token) localStorage.setItem("token", data.token);
  return data;
};

export const logout = () => localStorage.removeItem("token");

// data
export const getProfile = async () => (await api.get("/users/profile")).data;
export const getOrders = async () => (await api.get("/orders")).data;

// Google popup login
export const googleLogin = async () => {
  const result = await signInWithPopup(auth, googleProvider);
  // Firebase ID token
  const idToken = await result.user.getIdToken(true);

  const { data } = await api.post("/firebase-auth/login", { token: idToken });

  // JWT for protected endpoints
  localStorage.setItem("token", data.token);

  return data.user;
};
