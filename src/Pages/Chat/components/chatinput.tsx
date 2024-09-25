import { useState, useContext } from 'react';
import AxiosInstance from '@/Helpers/Axios';
import { useAuth } from '@/ProtectedRoute/Context/AuthContext';
import { SocketContext } from '@/Pages/chat/context/SocketContext';

interface ChatInputProps {
    conversationId: string;
}

export const ChatInput: React.FC<ChatInputProps> = ({ conversationId }) => {
    const [message, setMessage] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const socket = useContext(SocketContext);
    const { currentUser } = useAuth();

    const sendMessage = async () => {
        if (message.trim()) {
            if (socket?.connected) {
                const newMessage = {
                    conversationId, // Ensure the conversationId is the correct, existing one
                    text: message,
                    senderId: currentUser?._id,
                    createdAt: new Date().toISOString(),
                };

                try {
                    setLoading(true);
                    setError(null);

                    // Emit the message to the room via socket
                    socket.emit('sendMessage', newMessage);
                    console.log('Message sent via socket:', newMessage);

                    // Save the message to the database via API
                    await AxiosInstance.post('/messages', {
                        conversationId, // Make sure the correct conversationId is sent
                        text: message,
                        senderId: currentUser?._id,
                    });

                    setMessage(''); // Clear input after sending
                } catch (error) {
                    console.error('Error sending message:', error);
                    setError('Failed to send message. Please try again.');
                } finally {
                    setLoading(false);
                }
            } else {
                setError('Socket is not connected. Unable to send message.');
                console.error('Socket is not connected, cannot send message');
            }
        } else {
            setError('Message cannot be empty.');
        }
    };

    return (
        <div>
            <input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message"
                disabled={loading}
            />
            <button onClick={sendMessage} disabled={loading}>
                {loading ? 'Sending...' : 'Send'}
            </button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};
