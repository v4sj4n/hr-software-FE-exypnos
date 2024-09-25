import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';

interface MessageInputProps {
  onSendMessage: (message: string) => void;
}

const MessageInput: React.FC<MessageInputProps> = ({ onSendMessage }) => {
  const [message, setMessage] = useState<string>('');

  const handleSend = () => {
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  };

  return (
    <div style={{ padding: '10px', display: 'flex' }}>
      <TextField
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        fullWidth
        placeholder="Type a message..."
      />
      <Button onClick={handleSend} variant="contained" color="primary">
        Send
      </Button>
    </div>
  );
};

export default MessageInput;
