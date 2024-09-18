import React, { useState } from 'react';
import { useChat } from '../context/ChatContext';
import { Box, TextField, Button } from '@mui/material';
import { useSocket } from '../context/SocketContext';
import AxiosInstance from '@/Helpers/Axios'; // Assuming Axios is used for API requests

const API_URL = import.meta.env.VITE_API_URL;

const SendMessage: React.FC = () => {
  const [message, setMessage] = useState('');
  const { senderId, recipientId, setMessages } = useChat();
  const socket = useSocket();

  console.log('Current Sender ID:', senderId);  // Log senderId
  console.log('Current Recipient ID:', recipientId);  // Log recipientId

  function getAuthToken(): string | null {
    return localStorage.getItem('access_token');
  }

  // Function to send the message to your API
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

// Function to refetch the messages
const fetchMessages = async () => {
    try {
      const response = await AxiosInstance.get(`/messages/${senderId}/${recipientId}`);
      const fetchedMessages = response.data || []; // Ensure it defaults to an empty array
      setMessages(fetchedMessages);
    } catch (error) {
      console.error('Error fetching messages:', error);
      setMessages([]); // Set an empty array on error
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
      timestamp: new Date().toISOString(),  // Add timestamp locally
    };
  
    // Emit the message via WebSocket for real-time update
    socket.emit('sendMessage', messageData);
  
    // Immediately add the message to the local state for instant feedback
    setMessages((prevMessages) => Array.isArray(prevMessages) ? [...prevMessages, messageData] : [messageData]);
  
    // Save the message to the database via REST API
    await sendMessageToAPI(message, senderId, recipientId);
  
    // Optionally refetch the messages after sending
    await fetchMessages();
  
    console.log('Message sent:', message);  // Log the sent message
  
    // Clear the input field after sending the message
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
