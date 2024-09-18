import { createContext, useState, useContext, useEffect } from 'react';
import { User, Message } from '@/Pages/Chat/Interfaces/types';  
import { useSocket } from './SocketContext';  
import { useAuth } from '@/ProtectedRoute/Context/AuthContext';
import { Socket } from 'socket.io-client';
import AxiosInstance from '@/Helpers/Axios';

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
  activeChats: User[];  // Track active chats
  setActiveChats: React.Dispatch<React.SetStateAction<User[]>>;  // <-- Add setActiveChats here
  fetchActiveChats: () => Promise<void>;  // Function to refetch active chats
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
  const [activeChats, setActiveChats] = useState<User[]>([]);  // Add activeChats state

  // Function to fetch active chats (users with whom the sender has exchanged messages)
  const fetchActiveChats = async () => {
    try {
      // Ensure that the senderId exists
      if (!senderId) {
        console.error("Sender ID is missing or invalid");
        return;
      }
  
      // Adjust the API endpoint URL if needed
      const response = await AxiosInstance.get(`/messages/sender/${senderId}`);
      
      const sentMessages = response.data || [];
      const recipientIds = sentMessages.map((msg: Message) => msg.recipientId);
      const uniqueRecipientIds = [...new Set(recipientIds)];
  
      const activeUsersResponse = await AxiosInstance.get('/users'); // Adjust API as needed
      const activeUsers = activeUsersResponse.data.filter((user: User) =>
        uniqueRecipientIds.includes(user._id)
      );
  
      setActiveChats(activeUsers);  // Update the activeChats state
    } catch (error: any) {
      // Enhanced error logging for debugging
      console.error('Error fetching active chats:', error.message || error);
      console.error('Error details:', error.response?.data || 'No additional details');
    }
  };
  

  useEffect(() => {
    if (currentUser && currentUser._id) {
      setSenderId(String(currentUser._id)); 
    }
  }, [currentUser]);

  // Listen for new messages and update active chats
  useEffect(() => {
    if (socket) {
      socket.on('receiveMessage', async (data: Message) => {
        // Add the incoming message to the state
        setMessages((prevMessages) => [...prevMessages, data]);

        // Refetch active chats after receiving a new message
        await fetchActiveChats();
      });

      return () => {
        socket.off('receiveMessage');
      };
    }
  }, [socket]);

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
        newMessage,
        setNewMessage,
        loggedInUser,
        setLoggedInUser,
        socket,
        activeChats,  // Pass activeChats
        setActiveChats,  // <-- Pass setActiveChats here
        fetchActiveChats,  // Pass fetchActiveChats
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
