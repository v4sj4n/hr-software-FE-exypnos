import { io, Socket } from 'socket.io-client';

const SOCKET_SERVER_URL = 'http://localhost:3000';

// Declare a variable to hold the socket instance
let socket: Socket | null = null;

// Initialize the socket connection
export const initiateSocketConnection = (): Socket => {
  if (!socket) {
    socket = io(SOCKET_SERVER_URL);
    console.log('Socket connected:', socket.id);
  }
  return socket;
};

// Function to get the current socket instance
export const getSocket = (): Socket | null => {
  return socket;
};

// Disconnect the socket
export const disconnectSocket = (): void => {
  if (socket) {
    socket.disconnect();
    console.log('Socket disconnected');
    socket = null;
  }
};
