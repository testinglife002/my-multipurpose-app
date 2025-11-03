// ✅ src/utils/newRequest.js
// src/utils/newRequest.js
import axios from "axios";

const API_URL =
  import.meta.env.VITE_BACKEND_URL?.trim() ||
  "https://my-multipurpose-app.onrender.com/api";

const newRequest = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL || "https://my-multipurpose-app.onrender.com/api",
  withCredentials: true, // ✅ sends cookie automatically
});

// ✅ Load token from sessionStorage on init (in case of page refresh)
const token = sessionStorage.getItem("accessToken");
if (token) {
  newRequest.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

// ✅ Utility: set token after login
export const setToken = (token) => {
  if (token) {
    sessionStorage.setItem("accessToken", token);
    newRequest.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }
};

// ✅ Utility: clear token on logout
export const clearToken = () => {
  sessionStorage.removeItem("accessToken");
  delete newRequest.defaults.headers.common["Authorization"];
};

// ✅ Add Bearer token from localStorage (optional fallback)
newRequest.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const logoutRequest = async () => {
  try {
    await newRequest.post("/auth/logout");
  } catch (err) {
    console.error("Logout failed:", err);
  }
};


export default newRequest;

