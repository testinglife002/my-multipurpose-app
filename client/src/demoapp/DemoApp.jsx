// src/demoapp/DemoApp.jsx
import React, { useState, useCallback, useMemo } from 'react';
import './DemoApp.css';
import './global.css';
import './utilities.css';

import Sidebar from './components/Sidebar.jsx';
import KanbanBoard from './components/KanbanBoard.jsx';
import ChatPanel from './components/ChatPanel.jsx';
import CollaborativeCanvas from './components/CollaborativeCanvas.jsx';
import TopBar from './components/TopBar.jsx';
import Dashboard from './components/Dashboard.jsx';
import TeamView from './components/TeamView.jsx';
import NotificationsView from './components/NotificationsView.jsx';
import {
  initialBoards,
  initialUsers,
  mockMessages,
  initialNotifications
} from './constants.js';

const DemoApp = () => {
  const [activeView, setActiveView] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isChatOpen, setIsChatOpen] = useState(true);

  const [state, setState] = useState({
    boards: initialBoards,
    activeBoardId: initialBoards[0].id,
    messages: mockMessages,
    currentUser: initialUsers[0],
    users: initialUsers,
    notifications: initialNotifications,
    isDarkMode: false
  });

  const activeBoard = useMemo(
    () =>
      state.boards.find(b => b.id === state.activeBoardId) ||
      state.boards[0],
    [state.boards, state.activeBoardId]
  );

  const handleUpdateBoard = useCallback(updatedBoard => {
    setState(prev => ({
      ...prev,
      boards: prev.boards.map(b =>
        b.id === updatedBoard.id ? updatedBoard : b
      )
    }));
  }, []);

  const handleSendMessage = useCallback(
    text => {
      const newMessage = {
        id: Math.random().toString(36).slice(2),
        userId: state.currentUser.id,
        text,
        timestamp: Date.now()
      };

      setState(prev => ({
        ...prev,
        messages: [...prev.messages, newMessage]
      }));
    },
    [state.currentUser.id]
  );

  return (
    <div className={`app-root ${state.isDarkMode ? 'dark' : ''}`}>
      <Sidebar
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
        boards={state.boards}
        activeBoardId={state.activeBoardId}
        activeView={activeView}
        setActiveView={setActiveView}
        setActiveBoardId={id =>
          setState(p => ({ ...p, activeBoardId: id }))
        }
        isDarkMode={state.isDarkMode}
        notificationCount={
          state.notifications.filter(n => !n.read).length
        }
      />

      <div className="app-main">
        <TopBar
          activeBoard={activeBoard}
          activeView={activeView}
          setActiveView={setActiveView}
          toggleChat={() => setIsChatOpen(!isChatOpen)}
          toggleDarkMode={() =>
            setState(p => ({ ...p, isDarkMode: !p.isDarkMode }))
          }
          isDarkMode={state.isDarkMode}
        />

        <div className="content-row">
          <main className="content-main">
            {activeView === 'dashboard' && (
              <Dashboard
                state={state}
                onSelectBoard={id => {
                  setState(p => ({ ...p, activeBoardId: id }));
                  setActiveView('board');
                }}
              />
            )}
            {activeView === 'team' && (
              <TeamView users={state.users} isDarkMode={state.isDarkMode} />
            )}
            {activeView === 'notifications' && (
              <NotificationsView
                notifications={state.notifications}
                markAllRead={() =>
                  setState(p => ({
                    ...p,
                    notifications: p.notifications.map(n => ({
                      ...n,
                      read: true
                    }))
                  }))
                }
                isDarkMode={state.isDarkMode}
              />
            )}
            {activeView === 'board' && (
              <KanbanBoard
                board={activeBoard}
                users={state.users}
                onUpdateBoard={handleUpdateBoard}
                isDarkMode={state.isDarkMode}
              />
            )}
            {activeView === 'canvas' && (
              <CollaborativeCanvas isDarkMode={state.isDarkMode} />
            )}
          </main>

          {isChatOpen && (
            <ChatPanel
              messages={state.messages}
              users={state.users}
              currentUser={state.currentUser}
              onSendMessage={handleSendMessage}
              isDarkMode={state.isDarkMode}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default DemoApp;
