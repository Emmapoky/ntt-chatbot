import { ChatContainer, MainContainer, Message, MessageInput, MessageList, TypingIndicator } from '@chatscope/chat-ui-kit-react'; // Assuming MessageInput is part of your chat UI kit
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import { GoogleGenerativeAI } from "@google/generative-ai";
import React, { useState } from 'react';
import './App.css';

const genAI = new GoogleGenerativeAI(process.env.REACT_APP_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

function App() {
  // State to manage the typing indicator of the chatbot
  const [isChatbotTyping, setIsChatbotTyping] = useState(false);
 
  // State to store chat messages
  const [messages, setMessages] = useState([]);

  const handleUserMessage = async (userMessage) => {
    setMessages(currentMessages => [...currentMessages, { id: currentMessages.length, sender: 'user', message: userMessage }]);
    // Activate the typing indicator
    setIsChatbotTyping(true);
    try {
      const prompt = userMessage;
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      const newMessage = { id: messages.length + 1, sender: 'Gemini', message: text };

      // Add the AI's response to the chat
      setMessages(currentMessages => [...currentMessages, newMessage]);
    } catch (error) {
      console.error("Error processing user message with Gemini API:", error);
    } finally {
      // Deactivate the typing indicator 
      setIsChatbotTyping(false);
    }
  };

  return (
    <>
      {/* A container for the chat window */}
      <div style={{ position: "relative", height: "100vh" }}>
        <MainContainer>
          <ChatContainer>
            {/* Display chat messages and typing indicator */}
            <MessageList
              typingIndicator={
                isChatbotTyping ? (
                  <TypingIndicator content="Gemini is thinking" />
                ) : null
              }
            >
              {/* Map through chat messages and render each message */}
              {messages.map((message, i) => {
                return (
                  <Message
                    key={i}
                    model={message}
                    style={
                      message.sender === "Gemini" ? { textAlign: "left" } : {}
                    }
                  />
                );
              })}
            </MessageList>
            {/* Input field for the user to type messages */}
            <MessageInput
              placeholder="Type Message here"
              onSend={handleUserMessage}
            />
          </ChatContainer>
        </MainContainer>
      </div>
    </>
  );
 }
 
 export default App;