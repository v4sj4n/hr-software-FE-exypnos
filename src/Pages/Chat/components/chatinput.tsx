import { useState } from 'react';
import { useChat } from '../context/ChatContext';
import { Box, TextField, Button } from '@mui/material';

const SendMessage: React.FC = () => {
  const [message, setMessage] = useState('');
  const { senderId, recipientId, setMessages } = useChat();

  console.log('Current Sender ID:', senderId);  // Log senderId
  console.log('Current Recipient ID:', recipientId);  // Log recipientId

  function getAuthToken(): string | null {
    return localStorage.getItem('access_token');
  }

  const sendMessage = async (message: string, senderId: string, recipientId: string) => {
    try {
      const token = getAuthToken();
      const response = await fetch('http://localhost:3000/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          message,
          senderId,
          recipientId,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      const data = await response.json();
      setMessages((prevMessages) => [...prevMessages, data]); // Update messages with the new one
      return data;
    } catch (error) {
      console.error('Error sending message:', (error as Error).message);
    }
  };

  const handleSendMessage = async () => {
    if (!senderId || !recipientId) {
      console.error('Sender or recipient ID is missing:', { senderId, recipientId });
      return;
    }

    await sendMessage(message, senderId, recipientId);
    setMessage(''); // Clear input after sending
  };

  return (
    <Box sx={{ display: 'flex', gap: 2 }}>
      <TextField
        fullWidth
        label="Type a message..."
        variant="outlined"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <Button variant="contained" color="primary" onClick={handleSendMessage}>
        Send
      </Button>
    </Box>
  );
};

export default SendMessage;
