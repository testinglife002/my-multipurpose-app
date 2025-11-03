// ✅ src/utils/newRequest.js
// src/utils/newRequest.js
// src/api/newRequest.js
// client/src/api/newRequest.js
import axios from "axios";

const API_URL = import.meta.env.VITE_BACKEND_URL || "https://my-multipurpose-app.onrender.com/api";

const newRequest = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

const token = localStorage.getItem("token");
if (token) newRequest.defaults.headers.common["Authorization"] = `Bearer ${token}`;

export const setToken = (token) => {
  if (token) {
    localStorage.setItem("token", token);
    newRequest.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }
};

export const clearToken = () => {
  localStorage.removeItem("token");
  delete newRequest.defaults.headers.common["Authorization"];
};


// ✅ Logout API call
export const logoutRequest = async () => {
  try {
    await newRequest.post("/auth/logout");
    clearToken();
  } catch (err) {
    console.error("Logout failed:", err);
  }
};

export default newRequest;




