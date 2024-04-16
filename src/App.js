import { GoogleGenerativeAI } from "@google/generative-ai";
import React, { useState, useRef, useEffect } from 'react';

import ChatContainer from './ChatContainer';
import MainContainer from './MainContainer';
import MessageInput from './MessageInput';
import MessageList from './MessageList';
import TypingIndicator from './TypingIndicator';

import './App.css';

const genAI = new GoogleGenerativeAI(process.env.REACT_APP_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

function App() {
  const [isChatbotTyping, setIsChatbotTyping] = useState(false);
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);  // Reference to the end of the message list

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();  // Scroll to bottom whenever messages update
  }, [messages]);

  const handleUserMessage = async (userMessage) => {
    // Add the user's message to the messages array
    setMessages(currentMessages => [
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
      <MainContainer>
        <ChatContainer>
          <MessageList messages={messages} />
          {isChatbotTyping && <TypingIndicator />}
          <div ref={messagesEndRef} />  {/* Empty div for auto-scrolling */}
          <div className="custom-message-input-container">
            <MessageInput onSend={handleUserMessage} />
          </div>
        </ChatContainer>
      </MainContainer>
    </div>
  );
}

export default App;