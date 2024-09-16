import React, { createContext, useContext, useState } from 'react';

interface User {
  id: string;
  fullName: string;
}

interface Message {
  senderId: string;
  recipientId: string;
  message: string;
  timestamp: string;
}

interface ChatContextType {
  users: User[];
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  recipientId: string;
  setRecipientId: React.Dispatch<React.SetStateAction<string>>;
  loggedInUser: User | null;
  setLoggedInUser: React.Dispatch<React.SetStateAction<User | null>>;
}

// Create the context
const ChatContext = createContext<ChatContextType | undefined>(undefined);

// Provide the context to components
export const ChatProvider: React.FC = ({ children }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [recipientId, setRecipientId] = useState<string>('');
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);

  return (
    <ChatContext.Provider value={{ users, setUsers, messages, setMessages, recipientId, setRecipientId, loggedInUser, setLoggedInUser }}>
      {children}
    </ChatContext.Provider>
  );
};

// Custom hook to use the ChatContext
export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};
