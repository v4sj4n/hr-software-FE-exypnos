import { useState, useEffect } from 'react'
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
import { useGetAllUsers } from '@/Pages/Employees/Hook'
import { useAuth } from '@/ProtectedRoute/Context/AuthContext'
import { UserProfileData } from '@/Pages/Employees/interfaces/Employe'

interface UserSearchModalProps {
    open: boolean
    onSelectUser: (user: any, message: string) => Promise<void>
    onClose: () => void
}

export const UserSearchModal = ({
    open,
    onSelectUser,
    onClose,
}: UserSearchModalProps) => {
    const [search, setSearch] = useState('')
    const [filteredUsers, setFilteredUsers] = useState<any[]>([])
    const [message, setMessage] = useState('')
    const { data: users = [] } = useGetAllUsers()
    const { currentUser } = useAuth()

    useEffect(() => {
        if (!search) {
            setFilteredUsers([])
            return
        }

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
    }, [search, currentUser?._id])

    const handleListItemClick = async (user: any) => {
        if (message.trim()) {
            await onSelectUser(user, message)
            setMessage('')
            onClose()
        } else {
            console.error('Message cannot be empty.')
        }
    }

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>Search Users</DialogTitle>
            <DialogContent>
                <TextField
                    fullWidth
                    label="Search for a user"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    autoFocus
                />
                {search && filteredUsers.length === 0 && (
                    <CircularProgress
                        style={{ display: 'block', margin: '20px auto' }}
                    />
                )}
                <List>
                    {filteredUsers.map((user) => (
                        <ListItem
                            key={user._id}
                            button
                            onClick={() => handleListItemClick(user)}
                            disableTouchRipple
                            style={{ zIndex: 1 }}
                        >
                            <ListItemText
                                primary={`${user.firstName} ${user.lastName}`}
                            />
                        </ListItem>
                    ))}
                </List>
                <TextField
                    fullWidth
                    label="Message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    margin="normal"
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button
                    onClick={() => handleListItemClick(filteredUsers[0])}
                    disabled={!message.trim()}
                >
                    Send Message
                </Button>
            </DialogActions>
        </Dialog>
    )
}
