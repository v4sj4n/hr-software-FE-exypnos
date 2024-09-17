import { createContext, useEffect, useState, useContext } from "react";
import { io, Socket } from "socket.io-client";
import { useAuth } from "@/Context/AuthProvider";

export const SocketContext = createContext<Socket | null>(null);

export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { currentUser } = useAuth(); // Ensure this is defined correctly
  const [socket, setSocket] = useState<Socket | null>(null);

  function getAuthToken(): string | null {
    return localStorage.getItem('access_token');
  }

  useEffect(() => {
    const token = getAuthToken();
    if (currentUser && token) {
      const socketConnection: Socket = io('http://localhost:3000', {
        auth: {
            token,
        },
      });

      socketConnection.on('connect_error', (error) => {
        console.log('Socket error', error.message);
        setSocket(socketConnection);
      });

      socketConnection.on('connect', () => {
        console.log('Socket connected');
        setSocket(socketConnection);
      });

      socketConnection.on('disconnect', () => {
        console.log('Socket disconnected');
      });

      return () => {
        socketConnection.disconnect();
      };
    }
  }, [currentUser]);

  console.log('Socket:', socket); // Log the socket

  // Check if socket is available before rendering
  if (!socket) {
    return null; // Or a loading state if you need one
  }

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error('useSocket must be used within a SocketProvider');
  }
  return context;
};
