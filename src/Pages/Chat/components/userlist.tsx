import { useContext, useEffect, useState, useRef } from 'react';
import AxiosInstance from '@/Helpers/Axios';
import { useAuth } from '@/ProtectedRoute/Context/AuthContext';
import { UserSearchModal } from '@/Pages/chat/components/UserSearchModal';
import {
    List,
    ListItem,
    ListItemText,
    TextField,
    IconButton,
    Box,
    CircularProgress,
    Typography,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useGetAllUsers } from '@/Pages/Employees/Hook';
import { SocketContext } from '../context/SocketContext';

export const UserList = ({ onSelectConversation }: any) => {
    const [conversations, setConversations] = useState<any[]>([]);
    const [search, setSearch] = useState('');
    const [openModal, setOpenModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { currentUser } = useAuth();
    const { data: users = [] } = useGetAllUsers();
    const socket = useContext(SocketContext);
    const isFetching = useRef(false); // Track if fetch is in progress
    const socketInitialized = useRef(false); // Track if socket events are initialized

    useEffect(() => {
        const fetchConversations = async () => {
            if (isFetching.current) return; // Prevent duplicate fetching
            setLoading(true);
            setError(null);
            isFetching.current = true;

            try {
                const response = await AxiosInstance.get(
                    `/conversations/user/${currentUser?._id}`
                );
                setConversations(response.data);
            } catch (error) {
                console.error('Error fetching conversations:', error);
                setError('Failed to fetch conversations.');
            } finally {
                setLoading(false);
                isFetching.current = false;
            }
        };

        if (currentUser?._id) {
            fetchConversations();
        }
    }, [currentUser?._id]);

    useEffect(() => {
        if (socket && !socketInitialized.current) {
            // Prevent setting up listeners multiple times
            socketInitialized.current = true;

            // Handle room joining
            socket.on('joinRoom', (conversationId) => {
                console.log(`Joining conversation room: ${conversationId}`);
                socket.emit('joinRoom', conversationId);
            });

            // Handle new conversation
            socket.on('newConversation', (newConversation) => {
                console.log('New conversation received:', newConversation);
                setConversations((prevConversations) => {
                    const isParticipant = newConversation.participants.includes(
                        currentUser?._id
                    );
                    if (isParticipant) {
                        return [...prevConversations, newConversation];
                    }
                    return prevConversations;
                });

                // Automatically join the conversation room for the new conversation
                socket.emit('joinRoom', newConversation._id);
            });
        }

        return () => {
            if (socket) {
                socket.off('joinRoom');
                socket.off('newConversation');
                socketInitialized.current = false; // Reset for future component mounts
            }
        };
    }, [socket, currentUser?._id]);

    const handleSelectUser = async (user: any, message: string) => {
        setOpenModal(false);

        const existingConversation = conversations.find((conversation) => {
            const participants = conversation.participants;
            return (
                participants.includes(user._id) &&
                participants.includes(currentUser?._id)
            );
        });

        let conversationId;
        if (existingConversation) {
            console.log('Conversation already exists:', existingConversation._id);
            conversationId = existingConversation._id;

            try {
                await AxiosInstance.post('/messages', {
                    conversationId,
                    text: message,
                    senderId: currentUser?._id,
                });
                onSelectConversation(conversationId);
            } catch (error) {
                console.error('Error sending message:', error);
                setError('Failed to send message.');
            }
        } else {
            try {
                const response = await AxiosInstance.post('/conversations', {
                    conversation: {
                        participants: [
                            String(user._id),
                            String(currentUser?._id),
                        ],
                    },
                    message: {
                        senderId: currentUser?._id,
                        text: message,
                    },
                });
                conversationId = response.data.conversation._id;
                setConversations((prevConversations) => [
                    ...prevConversations,
                    response.data.conversation,
                ]);

                onSelectConversation(conversationId);
            } catch (error) {
                console.error('Error creating conversation:', error);
                setError('Failed to create conversation.');
            }
        }
    };

    useEffect(() => {
        if (socket && currentUser?._id) {
            socket.emit('joinRoom', currentUser._id);
            console.log(`User ${currentUser._id} joined their own room`);
        }
    }, [socket, currentUser?._id]);

    const getConversationName = (conversation: any) => {
        const participant = conversation.participants.find(
            (participantId: string) => participantId !== currentUser?._id
        );
        const user = users.find((user: any) => user._id === participant);
        return user ? `${user?.firstName} ${user?.lastName}` : 'Unknown User';
    };

    return (
        <Box
            sx={{
                width: '300px',
                height: '80vh',
                maxHeight: '80vh',
                display: 'flex',
                flexDirection: 'column',
                border: '1px solid #ddd',
                padding: 2,
                boxSizing: 'border-box',
                overflowY: 'auto',
                backgroundColor: '#f9f9f9',
                borderRadius: '12px',
            }}
        >
            <Box sx={{ display: 'flex', alignItems: 'center', paddingBottom: 2 }}>
                <TextField
                    fullWidth
                    variant="outlined"
                    label="Search conversations"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <IconButton
                    color="primary"
                    onClick={() => setOpenModal(true)}
                    aria-label="add conversation"
                    sx={{ marginLeft: 1 }}
                >
                    <AddIcon />
                </IconButton>
            </Box>

            {loading ? (
                <CircularProgress sx={{ alignSelf: 'center' }} />
            ) : error ? (
                <Typography color="error">{error}</Typography>
            ) : conversations.length > 0 ? (
                <List sx={{ flexGrow: 1, overflowY: 'auto' }}>
                    {conversations
                        .filter((conversation) =>
                            getConversationName(conversation)
                                .toLowerCase()
                                .includes(search.toLowerCase())
                        )
                        .map((conversation: any) => (
                            <ListItem
                                key={conversation._id}
                                button
                                onClick={() => onSelectConversation(conversation._id)}
                            >
                                <ListItemText primary={getConversationName(conversation)} />
                            </ListItem>
                        ))}
                    {conversations.filter((conversation) =>
                        getConversationName(conversation)
                            .toLowerCase()
                            .includes(search.toLowerCase())
                    ).length === 0 && (
                        <ListItem>
                            <ListItemText primary="No conversations match your search" />
                        </ListItem>
                    )}
                </List>
            ) : (
                <ListItem>
                    <ListItemText primary="No conversations found" />
                </ListItem>
            )}

            <UserSearchModal
                open={openModal}
                onSelectUser={handleSelectUser}
                onClose={() => setOpenModal(false)}
            />
        </Box>
    );
};
