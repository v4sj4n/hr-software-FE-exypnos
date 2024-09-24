import { useEffect, useState, useContext } from 'react';
import AxiosInstance from '@/Helpers/Axios';
import { SocketContext } from '../context/SocketContext';
import { Message } from '../Interfaces/types';

export const MessagesList = ({ conversationId }: { conversationId: string }) => {
  const [messages, setMessages] = useState<Message[]>([]); // Use Message[] type
  const socketContext = useContext(SocketContext); // Get the socket context
  const socket = socketContext?.socket; // Safely access the socket with optional chaining

  useEffect(() => {
    const fetchMessages = async () => {
      const { data } = await AxiosInstance.get(`/conversations/${conversationId}/messages`);
      setMessages(data);
    };

    fetchMessages();

    if (socket) {
      socket.emit('joinConversation', { conversationId });

      socket.on('message', (newMessage: Message) => { // Properly type newMessage
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      });

      return () => {
        socket.off('message');
      };
    }
  }, [conversationId, socket]); // Ensure socket is a dependency

  return (
    <div>
      {messages.map((message) => (
        <div key={message._id}>
          <p>{message.text}</p>
        </div>
      ))}
    </div>
  );
};
