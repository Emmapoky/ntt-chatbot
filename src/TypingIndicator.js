import './TypingIndicator.css';
import React from 'react';

const TypingIndicator = ({ variant }) => {
  return (
    <div className={`typing-indicator-container ${variant}`}>
      <div className={`loader-message-header ${variant}`}>
        <div className={`loader-profile-icon ${variant}`}></div>
        {variant !== 'popup' && <div className="profile-name">Gemini</div>}
        {variant === 'popup' && <div className="loader popup"></div>}
      </div>
      {variant !== 'popup' && (
        <div className="loader-container">
          <div className="loader"></div>
        </div>
      )}
    </div>
  );
};

export default TypingIndicator;
