import { useState, useEffect } from 'react';
import AxiosInstance from '@/Helpers/Axios'; // Your custom Axios instance
import socket from '../services/socket';

interface Message {
  conversationId: string;
  content: string;
  sender: string;
}

interface Conversation {
  _id: string;
  participants: string[];
}

const useChat = () => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    // Fetch all conversations using your custom Axios instance
    AxiosInstance.get('/conversations/user/me').then((response) => {
      setConversations(response.data);
    });

    // Listen for new messages via Socket.IO
    socket.on('receiveMessage', (message: Message) => {
      if (selectedConversation && message.conversationId === selectedConversation._id) {
        setMessages((prev) => [...prev, message]);
      }
    });

    return () => {
      socket.off('receiveMessage');
    };
  }, [selectedConversation]);

  const selectConversation = (conversation: Conversation) => {
    setSelectedConversation(conversation);
    AxiosInstance.get(`/messages/${conversation._id}`).then((response) => {
      setMessages(response.data);
    });
  };

  const sendMessage = (content: string) => {
    if (selectedConversation) {
      const message: Message = {
        conversationId: selectedConversation._id,
        content,
        sender: 'currentUserId', // Replace with actual user ID
      };
      socket.emit('sendMessage', message);
    }
  };

  return {
    conversations,
    messages,
    selectedConversation,
    selectConversation,
    sendMessage,
  };
};

export default useChat;
