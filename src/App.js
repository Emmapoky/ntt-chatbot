import React, { useState, useRef, useEffect } from 'react';

import ChatContainer from './ChatContainer';
import MainContainer from './MainContainer';
import MessageInput from './MessageInput';
import MessageList from './MessageList';
import TypingIndicator from './TypingIndicator';

import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import Drawer from '@mui/material/Drawer';

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

import './App.css';

const OPENAI_API_KEY = "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";

function App() {
  const [isChatbotTyping, setIsChatbotTyping] = useState(false);
  const [messages, setMessages] = useState([]);
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
    const newUserMessage = {
        id: messages.length,
        sender: 'user',
        message: userMessage
    };
    setMessages([...messages, newUserMessage]);
  
    setIsChatbotTyping(true);
    try {
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
          method: "POST",
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${OPENAI_API_KEY}`
          },
          body: JSON.stringify({
              model: "gpt-3.5-turbo",
              messages: [{role: 'user', content: userMessage}]
          })
        });
  
        if (!response.ok) {
          if (response.status === 429) {
              console.error("Rate limit exceeded.");
              // Implement retry logic or alert user to wait
          } else {
              const errorData = await response.json();
              throw new Error(`API responded with status ${response.status}: ${errorData.error.message}`);
          }
        }
  
        const data = await response.json();
  
        if (data.choices && data.choices.length > 0 && data.choices[0].message) {
            const newMessage = {
                id: messages.length + 1,
                sender: 'ChatGPT',
                message: data.choices[0].message.content
            };
            setMessages(messages => [...messages, newMessage]);
        } else {
            throw new Error("Invalid response structure");
        }
    } catch (error) {
        console.error("Error with OpenAI API:", error);
        setMessages(messages => [...messages, {id: messages.length, sender: 'ChatGPT', message: "An error occurred, please try again."}]);
    } finally {
        setIsChatbotTyping(false);
    }
  };

  return (
    <div className="app-container">
      {/* Sidebar button */}
      <IconButton className="sidebar-toggle-button" onClick={toggleSidebar} aria-label="open sidebar">
        <KeyboardArrowRightIcon />
      </IconButton>
      {/* Sidebar Drawer */}
      <Drawer
        anchor="left"
        open={sidebarOpen}
        onClose={toggleSidebar}
        classes={{ paper: "drawer-paper" }}
      >
        <div className="profile-icon-container">
          <div className="profile-icon-margin">
            <div className="profile-icon"></div>
          </div>
          <strong>ChatGPT</strong>
        </div>
        <p>History or other controls</p>
      </Drawer>

      <div className="header">
        <IconButton
          aria-label="more"
          aria-controls="long-menu"
          aria-haspopup="true"
          onClick={handleMenuOpen}
        >
          ChatGPT
          <KeyboardArrowDownIcon />
        </IconButton>
        <Menu
          id="long-menu"
          anchorEl={anchorEl}
          keepMounted
          open={isMenuOpen}
          onClose={handleMenuClose}
          classes={{ paper: "header-menu" }}
        >
          <MenuItem onClick={handleMenuClose} className="menu-item-white">
            Gemini
          </MenuItem>
          <MenuItem onClick={handleMenuClose} className="menu-item-white">
            <span className="gemini-advanced-text">Gemini Advanced</span>
            <button className="upgrade-button">Upgrade</button>
          </MenuItem>
        </Menu>
      </div>

      <MainContainer>
        <ChatContainer>
          <MessageList messages={messages} />
          {isChatbotTyping && <TypingIndicator />}
          <div ref={messagesEndRef} />
          <div className="custom-message-input-container">
            <MessageInput onSend={handleUserMessage} />
          </div>
        </ChatContainer>
      </MainContainer>
    </div>
  );
}

export default App;
