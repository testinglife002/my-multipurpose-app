// 3️⃣ Sidebar.jsx (converted – unchanged behavior)
import React from 'react';
import './Sidebar.css';

const Sidebar = ({
  isOpen,
  setIsOpen,
  boards,
  activeBoardId,
  activeView,
  setActiveView,
  setActiveBoardId,
  isDarkMode,
  notificationCount
}) => {
  return (
    <aside className={`sidebar ${isOpen ? 'open' : 'collapsed'} ${isDarkMode ? 'dark' : ''}`}>
      <div className="sidebar-header">
        <div className="logo">
          <span>S</span>
          {isOpen && <h1>SYNERGY</h1>}
        </div>
      </div>

      <nav className="sidebar-nav custom-scrollbar">
        <button
          className={activeView === 'dashboard' ? 'nav-item active' : 'nav-item'}
          onClick={() => setActiveView('dashboard')}
        >
          🏠 {isOpen && 'Dashboard'}
        </button>

        <button
          className={activeView === 'notifications' ? 'nav-item active' : 'nav-item'}
          onClick={() => setActiveView('notifications')}
        >
          🔔 {isOpen && 'Notifications'}
          {notificationCount > 0 && <span className="badge">{notificationCount}</span>}
        </button>

        <button
          className={activeView === 'team' ? 'nav-item active' : 'nav-item'}
          onClick={() => setActiveView('team')}
        >
          👥 {isOpen && 'Team'}
        </button>

        <div className="sidebar-section">
          {boards.map(board => (
            <button
              key={board.id}
              className={
                activeBoardId === board.id ? 'nav-item active' : 'nav-item'
              }
              onClick={() => {
                setActiveBoardId(board.id);
                setActiveView('board');
              }}
            >
              📋 {isOpen && board.title}
            </button>
          ))}
        </div>
      </nav>

      <button className="collapse-btn" onClick={() => setIsOpen(!isOpen)}>
        ◀
      </button>
    </aside>
  );
};

export default Sidebar;
