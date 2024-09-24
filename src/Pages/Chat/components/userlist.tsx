import { useEffect, useState } from 'react'
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    List,
    ListItem,
    ListItemText,
    CircularProgress,
} from '@mui/material'
import { User } from '@/ProtectedRoute/Interface/Interface'
import { useGetAllUsers } from '@/Pages/Employees/Hook'
import AxiosInstance from '@/Helpers/Axios'
import { useAuth } from '@/ProtectedRoute/Context/AuthContext'
import { UserProfileData } from '@/Pages/Employees/interfaces/Employe'

export const UserList = ({ onSelectConversation }: any) => {
    const [conversations, setConversations] = useState<any[]>([]);
    const [search, setSearch] = useState('')
    const [openModal, setOpenModal] = useState(false)
    const { currentUser } = useAuth()

    useEffect(() => {
        const fetchConversations = async () => {
            try {
                const response = await AxiosInstance.get(`/conversations/${currentUser?._id}`);
                setConversations(response.data);
            } catch (error) {
                console.error('Error fetching conversations:', error);
            }
        };
    
        fetchConversations();
    }, []);

    const handleSelectUser = async (user: any) => {
        setOpenModal(false)

        try {
            const response = await AxiosInstance.post('/conversations', {
                participants: [user._id, currentUser?._id],
            })

            setConversations([...conversations, response.data])
            onSelectConversation(response.data._id)
        } catch (error) {
            console.error('Error creating conversation:', error)
        }
    }

    // const filteredConversations = conversations?.filter((conversation: any) =>
    //     conversation.participants.toLowerCase().includes(search.toLowerCase()),
    // )

    return (
        <div>
            <TextField
                fullWidth
                label="Search conversations"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <Button variant="contained" onClick={() => setOpenModal(true)}>
                +
            </Button>
            <List>
                {conversations.map((conversation: any) => (
                    <ListItem
                        button
                        key={conversation._id}
                        onClick={() => onSelectConversation(conversation._id)}
                    >
                        <ListItemText
                            primary={conversation.participants
                                .filter((id: string) => id !== currentUser?._id)
                                .join(', ')}
                        />
                    </ListItem>
                ))}
            </List>
            {/* User Search Modal */}
            <UserSearchModal
                open={openModal}
                onSelectUser={handleSelectUser}
                onClose={() => setOpenModal(false)}
            />
        </div>
    )
}

interface UserSearchModalProps {
    open: boolean
    onSelectUser: (user: User) => void
    onClose: () => void
}

const UserSearchModal = ({
    open,
    onSelectUser,
    onClose,
}: UserSearchModalProps) => {
    const [search, setSearch] = useState('')
    const [loading, setLoading] = useState(false)
    const [filteredUsers, setFilteredUsers] = useState<User[]>([])
    const { data: users = [] } = useGetAllUsers()
    const { currentUser } = useAuth()

    useEffect(() => {
        setLoading(true)

        if (search) {
            const filtered = users
                .filter(
                    (user: UserProfileData) =>
                        user._id.toString() !== currentUser?._id?.toString() &&
                        `${user.firstName} ${user.lastName}`
                            .toLowerCase()
                            .includes(search.toLowerCase()),
                )
                .map((user: UserProfileData) => ({
                    _id: user._id.toString(),
                    email: user.auth.email,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    name: `${user.firstName} ${user.lastName}`,
                    phone: user.phone,
                    imageUrl: user.imageUrl,
                    role: '',
                }))
            setFilteredUsers(filtered)
        } else {
            setFilteredUsers([])
        }

        setLoading(false)
    }, [search, users, currentUser?._id])

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>Search Users</DialogTitle>
            <DialogContent>
                <TextField
                    fullWidth
                    label="Search for a user"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                {loading ? (
                    <CircularProgress
                        style={{ display: 'block', margin: '20px auto' }}
                    />
                ) : (
                    <List>
                        {filteredUsers.map((user) => (
                            <ListItem
                                button
                                key={user._id}
                                onClick={() => onSelectUser(user)}
                            >
                                <ListItemText
                                    primary={`${user.firstName} ${user.lastName}`}
                                />
                            </ListItem>
                        ))}
                    </List>
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
            </DialogActions>
        </Dialog>
    )
}

export default UserSearchModal
