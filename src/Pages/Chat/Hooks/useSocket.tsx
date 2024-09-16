import { useEffect } from 'react';
import { disconnectSocket, initiateSocketConnection } from '@/Services/socketService';
import { useChat } from '../context/ChatContext';
import { Message } from '../Interfaces/types';

export const useSocket = (): void => {
  const { loggedInUser, setMessages } = useChat();

  useEffect(() => {
    if (loggedInUser) {
      console.log('Attempting to connect socket for user:', loggedInUser.id);  // Log user info

      const socket = initiateSocketConnection();
      console.log('Socket initiated:', socket);  // Log after initiating the connection

      socket.on('privateMessage', (message: Message) => {
        console.log('Received message via socket:', message);  // Log received message
        setMessages((prevMessages) => [...prevMessages, message]);
      });

      return () => {
        console.log('Disconnecting socket for user:', loggedInUser.id);  // Log before disconnecting
        disconnectSocket();
      };
    }
  }, [loggedInUser, setMessages]);
};
