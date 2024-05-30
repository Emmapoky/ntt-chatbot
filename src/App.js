// changes on API
import { GoogleGenerativeAI } from "@google/generative-ai";
import React, { useEffect, useRef, useState } from 'react';
import './App.css';
import './Startup.css';
import './TypingIndicator.css';

import PopupChat from './PopupChat';
import ChatContainer from './ChatContainer';
import MainContainer from './MainContainer';
import MessageInput from './MessageInput';
import MessageList from './MessageList';
import TypingIndicator from './TypingIndicator';

import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import Drawer from '@mui/material/Drawer';
import StarterChatIcon from '@mui/icons-material/LensBlur';

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

const genAI = new GoogleGenerativeAI(process.env.REACT_APP_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

function App() {
  const [isChatbotTyping, setIsChatbotTyping] = useState(false);
  const [messages, setMessages] = useState([]);
  const [hasUserSentMessage, setHasUserSentMessage] = useState(false); // Track if user has sent a message
  const messagesEndRef = useRef(null);  // Reference to the end of the message list

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [anchorEl, setAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  }; 

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();  // Scroll to bottom whenever messages update
  }, [messages]);

  const handleUserMessage = async (userMessage) => {

    setHasUserSentMessage(true); // Set state to true when user sends a message

    setMessages(currentMessages => [ // Add the user's message to the messages array
      ...currentMessages,
      { id: currentMessages.length, sender: 'user', message: userMessage }
    ]);
  
    // Activate the typing indicator
    setIsChatbotTyping(true);
  
    try {
      const prompt = userMessage;
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = await response.text(); 
  
      const newMessage = { id: messages.length + 1, sender: 'Gemini', message: text };
      
      // Update the messages array with the AI's response
      setMessages(currentMessages => [
        ...currentMessages,
        newMessage
      ]);

    } catch (error) {
      console.error("Error processing user message with Gemini API:", error);
      setMessages(currentMessages => [
        ...currentMessages,
        { id: currentMessages.length, sender: 'Gemini', message: "An error occurred, please try again." }
      ]);
    } finally {
      setIsChatbotTyping(false);
    }
  };
  
  return (
    <div className="app-container">
      <PopupChat 
        handleUserMessage={handleUserMessage} 
        messages={messages} 
        isChatbotTyping={isChatbotTyping}
      />
      {/* Sidebar button */}
      <IconButton className="sidebar-toggle-button" onClick={toggleSidebar} aria-label="open sidebar">
          <KeyboardArrowRightIcon/> 
      </IconButton>
      {/* Sidebar Drawer */}
      <Drawer
        anchor="left"
        open={sidebarOpen}
        onClose={toggleSidebar}
        className="drawer-paper"
      >
        <div className="drawer-content">
          <div className="profile-icon-container">
            <div className="profile-icon"></div>
            <div className="profile-name">Chatbot</div>
            {isChatbotTyping && (
              <div className="typing-indicator-container">
                <div className="message-header">
                  <div className="profile-icon message-gemini"></div>
                  <div className="profile-name">Chatbot</div>
                </div>
                <TypingIndicator variant="main"  />
              </div>
            )}
          </div>
          <p>History or other controls</p>
        </div>
      </Drawer>
  
      <div className="header">
        <IconButton
          aria-label="more"
          aria-controls="long-menu"
          aria-haspopup="true"
          disableRipple
          onClick={handleMenuOpen}
          className={isMenuOpen ? 'header-button-active' : ''}
        >
          Gemini
          <KeyboardArrowDownIcon />
        </IconButton>
        <Menu
          id="long-menu"
          anchorEl={anchorEl}
          keepMounted
          open={isMenuOpen}
          onClose={handleMenuClose}
          className="menu-paper"
          MenuListProps={{ className: 'menu-list' }} >
          <MenuItem onClick={handleMenuClose}>
            Gemini
          </MenuItem>
          <MenuItem onClick={handleMenuClose}>
            <span className="gemini-advanced-text">Gemini Advanced</span>
            <button className="upgrade-button">Upgrade</button>
          </MenuItem>
        </Menu>
      </div>
  
      <div className="disclaimer">
        Chatbot may display inaccurate info.  
        <span className="privacy-link">Your privacy & Chatbot Apps</span>
      </div>

      {!hasUserSentMessage && (
        <div className="starter-page">
          <div className="starter-content">
            <div className="starter-icon"> 
              <StarterChatIcon className="starter-chat-icon" />
            </div>
              <h1>How can I help you today?</h1>
                <div className="starter-buttons">
                  <button className="starter-button">
                    <span className="bold">Help me pick</span>an outfit that would look good on camera
                  </button>
                  <button className="starter-button">
                    <span className="bold">Write an email</span>requesting a deadline extension for my project
                  </button>
                  <button className="starter-button">
                    <span className="bold">Suggest fun activities</span>to help me make new friends in a city
                  </button>
                  <button className="starter-button">
                    <span className="bold">Write a thank-you note</span>to out babysitter for last minute help
                  </button>
                </div>
              </div>
              <div className="custom-message-input-container">
                <MessageInput onSend={handleUserMessage} />
              </div>
            </div>
          )}

      {hasUserSentMessage && (
        <MainContainer>
        <ChatContainer>
          <MessageList messages={messages} />
          {isChatbotTyping && (
            <div className="typing-indicator-container main">
              <div className="loader-message-header main">
              </div>
              <TypingIndicator variant="main" />
            </div>
          )}
          <div ref={messagesEndRef} />
          <div className="custom-message-input-container">
            <MessageInput onSend={handleUserMessage} />
          </div>
        </ChatContainer>
      </MainContainer>
    )}
  </div>
);  
}

export default App;
