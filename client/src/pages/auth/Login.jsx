// frontend/src/pages/auth/Login.jsx
// frontend/src/pages/auth/Login.jsx
// src/pages/auth/Login.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import newRequest, { setToken } from "../../api/newRequest";

const Login = ({ setUser }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Email and password are required");
      return;
    }

    setLoading(true);
    try {
      const res = await newRequest.post("/auth/login", { email, password });

      // ✅ Extract user and token from response
      const { user, token } = res.data;

      // ✅ Save token for API calls
      setToken(token);

      // ✅ Save user & token to localStorage
      localStorage.setItem("currentUser", JSON.stringify(user));
      localStorage.setItem("token", token);

      // ✅ Update state
      setUser(user);

      toast.success(`Welcome back, ${user.username}!`);
      navigate("/dashboard"); // Redirect to dashboard after login
    } catch (err) {
      console.error("Login error:", err);
      toast.error(err?.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className="auth-form">
        <label>
          Email
          <input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>

        <label>
          Password
          <input
            type="password"
            placeholder="********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>

        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;

