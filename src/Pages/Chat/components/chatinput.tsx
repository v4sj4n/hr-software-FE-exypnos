import { useState, useContext } from 'react';
import AxiosInstance from '@/Helpers/Axios';
import { useAuth } from '@/ProtectedRoute/Context/AuthContext';
import { SocketContext } from '@/Pages/chat/context/SocketContext';

export const ChatInput = ({ conversationId }: { conversationId: string }) => {
    const [message, setMessage] = useState('');
    const socket = useContext(SocketContext);
    const { currentUser } = useAuth();

    const sendMessage = async () => {
        if (message.trim()) {
            try {
                await AxiosInstance.post('/messages', {
                    conversationId,
                    text: message,
                    senderId: currentUser?._id,
                });

                socket?.emit('message', {
                    conversationId,
                    text: message,
                    senderId: currentUser?._id,
                });

                setMessage('');
            } catch (error) {
                console.error('Error sending message:', error);
            }
        }
    };

    return (
        <div>
            <input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message"
            />
            <button onClick={sendMessage}>Send</button>
        </div>
    );
};
