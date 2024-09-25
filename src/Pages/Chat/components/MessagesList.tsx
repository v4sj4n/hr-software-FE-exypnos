import { useEffect, useState, useContext } from 'react';
import AxiosInstance from '@/Helpers/Axios';
import { SocketContext } from '@/Pages/chat/context/SocketContext';
import { Message } from '@/Pages/chat/Interfaces/types';

export const MessagesList = ({ conversationId }: { conversationId: string }) => {
    const [messages, setMessages] = useState<Message[]>([]);
    const socket = useContext(SocketContext);

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const { data } = await AxiosInstance.get(`/messages/${conversationId}`);
                setMessages(data);
            } catch (error) {
                console.error('Error fetching messages:', error);
            }
        };

        fetchMessages();

        if (socket) {
            socket.on('message', (newMessage: Message) => {
                setMessages((prevMessages) => [...prevMessages, newMessage]);
            });

            return () => {
                socket.off('message');
            };
        }
    }, [conversationId, socket]);

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
