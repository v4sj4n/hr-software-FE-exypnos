import { useEffect, useState, useContext, useRef } from 'react';
import { SocketContext } from '@/Pages/chat/context/SocketContext';
import AxiosInstance from '@/Helpers/Axios';
import { useAuth } from '@/ProtectedRoute/Context/AuthContext';
import styles from '@/Pages/chat/styles/chat.module.css'; // Import the CSS module

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
  const { currentUser } = useAuth(); // Get the current user
  const previousConversationId = useRef<string | null>(null);

  useEffect(() => {
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

      socket.emit('joinRoom', conversationId);
      previousConversationId.current = conversationId;

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
    <div className={styles.messagesList}>
      {loading ? (
        <p>Loading messages...</p>
      ) : error ? (
        <p>{error}</p>
      ) : messages.length > 0 ? (
        messages.map((message) => (
          <div 
            key={message._id} 
            className={`${styles.message} ${message.senderId === currentUser?._id ? styles.sent : styles.received}`} // Correctly apply styles based on current user
          >
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
