import React from 'react';
import './Sidebar.css';

function Sidebar({ onNewChat, onClearConversations, onToggleTheme }) {
  // Dummy chat history data - replace with actual data from state or props
  const chatHistory = [
    { id: 1, title: 'AI Chat Tool Ethics' },
    { id: 2, title: 'AI Chat Tool Impact Writing' },
    { id: 3, title: 'New chat' }
  ];

  return (
    <aside className="sidebar">
      <button onClick={onNewChat} className="sidebar-btn new-chat-btn">+ New Chat</button>
      <div className="chat-history">
        {chatHistory.map(chat => (
          <div key={chat.id} className="chat-item">
            {chat.title}
            {/* Implement onClearChat to remove individual chat history */}
          </div>
        ))}
      </div>
      <div className="sidebar-actions">
        <button onClick={onClearConversations} className="sidebar-btn">Clear conversations</button>
        <button onClick={onToggleTheme} className="sidebar-btn">Light mode</button>
        <button className="sidebar-btn">My account</button>
        <button className="sidebar-btn">Updates & FAQ</button>
        <button className="sidebar-btn">Log out</button>
      </div>
    </aside>
  );
}

export default Sidebar;
