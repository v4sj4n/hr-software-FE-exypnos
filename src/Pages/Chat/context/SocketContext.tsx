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
            });
    
            socketConnection.on('disconnect', () => {
                console.log('Socket disconnected');
            });
    
            setSocket(socketConnection);
    
            return () => {
                socketConnection.disconnect();
            };
        }
    }, [currentUser]);
    

    if (!socket) {
        return null; // Handle case where socket is not yet connected
    }

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
