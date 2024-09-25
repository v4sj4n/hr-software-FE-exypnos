import { useEffect, useState, useContext } from 'react';
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

  // Fetch messages when the conversationId changes
  useEffect(() => {
    if (conversationId) {
      const fetchMessages = async () => {
        setLoading(true); // Set loading to true when fetching messages
        setError(null); // Clear any previous errors
  
        try {
          const { data } = await AxiosInstance.get(`/conversations/${conversationId}/messages`);
          setMessages(data); // Set fetched messages
          console.log('Messages fetched:', data);
  
          // Handle empty messages scenario
          if (data.length === 0) {
            console.log('No messages in this conversation.');
          }
        } catch (error) {
          console.error('Error fetching messages:', error);
          setError('Failed to fetch messages. Please try again.');
        } finally {
          setLoading(false); // Set loading to false once messages are fetched
        }
      };
  
      fetchMessages();
    }
  }, [conversationId]);

  useEffect(() => {
    let joinTimeout: NodeJS.Timeout;
    if (socket && conversationId) {
      console.log(`Setting up socket listener for conversation: ${conversationId}`);
      joinTimeout = setTimeout(() => {
        socket.emit('joinRoom', conversationId);
      }, 300); // Debounce time (300ms for example)
      
      const handleMessage = (newMessage: Message) => {
        console.log('Message received from socket:', newMessage);
        if (newMessage.conversationId === conversationId) {
          setMessages((prevMessages) => [...prevMessages, newMessage]);
        }
      };
  
      socket.on('receiveMessage', handleMessage);
  
      return () => {
        clearTimeout(joinTimeout); // Clear debounce if conversationId changes
        console.log('Cleaning up socket listener');
        socket.off('receiveMessage', handleMessage);
      };
    }
  }, [socket, conversationId]);
  
  

  // Render loading, error, or messages
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
        <p>No messages in this conversation.</p> // Display this if no messages exist
      )}
    </div>
  );
};
