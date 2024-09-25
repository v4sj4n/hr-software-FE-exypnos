import { useEffect, useState } from 'react';
import AxiosInstance from '@/Helpers/Axios';
import { useAuth } from '@/ProtectedRoute/Context/AuthContext';
import { UserSearchModal } from '@/Pages/chat/components/UserSearchModal';
import { List, ListItem, ListItemText, TextField, IconButton, Box } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useGetAllUsers } from '@/Pages/Employees/Hook';

export const UserList = ({ onSelectConversation }: any) => {
    const [conversations, setConversations] = useState<any[]>([]);
    const [search, setSearch] = useState('');
    const [openModal, setOpenModal] = useState(false);
    const { currentUser } = useAuth();
    const { data: users = [] } = useGetAllUsers();

    useEffect(() => {
        const fetchConversations = async () => {
            try {
                const response = await AxiosInstance.get(
                    `/conversations/user/${currentUser?._id}`
                );
                setConversations(response.data);
            } catch (error) {
                console.error('Error fetching conversations:', error);
            }
        };

        fetchConversations();
    }, [currentUser?._id]);

    const handleSelectUser = async (user: any) => {
        setOpenModal(false);
        try {
            const response = await AxiosInstance.post('/conversations', {
                participants: [String(user._id), String(currentUser?._id)],
            });
            setConversations((prevConversations) => [...prevConversations, response.data]);
            onSelectConversation(response.data._id);
        } catch (error) {
            console.error('Error creating conversation:', error);
        }
    };

    const getConversationName = (conversation: any) => {
        const participant = conversation.participants.find(
            (participantId: string) => participantId !== currentUser?._id
        );
        const user = users.find((user: any) => user._id === participant);
        return `${user?.firstName} ${user?.lastName}`;
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
            <List sx={{ flexGrow: 1, overflowY: 'auto' }}>
                {conversations.map((conversation: any) => (
                    <ListItem
                        key={conversation._id}
                        button
                        onClick={() => onSelectConversation(conversation._id)}
                    >
                        <ListItemText
                            primary={getConversationName(conversation)}
                        />
                    </ListItem>
                ))}
            </List>
            <UserSearchModal
                open={openModal}
                onSelectUser={handleSelectUser}
                onClose={() => setOpenModal(false)}
            />
        </Box>
    );
};
