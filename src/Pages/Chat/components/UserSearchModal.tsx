import { useState, useEffect } from 'react'
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    CircularProgress,
    Autocomplete,
    Box,
    Typography,
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
    const [filteredUsers, setFilteredUsers] = useState<UserProfileData[]>([])
    const [selectedUser, setSelectedUser] = useState<UserProfileData | null>(
        null,
    )
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
                ...user,
                name: `${user.firstName} ${user.lastName}`,
            }))

        setFilteredUsers(filtered)
    }, [search, currentUser?._id])

    const handleSendClick = async () => {
        if (selectedUser && message.trim()) {
            await onSelectUser(selectedUser, message)
            setMessage('')
            setSelectedUser(null)
            onClose()
        }
    }

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>Select a User & Send a Message</DialogTitle>
            <DialogContent>
                <Box mb={2}>
                    <Autocomplete
                        options={filteredUsers}
                        getOptionLabel={(user) =>
                            `${user.firstName} ${user.lastName}` || ''
                        }
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Search for a user"
                                variant="outlined"
                                onChange={(e) => setSearch(e.target.value)}
                                autoFocus
                            />
                        )}
                        onChange={(event, newValue) =>
                            setSelectedUser(newValue)
                        }
                        isOptionEqualToValue={(option, value) =>
                            option._id === value._id
                        }
                    />
                    {search && filteredUsers.length === 0 && (
                        <Box display="flex" justifyContent="center" mt={2}>
                            <CircularProgress />
                        </Box>
                    )}
                </Box>

                <Box mb={2}>
                    <TextField
                        fullWidth
                        label="Message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        variant="outlined"
                    />
                </Box>

                {selectedUser && (
                    <Box mb={2}>
                        <Typography variant="body2">
                            Selected User: {selectedUser.firstName}{' '}
                            {selectedUser.lastName}
                        </Typography>
                    </Box>
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="secondary">
                    Cancel
                </Button>
                <Button
                    onClick={handleSendClick}
                    color="primary"
                    disabled={!selectedUser || !message.trim()}
                >
                    Send Message
                </Button>
            </DialogActions>
        </Dialog>
    )
}
