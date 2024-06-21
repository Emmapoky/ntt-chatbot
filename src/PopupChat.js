import React, { useEffect, useRef, useState } from 'react';
import { marked } from 'marked';
import SendIcon from '@mui/icons-material/ArrowCircleRightRounded';
import ChatIcon from '@mui/icons-material/Chat'; // Import the ChatIcon
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import './PopupChat.css';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import TypingIndicator from './TypingIndicator'; // Ensure you have the correct import for TypingIndicator

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

  const getFormattedText = (text) => {
    const rawMarkup = marked(text);
    return { __html: rawMarkup };
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
              <div>
                <TypingIndicator variant="popup" />
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          <Box component="form" className="popup-input-container" onSubmit={handleSendMessage} noValidate autoComplete="off">
              <TextField
                className="popup-input-field"
                multiline
                minRows={1}
                maxRows={4}
                value={inputValue}
                onChange={handleInputChange}
                placeholder="Message Gemini..."
                variant="outlined"
                fullWidth
                InputProps={{
                }}
              />
              <button type="submit" className="popup-send-button">
              <SendIcon />
            </button>
            </Box>
          </div>
        </div>
      )}
    </div>
  );
};

export default PopupChat;

