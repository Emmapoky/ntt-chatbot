import React, { useRef, useEffect } from 'react';
import sendIcon from './img/SendIcon.svg';

const MessageInput = ({ onSend }) => {
  const inputRef = useRef(null);

  const handleSend = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      const text = inputRef.current.textContent.trim();
      if (text) {
        onSend(text);
        inputRef.current.textContent = ''; // Clear the input field
      }
      adjustHeight(); // Reset height after sending
    }
  };

  const adjustHeight = () => {
    const textarea = inputRef.current;
    if (!textarea) return;
    textarea.style.height = 'auto'; // Reset the height
    const computed = window.getComputedStyle(textarea);
    const minHeight = parseInt(computed.getPropertyValue('min-height'), 1);
    const height = Math.max(textarea.scrollHeight, minHeight);
    textarea.style.height = `${height}px`; // Set to scrollHeight or minHeight
  };

  useEffect(() => {
    adjustHeight(true); // Adjust height initially and on window resize
    window.addEventListener('resize', () => adjustHeight(true));
    return () => {
      window.removeEventListener('resize', () => adjustHeight(true));
    };
  }, []);

  return (
    <div className="message-input-container">
      <textarea
        ref={inputRef}
        className="input-field"
        placeholder="Type your message here..."
        onInput={() => adjustHeight()} // Adjust height when input changes
        onKeyPress={handleSend}
      />
      <button className="send-button" onClick={handleSend}>
        <img src={sendIcon} alt="Send" />
      </button>
    </div>
  );
};

export default MessageInput;