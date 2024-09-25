import { useEffect, useState, useContext, useRef } from 'react';
import { SocketContext } from '@/Pages/chat/context/SocketContext';
import AxiosInstance from '@/Helpers/Axios';

interface Message {
  _id: string;
  conversationId: string;
  text: string;
  senderId: string;
  createdAt: string;
}

interface MessagesListProps {
  conversationId: string;
}

export const MessagesList: React.FC<MessagesListProps> = ({ conversationId }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const socket = useContext(SocketContext);
  const previousConversationId = useRef<string | null>(null);

  useEffect(() => {
    // Clear messages when conversationId changes
    setMessages([]);

    if (conversationId) {
      fetchMessages();
    }
  }, [conversationId]);

  const fetchMessages = async () => {
    setLoading(true);
    setError(null);

    try {
      const { data } = await AxiosInstance.get(
        `/conversations/${conversationId}/messages`
      );

      setMessages(data);


      if (data.length === 0) {
      }
    } catch (error) {
      setError('Failed to fetch messages. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (socket && conversationId) {
      if (previousConversationId.current && previousConversationId.current !== conversationId) {
        socket.emit('leaveRoom', previousConversationId.current);
      }

      // Join the new room
      socket.emit('joinRoom', conversationId);

      previousConversationId.current = conversationId;

      // Set up socket listener for incoming messages
      const handleMessage = (newMessage: Message) => {
        if (newMessage.conversationId === conversationId) {
          setMessages((prevMessages) => {
            const messageExists = prevMessages.some(
              (message) => message._id === newMessage._id
            );
            if (!messageExists) {
              return [...prevMessages, newMessage];
            }
            return prevMessages;
          });
        }
      };

      socket.on('receiveMessage', handleMessage);

      return () => {
        socket.off('receiveMessage', handleMessage);
      };
    }
  }, [socket, conversationId]);

  return (
    <div>
      {loading ? (
        <p>Loading messages...</p>
      ) : error ? (
        <p>{error}</p>
      ) : messages.length > 0 ? (
        messages.map((message) => (
          <div key={message._id}>
            <p>{message.text}</p>
            <small>{new Date(message.createdAt).toLocaleTimeString()}</small>
          </div>
        ))
      ) : (
        <p>No messages in this conversation.</p>
      )}
    </div>
  );
};
