import { createContext, useState, useContext, useEffect } from 'react';
import { User, Message } from '@/Pages/Chat/Interfaces/types';  // Adjust the path as needed
import { useSocket } from './SocketContext';  // Correct import
import { Socket } from 'socket.io-client';  // Ensure this is imported
import { useAuth } from '@/Context/AuthProvider';

interface ChatContextType {
  users: User[];
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  senderId: string;
  setSenderId: React.Dispatch<React.SetStateAction<string>>;
  recipientId: string;
  setRecipientId: React.Dispatch<React.SetStateAction<string>>;
  newMessage: string;
  setNewMessage: React.Dispatch<React.SetStateAction<string>>;
  loggedInUser: User | null;
  setLoggedInUser: React.Dispatch<React.SetStateAction<User | null>>;
  socket: Socket | null;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const socket = useSocket();
  const { currentUser } = useAuth(); 
  const [users, setUsers] = useState<User[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [recipientId, setRecipientId] = useState<string>('');
  const [newMessage, setNewMessage] = useState<string>('');
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);
  const [senderId, setSenderId] = useState<string>('');

  console.log('currentUser:', currentUser);

  useEffect(() => {
    if (currentUser && currentUser._id) {
      setSenderId(String(currentUser._id));  // Ensure _id is treated as a string
    } else {
      console.error('Current user or user ID is missing');
    }
  }, [currentUser]);

  useEffect(() => {
    if (socket) {
      socket.on('privateMessage', (message: Message) => {
        setMessages((prevMessages) => [...prevMessages, message]);
      });
    }

    // Cleanup on unmount
    return () => {
      if (socket) {
        socket.off('privateMessage');
      }
    };
  }, [socket]);

  return (
    <ChatContext.Provider
      value={{
        users,
        setUsers,
        messages,
        setMessages,
        senderId,  // Directly provide senderId
        setSenderId,  // Provide setSenderId function
        recipientId,
        setRecipientId,
        newMessage,
        setNewMessage,
        loggedInUser,
        setLoggedInUser,
        socket,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

// Hook to use the ChatContext
export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};
