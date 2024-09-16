import { createContext, useState, useContext, useEffect } from 'react';
import { User, Message } from '@/Pages/Chat/Interfaces/types';  // Adjust the path as needed
import { useSocket } from './SocketContext';  // Correct import

interface ChatContextType {
  users: User[];
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  recipientId: string;
  setRecipientId: React.Dispatch<React.SetStateAction<string>>;
  newMessage: string;
  setNewMessage: React.Dispatch<React.SetStateAction<string>>;
  loggedInUser: User | null;
  setLoggedInUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const socket = useSocket();  // Correctly using the socket context
  const [messages, setMessages] = useState<Message[]>([]);
  const [recipientId, setRecipientId] = useState<string>('');
  const [newMessage, setNewMessage] = useState<string>('');
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);

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
        users: [],
        setUsers: () => {},
        messages,
        setMessages,
        recipientId,
        setRecipientId,
        newMessage,
        setNewMessage,
        loggedInUser,
        setLoggedInUser,
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
