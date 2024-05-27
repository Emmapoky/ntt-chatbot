import React, { useEffect, useRef, useState } from 'react';
import { getFormattedText } from './Message';
import SendIcon from '@mui/icons-material/ArrowCircleRightRounded';
import ChatIcon from '@mui/icons-material/Chat'; // Import the ChatIcon
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import './PopupChat.css';
import TypingIndicator from './TypingIndicator'; 

const PopupChat = ({ handleUserMessage, messages, isChatbotTyping }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
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

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      handleUserMessage(inputValue);
      setInputValue('');
    }
  };

 return (
  <div>
    <div className="popup-chat-button-wrapper">
      <div className="popup-chat-button-background">
        <ChatIcon className="popup-chat-button" onClick={toggleChat} />
      </div>
    </div>
    {isOpen && (
      <div className="popup-chat-popup">
        <div className="popup-form-container">
          <div className="popup-chat-header">
            <div className="popup-profile-icon"></div>
            <div className="popup-profile-info">
              <div className="popup-profile-name">Your name</div>
              <div className="popup-profile-status">Status</div>
            </div>
            <div className="popup-chat-settings">
              <KeyboardArrowDownIcon />
            </div>
          </div>
          <div className="popup-message-list">
            {messages.map((msg, index) => (
              <div key={index} className={`popup-message ${msg.sender}`}>
                <div className="popup-message-header">
                  <div className={`popup-profile-icon ${msg.sender}`}></div>
                  <div
                    className="popup-message-text"
                    dangerouslySetInnerHTML={getFormattedText(msg.message)}
                  ></div>
                </div>
              </div>
            ))}
            {isChatbotTyping && (
              <div className="popup-typing-indicator-container">
                <div className="popup-loader-message-header">
                  <div className="popup-profile-icon popup-loader-profile-icon"></div>
                  <div className="popup-loader-message-text">Chatbot is typing...</div>
                </div>
                <TypingIndicator />
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          <form className="popup-input-container" onSubmit={handleSendMessage}>
            <input
              type="text"
              className="popup-input-field"
              placeholder="Message Gemini..."
              value={inputValue}
              onChange={handleInputChange}
            />
            <button type="submit" className="popup-send-button">
              <SendIcon />
            </button>
          </form>
        </div>
      </div>
    )}
  </div>
);
};

export default PopupChat;