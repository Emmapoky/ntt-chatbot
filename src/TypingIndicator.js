import './TypingIndicator.css';
import React from 'react';

const TypingIndicator = ({ variant }) => {
  return (
    <div className={`typing-indicator-container ${variant}`}>
      <div className="loader-message-header">
        <div className={`loader-profile-icon ${variant}`}></div>
        <div className="profile-name">Gemini</div>
      </div>
      <div className="loader-container">
        <div className="loader"></div>
      </div>
    </div>
  );
};

export default TypingIndicator;
