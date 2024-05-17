import React, { useState, useRef, useEffect } from 'react';
import './App.css';
import ChatIcon from '@mui/icons-material/Chat'; // Import the ChatIcon
import SendIcon from '@mui/icons-material/Send';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import TypingIndicator from './TypingIndicator'; // Ensure you have the correct import for TypingIndicator

const PopupChat = ({ handleUserMessage, messages, isChatbotTyping }) => {
  const [isOpen, setIsOpen] = useState(false);
  const messagesEndRef = useRef(null);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div>
      <ChatIcon className="popup-chat-button" onClick={toggleChat} /> {/* Use ChatIcon here */}
      {isOpen && (
        <div className="chat-popup">
          <div className="form-container">
            <div className="chat-header">
              <div className="profile-icon"></div>
              <div className="profile-info">
                <div className="profile-name">Your name</div>
                <div className="profile-status">Status</div>
              </div>
              <div className="chat-settings">
                <KeyboardArrowDownIcon />
              </div>
            </div>
            <div className="message-list">
              {messages.map((msg, index) => (
                <div key={index} className={`message ${msg.sender}`}>
                  <div className="message-header">
                    <div className={`profile-icon ${msg.sender}`}></div>
                    <div className="message-text">{msg.message}</div>
                  </div>
                </div>
              ))}
              {isChatbotTyping && (
                <div className="typing-indicator-container">
                  <div className="loader-message-header">
                    <div className="profile-icon loader-profile-icon"></div>
                    <div className="loader-message-text">Chatbot is typing...</div>
                  </div>
                  <TypingIndicator />
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
            <div className="input-container">
              <input type="text" className="input-field" placeholder="input text" />
              <button type="submit" className="send-button" onClick={handleUserMessage}>
                <SendIcon />
              </button>
            </div>
            <button type="button" className="btn cancel" onClick={toggleChat}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PopupChat;
