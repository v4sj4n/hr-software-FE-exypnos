import { useState, useEffect } from 'react';
import { io, Socket } from 'socket.io-client';
import { useChat } from '../context/ChatContext';
import { Message } from '../Interfaces/types';
const API_URL = import.meta.env.VITE_API_URL

export const useChatLogic = () => {
  const { loggedInUser, recipientId, newMessage, setNewMessage, setMessages } = useChat();
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    if (loggedInUser) {
      const newSocket = io(API_URL, { query: { userId: loggedInUser._id } });
      setSocket(newSocket);

      console.log('Socket connected:', newSocket);  // Log when socket is connected

      newSocket.on('privateMessage', (message: Message) => {
        console.log('Received a message:', message);  // Log incoming message
        setMessages((prevMessages) => [...prevMessages, message]);
      });

      return () => {
        console.log('Socket disconnected');
        newSocket.disconnect();  // Log when socket is disconnected
      };
    }
  }, [loggedInUser, setMessages]);

  const handleSendMessage = () => {
    if (socket && recipientId && newMessage.trim()) {
      console.log('Sending message:', { 
        senderId: loggedInUser?._id, 
        recipientId, 
        message: newMessage 
      });  // Log the message being sent
      socket.emit('privateMessage', {
        senderId: loggedInUser?._id,
        recipientId,
        message: newMessage,
      });
      setNewMessage('');  // Clear the input after sending
    } else {
      console.log('Message not sent, missing data');  // Log if message is not sent due to missing data
    }
  };

  return { handleSendMessage };
};

