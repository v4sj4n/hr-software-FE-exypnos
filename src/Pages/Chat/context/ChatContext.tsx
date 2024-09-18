import { createContext, useState, useContext, useEffect } from 'react';
import { User, Message } from '@/Pages/Chat/Interfaces/types';  
import { useSocket } from './SocketContext';  
import { useAuth } from '@/ProtectedRoute/Context/AuthContext';
import { Socket } from 'socket.io-client';

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
  const [newMessage, setNewMessage] = useState<string>('');  // <-- Add this state
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);
  const [senderId, setSenderId] = useState<string>('');

  useEffect(() => {
    if (currentUser && currentUser._id) {
      setSenderId(String(currentUser._id)); 
    }
  }, [currentUser]);

  // Listen for new messages and update user list
  useEffect(() => {
    if (socket) {
      socket.on('receiveMessage', (data) => {
        setMessages((prevMessages) => {
          if (!prevMessages.some((msg) => msg.timestamp === data.timestamp)) {
            return [...prevMessages, data];
          }
          return prevMessages;
        });

        // Update users list if the new message involves the current user
        if (data.senderId !== senderId && !users.some((user) => user._id === data.senderId)) {
          setUsers((prevUsers) => [...prevUsers, { _id: data.senderId, firstName: 'User', lastName: 'X', name: '', email: '', phone: '', role: '' }]);  // Mock user details, update as needed
        }
      });

      return () => {
        socket.off('receiveMessage');
      };
    }
  }, [socket, senderId, users]);

 // Remove any references to newMessage and setNewMessage
 return (
  <ChatContext.Provider
    value={{
      users,
      setUsers,
      messages,
      setMessages,
      senderId,  
      setSenderId,  
      recipientId,
      setRecipientId,
      newMessage,  // <-- Add this to the context
      setNewMessage,  // <-- Add this to the context
      loggedInUser,
      setLoggedInUser,
      socket,
    }}
  >
    {children}
  </ChatContext.Provider>
);
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};
