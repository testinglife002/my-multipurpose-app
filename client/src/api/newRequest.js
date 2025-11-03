// ✅ src/utils/newRequest.js
// src/utils/newRequest.js
// src/api/newRequest.js
import axios from "axios";

const API_URL =
  import.meta.env.VITE_BACKEND_URL?.trim() ||
  "https://my-multipurpose-app.onrender.com/api";

const newRequest = axios.create({
  baseURL: API_URL,
  withCredentials: true, // sends cookies if needed
});

// ✅ Load token from localStorage on init
const token = localStorage.getItem("token");
if (token) {
  newRequest.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

// ✅ Utility: set token after login
export const setToken = (token) => {
  if (token) {
    localStorage.setItem("token", token);
    newRequest.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }
};

// ✅ Utility: clear token on logout
export const clearToken = () => {
  localStorage.removeItem("token");
  delete newRequest.defaults.headers.common["Authorization"];
};

// ✅ Logout request helper
export const logoutRequest = async () => {
  try {
    await newRequest.post("/auth/logout");
  } catch (err) {
    console.error("Logout failed:", err);
  }
};

export default newRequest;


