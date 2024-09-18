import { useState, useEffect } from 'react';
import { io, Socket } from 'socket.io-client'; // Import `io` for WebSocket connection
import { useChat } from '../context/ChatContext';
import AxiosInstance from '@/Helpers/Axios'; // Ensure the Axios import is correct
import { Message } from '../Interfaces/types';

export const useChatLogic = () => {
  const { loggedInUser, recipientId, newMessage, setNewMessage, setMessages } = useChat();
  const [socket, setSocket] = useState<Socket | null>(null); // Adding setSocket for socket management

  // Function to fetch messages between the current user and the selected recipient
  const fetchMessages = async () => {
    if (loggedInUser && recipientId) {
      try {
        const response = await AxiosInstance.get(`/messages/${loggedInUser._id}/${recipientId}`);
        const fetchedMessages = response.data;
        setMessages(fetchedMessages);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    }
  };

  // Attach the socket listener and handle incoming messages
  useEffect(() => {
    if (socket) {
      const messageListener = (messageData: Message) => {
        // Check if the message is already in the state to avoid duplicates
        setMessages((prevMessages) => {
          if (prevMessages.some(msg => msg.timestamp === messageData.timestamp && msg.message === messageData.message)) {
            return prevMessages;  // Avoid duplicates
          }
          return [...prevMessages, messageData];
        });
      };
  
      // Attach the listener
      socket.on('privateMessage', messageListener);
  
      // Clean up the listener on component unmount
      return () => {
        socket.off('privateMessage', messageListener);  // Proper cleanup to avoid multiple listeners
      };
    }
  }, [socket, setMessages]);
  

  // Initialize socket connection when the component mounts
  useEffect(() => {
    if (loggedInUser) {
      const newSocket = io(process.env.REACT_APP_SOCKET_URL || 'http://localhost:3000', {
        query: { userId: loggedInUser._id },
      });
      setSocket(newSocket); // Set socket state

      // Clean up the socket connection on component unmount
      return () => {
        newSocket.disconnect();
        setSocket(null); // Ensure socket is reset
      };
    }
  }, [loggedInUser]);

  // Fetch messages when recipientId or loggedInUser changes
  useEffect(() => {
    fetchMessages();
  }, [loggedInUser, recipientId]);

  // Handle sending messages
  const handleSendMessage = () => {
    if (socket && recipientId && newMessage.trim()) {
      const senderId = loggedInUser?._id; // Get senderId from loggedInUser
  
      // Ensure senderId is a valid string
      if (!senderId) {
        console.error('Sender ID is missing or undefined');
        return; // Stop further execution if senderId is missing
      }
  
      const messageData: Message = {
        senderId,  // senderId is now guaranteed to be a string
        recipientId,
        message: newMessage,
        timestamp: new Date().toISOString(), // Ensure message includes a timestamp
      };
  
      console.log('Sending message:', messageData);
      socket.emit('privateMessage', messageData);
  
      // Optimistically update the message list with the new message
      setMessages((prevMessages) => (Array.isArray(prevMessages) ? [...prevMessages, messageData] : [messageData]));
  
      // Clear input after sending the message
      setNewMessage('');
    } else {
      console.log('Message not sent: Missing data');
    }
  };
  
  

  return { handleSendMessage };
};
