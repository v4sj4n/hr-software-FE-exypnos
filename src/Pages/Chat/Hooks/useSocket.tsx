import { useEffect, useRef } from 'react';
import { disconnectSocket, initiateSocketConnection } from '@/Services/socketService';
import { useChat } from '../context/ChatContext';
import { Message } from '../Interfaces/types';

export const useSocket = (): void => {
  const { loggedInUser, setMessages } = useChat();
  const socketRef = useRef<any>(null);  // Store socket instance

  useEffect(() => {
    if (loggedInUser) {
      console.log('Attempting to connect socket for user:', loggedInUser._id);  // Log user info

      socketRef.current = initiateSocketConnection();  // Store socket in ref
      console.log('Socket initiated:', socketRef.current);  // Log after initiating the connection

      // Handle incoming messages
      socketRef.current.on('privateMessage', (message: Message) => {
        console.log('Received message via socket:', message);  // Log received message
        setMessages((prevMessages) => [...prevMessages, message]);
      });

      // Cleanup on unmount or when user changes
      return () => {
        if (socketRef.current) {
          console.log('Disconnecting socket for user:', loggedInUser._id);  // Log before disconnecting
          disconnectSocket(socketRef.current);
          socketRef.current = null;  // Clear socket reference
        }
      };
    }
  }, [loggedInUser, setMessages]);
};
