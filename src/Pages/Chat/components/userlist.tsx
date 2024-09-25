import { useEffect, useState } from 'react';
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
    Typography
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useGetAllUsers } from '@/Pages/Employees/Hook';

export const UserList = ({ onSelectConversation }: any) => {
    const [conversations, setConversations] = useState<any[]>([]);
    const [search, setSearch] = useState('');
    const [openModal, setOpenModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { currentUser } = useAuth();
    const { data: users = [] } = useGetAllUsers();

    // Fetch all conversations for the current user
    useEffect(() => {
        const fetchConversations = async () => {
            setLoading(true);
            setError(null); // Clear previous errors
            try {
                const response = await AxiosInstance.get(`/conversations/user/${currentUser?._id}`);
                setConversations(response.data);
            } catch (error) {
                console.error('Error fetching conversations:', error);
                setError('Failed to fetch conversations.');
            } finally {
                setLoading(false);
            }
        };

        if (currentUser?._id) {
            fetchConversations();
        }
    }, [currentUser?._id]);

    // Create a new conversation when a user is selected in the modal
    const handleSelectUser = async (user: any) => {
        setOpenModal(false);

        // Check if a conversation already exists with the selected user
        const existingConversation = conversations.find((conversation) => {
            const participants = conversation.participants;
            return participants.includes(user._id) && participants.includes(currentUser?._id);
        });

        if (existingConversation) {
            console.log('Conversation already exists:', existingConversation._id);
            onSelectConversation(existingConversation._id); // Select the existing conversation
        } else {
            // If no conversation exists, create a new one
            try {
                const response = await AxiosInstance.post('/conversations', {
                    participants: [String(user._id), String(currentUser?._id)],
                });
                setConversations((prevConversations) => [
                    ...prevConversations,
                    response.data,
                ]);
                onSelectConversation(response.data._id); // Select the new conversation
            } catch (error) {
                console.error('Error creating conversation:', error);
                setError('Failed to create conversation.');
            }
        }
    };

    // Get the name of the conversation
    const getConversationName = (conversation: any) => {
        const participant = conversation.participants.find(
            (participantId: string) => participantId !== currentUser?._id,
        );
        const user = users.find((user: any) => user._id === participant);
        return user ? `${user.firstName} ${user.lastName}` : 'Unknown User';
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
                                {/* Optionally display the latest message */}
                                <Box>
                                    <span>
                                        Last message: {conversation.messages?.[conversation.messages.length - 1]?.text || 'No messages yet'}
                                    </span>
                                </Box>
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

            {/* User Search Modal for creating new conversations */}
            <UserSearchModal
                open={openModal}
                onSelectUser={handleSelectUser}
                onClose={() => setOpenModal(false)}
            />
        </Box>
    );
};
