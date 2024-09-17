import { useState } from 'react';
import { useChat } from '../context/ChatContext';
import { Box, TextField, Button } from '@mui/material';
import { useSocket } from '../context/SocketContext';
const API_URL = import.meta.env.VITE_API_URL;  // Correctly typed now

const SendMessage: React.FC = () => {
  const [message, setMessage] = useState('');
  const { senderId, recipientId, setMessages } = useChat();
  const socket = useSocket();

  console.log('Current Sender ID:', senderId);  // Log senderId
  console.log('Current Recipient ID:', recipientId);  // Log recipientId

  function getAuthToken(): string | null {
    return localStorage.getItem('access_token');
  }

  const sendMessageToAPI = async (message: string, senderId: string, recipientId: string) => {
    try {
      const token = getAuthToken();
      const response = await fetch(`${API_URL}/messages`, {
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
    console.log('Sending message:', message);  // Log the message being sent
    if (!senderId || !recipientId || !message.trim()) {
      console.error('Sender or recipient ID is missing or message is empty.');
      return;
    }

    const messageData = {
      senderId,
      recipientId,
      message,
      timestamp: new Date().toISOString(),  
    };

    socket.emit('sendMessage', messageData);
    setMessage('');
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
