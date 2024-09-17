import { useState, useEffect } from 'react';
import { Socket } from 'socket.io-client';
import { useChat } from '../context/ChatContext';
import AxiosInstance from '@/Helpers/Axios'; // Ensure the Axios import is correct
import { Message } from '../Interfaces/types';

export const useChatLogic = () => {
  const { loggedInUser, recipientId, newMessage, setNewMessage, setMessages } = useChat();
  const [socket] = useState<Socket | null>(null);  // Removed `setSocket`

  useEffect(() => {
    if (loggedInUser && recipientId) {
      const fetchMessages = async () => {
        try {
          const response = await AxiosInstance.get(`/messages/${loggedInUser._id}/${recipientId}`);
          const fetchedMessages = response.data;
          setMessages(fetchedMessages);
        } catch (error) {
          console.error('Error fetching messages:', error);
        }
      };
  
      fetchMessages();
    }
  }, [loggedInUser, recipientId, setMessages]);

  const handleSendMessage = () => {
    if (socket && recipientId && newMessage.trim()) {
      // You are using the object `message`, not the `Message` interface

      const messageData = {
        senderId: loggedInUser?._id || '', // Ensure senderId is always a string
        recipientId, 
        message: newMessage, 
        timestamp: new Date().toISOString(),  
      };

      console.log('Sending message:', messageData);  
      socket.emit('privateMessage', messageData);

      // Correct usage of `messageData`
      setMessages((prevMessages: Message[]) => [...prevMessages, messageData]);

      setNewMessage('');  
    } else {
      console.log('Message not sent, missing data');  
    }
  };

  return { handleSendMessage };
};
