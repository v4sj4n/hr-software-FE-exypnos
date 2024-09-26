import { useAuth } from '@/ProtectedRoute/Context/AuthContext';
import { createContext, useEffect, useState, useContext } from 'react';
import { io, Socket } from 'socket.io-client';

export const SocketContext = createContext<Socket | null>(null);

export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { currentUser } = useAuth();
    const [socket, setSocket] = useState<Socket | null>(null);

    function getAuthToken(): string | null {
        return localStorage.getItem('access_token');
    }

    useEffect(() => {
        const token = getAuthToken();
        if (currentUser && token) {
            const socketConnection: Socket = io("https://seashell-app-rvw8f.ondigitalocean.app", {
                auth: {
                    token,
                },
                transports: ['websocket'],
                secure: true,
            });

            socketConnection.on('connect', () => {
                console.log('Socket connected:', socketConnection.id);
                // Join the user's personal room upon connection
                socketConnection.emit('joinRoom', currentUser._id, (ack: any) => {
                    if (ack.status === 'ok') {
                        console.log(`Joined user room: ${currentUser._id}`);
                    } else {
                        console.error(`Failed to join user room: ${currentUser._id}`, ack.error);
                    }
                });
            });

            socketConnection.on('disconnect', () => {
                console.log('Socket disconnected');
            });

            socketConnection.on('connect_error', (err) => {
                console.error('Socket connection error:', err);
            });

            // Handle reconnection
            socketConnection.on('reconnect', (attemptNumber) => {
                console.log(`Socket reconnected after ${attemptNumber} attempts`);
                // Re-join the user's personal room upon reconnection
                socketConnection.emit('joinRoom', currentUser._id, (ack: any) => {
                    if (ack.status === 'ok') {
                        console.log(`Re-joined user room: ${currentUser._id}`);
                    } else {
                        console.error(`Failed to re-join user room: ${currentUser._id}`, ack.error);
                    }
                });
            });

            setSocket(socketConnection);

            return () => {
                socketConnection.disconnect();
            };
        }
    }, [currentUser]);

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    );
};

export const useSocket = () => {
    const context = useContext(SocketContext);
    if (!context) {
        throw new Error('useSocket must be used within a SocketProvider');
    }
    return context;
};
