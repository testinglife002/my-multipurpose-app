// ✅ src/utils/newRequest.js
// src/utils/newRequest.js
// src/api/newRequest.js
// client/src/api/newRequest.js
// src/api/newRequest.js
import axios from "axios";

const API_URL =
  import.meta.env.VITE_BACKEND_URL || "http://localhost:5000/api";

const newRequest = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

/* =====================================================
   ALWAYS attach latest token before each request
===================================================== */
newRequest.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

/* =====================================================
   Token helpers
===================================================== */
export const setToken = (token) => {
  if (token) {
    localStorage.setItem("token", token);
  }
};

export const clearToken = () => {
  localStorage.removeItem("token");
};

/* =====================================================
   Logout
===================================================== */
export const logoutRequest = async () => {
  try {
    await newRequest.post("/auth/logout");
    clearToken();
  } catch (err) {
    console.error("Logout failed:", err);
  }
};

export default newRequest;




