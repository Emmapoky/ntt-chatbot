import './App.css';
import React from 'react';

const TypingIndicator = () => {
  return (
    <div className="typing-indicator-container">
      <div className="loader-message-header">
        <div className="loader-profile-icon"></div>
        <div className="profile-name">Gemini</div>
      </div>
      <div className="loader-container">
        <div className="loader"></div>
      </div>
    </div>
  );
};

export default TypingIndicator;
