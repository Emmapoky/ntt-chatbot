import './App.css';
import SendIcon from '@mui/icons-material/ArrowCircleRightRounded';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import React, { useState } from 'react';

const MessageInput = ({ onSend }) => {
  const [inputValue, setInputValue] = useState('');

  const handleSend = (event) => {
    if (event) {
      if (event.type === 'keypress' && (event.key !== 'Enter' || event.shiftKey)) {
        return; // If it's a keypress but not 'Enter' or if 'Shift' is held, do nothing
      }
      event.preventDefault(); // Prevents the default form submission on Enter
    }
    const text = inputValue.trim();
    if (text) {
      onSend(text);
      setInputValue(''); // Clear the input field
    }
  };

  return (
    <Box component="form" className="message-input-container" noValidate autoComplete="off">
      <TextField
        className="input-field"
        multiline
        minRows={1}
        maxRows={10}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Message Gemini..."
        variant="outlined"
        onKeyPress={handleSend} // Handle Enter key
        fullWidth
      />
      <IconButton className="send-button" onClick={handleSend} aria-label="send">
        <SendIcon disableRipple />
      </IconButton>
    </Box>
  );
};

export default MessageInput;