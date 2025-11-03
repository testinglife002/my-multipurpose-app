// src/admin/components/AdminNavbar.jsx
// src/admin/components/AdminNavbar.jsx
import React from 'react';
import { FaBars, FaUserCircle, FaSignOutAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { logoutRequest } from '../../api/newRequest';
import './AdminNavbar.css';

const AdminNavbar = ({ toggleSidebar, user, setUser, isSidebarExpanded }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logoutRequest();
    localStorage.removeItem("currentUser");
    setUser(null);
    navigate("/");
    window.location.reload();
  };

  return (
    <div  >
      <nav className={`admin-navbar ${!isSidebarExpanded ? 'collapsed' : ''}`}>
      <div className="admin-navbar-left">
        <button className="admin-hamburger-btn" onClick={toggleSidebar}>
          <FaBars size={20} />
        </button>
        <span className="admin-navbar-brand">Gordius App</span>
      </div>

      <div className="admin-navbar-center">
        {/* Optional center links */}
      </div>

      <div className="admin-navbar-right">
        {user ? (
          <>
            <FaUserCircle size={20} className="admin-user-icon" />
            <span className="admin-user-name">{user.username || user.displayName}</span>
            <button className="admin-logout-btn" onClick={handleLogout}>
              <FaSignOutAlt size={16} /> Logout
            </button>
          </>
        ) : (
          <>
            <span className="admin-user-name">Guest</span>
            <button className="admin-login-btn" onClick={() => navigate('/login')}>
              Login
            </button>
          </>
        )}
      </div>
    </nav>
    </div>
  );
};

export default AdminNavbar;


