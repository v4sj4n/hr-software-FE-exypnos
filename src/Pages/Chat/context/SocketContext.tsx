import { useAuth } from "@/ProtectedRoute/Context/AuthContext";
import { createContext, useEffect, useState, useContext } from "react";
import { io, Socket } from "socket.io-client";

const API_URL = import.meta.env.VITE_API_URL

export const SocketContext = createContext<Socket | null>(null);

export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { currentUser } = useAuth(); // Ensure this is defined correctly
  const [socket, setSocket] = useState<Socket | null>(null);

  function getAuthToken(): string | null {
    return localStorage.getItem('access_token');
  }

  useEffect(() => {
    const token = getAuthToken();

    // Only establish socket connection if there is a valid user and token
    if (currentUser && token) {
      const socketConnection: Socket = io(API_URL, {
        auth: {
          token,
        },
      });

      socketConnection.on('connect', () => {
        console.log('Socket connected');
        setSocket(socketConnection); // Only set socket when connected
      });

      socketConnection.on('connect_error', (error) => {
        console.error('Socket connection error:', error.message);
        // Optional: Add logic to handle reconnect attempts, delays, etc.
      });

      socketConnection.on('disconnect', () => {
        console.log('Socket disconnected');
      });

      // Clean up the connection on unmount or when user changes
      return () => {
        socketConnection.disconnect();
        setSocket(null); // Ensure to clean up the socket
      };
    } else {
      setSocket(null); // Handle case where user logs out or token is missing
    }
  }, [currentUser]);

  console.log('Socket:', socket); // Log the socket for debugging

  return (
    <ChatContext.Provider value={{ /* context values */ }}>
      {children}
    </ChatContext.Provider>
  );
};

// Hook to use the SocketContext
export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error('useSocket must be used within a SocketProvider');
  }
  return context;
};
