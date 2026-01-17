// // // 2️⃣ src/editor/components/✅ Navbar.jsx (React)
import { Menu } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Navbar({ user, onToggleSidebar }) {
  const navigate = useNavigate();

  return (
    <header className="navbar">
      <div className="navbar-left">
        <Menu className="icon" onClick={onToggleSidebar} />
        <span className="logo">Canva Clone</span>
      </div>

      <nav className="navbar-links">
        <span onClick={() => navigate("/")}>Home</span>
        <span>About</span>
        <span>Contact</span>

        {!user ? (
          <>
            <span onClick={() => navigate("/login")}>Login</span>
            <span onClick={() => navigate("/register")}>Register</span>
          </>
        ) : (
          <>
            <span className="user-name">{user.name}</span>
            <span
              className="logout"
              onClick={() => {
                localStorage.removeItem("currentUser");
                navigate("/login");
              }}
            >
              Logout
            </span>
          </>
        )}
      </nav>
    </header>
  );
}
