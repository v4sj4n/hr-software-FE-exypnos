import React, { useMemo, useState, useEffect } from 'react'
import { useChat } from '../context/ChatContext'
import { User } from '@/Pages/Chat/Interfaces/types'
import {
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Typography,
    Box,
    TextField,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
} from '@mui/material'
import AxiosInstance from '@/Helpers/Axios'
import { io, Socket } from 'socket.io-client'
import styles from '@/Pages/Chat/styles/chat.module.css'
import AddIcon from '@mui/icons-material/Add'
import { Loader } from '@/Components/Loader/Loader'

interface UserListProps {
    users: User[]
}

const UserList: React.FC<UserListProps> = ({ users }) => {
    const { setRecipientId, setMessages, senderId } = useChat()
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)
    const [searchActiveChatsQuery, setSearchActiveChatsQuery] =
        useState<string>('')
    const [searchUsersQuery, setSearchUsersQuery] = useState<string>('')
    const [activeUserIds, setActiveUserIds] = useState<string[]>([])
    const [socket, setSocket] = useState<Socket | null>(null)
    const [selectedChatId, setSelectedChatId] = useState<string | null>(null)
    const [open, setOpen] = useState(false)

    useEffect(() => {
        const newSocket = io('http://localhost:3000') // Adjust the URL as per your backend setup
        setSocket(newSocket)

        // Clean up the socket when the component unmounts
        return () => {
            newSocket.close()
        }
    }, [])

    useEffect(() => {
        if (socket) {
            socket.on('newMessage', (message) => {
                if (message.recipientId === senderId) {
                    const sender = users.find(
                        (user) => user._id === message.senderId,
                    )
                    if (sender) {
                        console.log(
                            'Sender found:',
                            sender.firstName,
                            sender.lastName,
                        )
                    } else {
                        console.log('Sender not found in users array')
                    }

                    setActiveUserIds((prevActiveUserIds) => {
                        const newActiveUserIds = new Set(prevActiveUserIds)
                        newActiveUserIds.add(message.senderId)
                        console.log(
                            'Active chats after update:',
                            Array.from(newActiveUserIds),
                        )
                        return Array.from(newActiveUserIds)
                    })
                }
            })

            return () => {
                socket.off('newMessage')
            }
        }
    }, [socket, senderId, users])

    useEffect(() => {
        const fetchActiveChats = async () => {
            try {
                setLoading(true)
                const response = await AxiosInstance.get(
                    `/messages/sender/${senderId}`,
                )
                const messages = response.data

                const uniqueUserIds = new Set<string>()
                messages.forEach(
                    (msg: { senderId: string; recipientId: string }) => {
                        if (msg.senderId !== senderId) {
                            uniqueUserIds.add(msg.senderId)
                        } else {
                            uniqueUserIds.add(msg.recipientId)
                        }
                    },
                )

                const activeUserIdsArray = Array.from(uniqueUserIds)
                setActiveUserIds(activeUserIdsArray)

                for (const userId of activeUserIdsArray) {
                    const chatMessagesResponse = await AxiosInstance.get(
                        `/messages/${senderId}/${userId}`,
                    )
                    setMessages((prevMessages) => ({
                        ...prevMessages,
                        [userId]: chatMessagesResponse.data,
                    }))
                }
            } catch (error) {
                console.error(
                    'Error fetching active chats and messages:',
                    error,
                )
                setError('Failed to fetch active chats. Please try again.')
            } finally {
                setLoading(false)
            }
        }

        if (senderId) {
            fetchActiveChats()
        }
    }, [senderId])

    const filteredActiveUsers = useMemo(() => {
        const activeUsers = users.filter((user) =>
            activeUserIds.includes(user._id),
        )
        console.log('Filtered active users:', activeUsers) // Log the filtered active users

        if (searchActiveChatsQuery.trim()) {
            return activeUsers.filter((user) =>
                `${user.firstName.toLowerCase()} ${user.lastName.toLowerCase()}`.includes(
                    searchActiveChatsQuery.toLowerCase(),
                ),
            )
        }

        return activeUsers
    }, [searchActiveChatsQuery, users, activeUserIds])

    const filteredAllUsers = useMemo(() => {
        if (searchUsersQuery.trim()) {
            return users.filter((user) =>
                `${user.firstName.toLowerCase()} ${user.lastName.toLowerCase()}`.includes(
                    searchUsersQuery.toLowerCase(),
                ),
            )
        }

        return []
    }, [searchUsersQuery, users])

    const handleSelectUser = async (userId: string) => {
        console.log('Selected Recipient ID:', userId)
        setRecipientId(userId)
        setSelectedChatId(userId) // Set the selected chat ID
        setLoading(true)
        setError(null)

        try {
            const response = await AxiosInstance.get(
                `/messages/${senderId}/${userId}`,
            )
            setMessages(response.data)

            setActiveUserIds((prevActiveUserIds) => {
                const newActiveUserIds = new Set(prevActiveUserIds)
                newActiveUserIds.add(userId)
                return Array.from(newActiveUserIds)
            })
        } catch (error) {
            console.error('Error fetching messages:', error)
            setError('Failed to fetch messages. Please try again later.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <Box className={styles.chatSidebar}>
            <Box display="flex" alignItems="center" gap={2}>
                <TextField
                    fullWidth
                    label="Search active chats..."
                    variant="outlined"
                    value={searchActiveChatsQuery}
                    onChange={(e) => setSearchActiveChatsQuery(e.target.value)}
                    className={styles.searchInput}
                />
                <button
                    className={styles.addChatButton}
                    onClick={() => setOpen(true)}
                >
                    <AddIcon className={styles.addIcon} />
                </button>
            </Box>

            <Typography variant="h6" marginTop={2}>
                Active Chats
            </Typography>
            <List className={styles.userList}>
                {filteredActiveUsers.length === 0 ? (
                    <Typography variant="body1">
                        No active chats available.
                    </Typography>
                ) : (
                    filteredActiveUsers.map((user) => (
                        <ListItem
                            key={user._id}
                            disablePadding
                            className={`${styles.userListItem} ${
                                selectedChatId === user._id
                                    ? styles.selectedChat
                                    : ''
                            }`}
                        >
                            <ListItemButton
                                onClick={() => handleSelectUser(user._id)}
                            >
                                <ListItemText
                                    primary={`${user.firstName} ${user.lastName}`}
                                />
                            </ListItemButton>
                        </ListItem>
                    ))
                )}
            </List>

            <Dialog open={open} onClose={() => setOpen(false)} maxWidth="md">
                <DialogTitle>Search All Users</DialogTitle>
                <DialogContent
                    sx={{
                        color: 'black',
                        minHeight: '400px',
                        maxHeight: '600px',
                        maxWidth: '600px',
                        minWidth: '600px',
                    }}
                >
                    <TextField
                        fullWidth
                        label="Search all users..."
                        variant="outlined"
                        value={searchUsersQuery}
                        onChange={(e) => setSearchUsersQuery(e.target.value)}
                        className={styles.searchInput}
                        sx={{ marginTop: '16px' }}
                    />
                    <List className={styles.userList}>
                        {filteredAllUsers.length === 0 ? (
                            <Typography variant="body1">
                                No users found.
                            </Typography>
                        ) : (
                            filteredAllUsers.map((user) => (
                                <ListItem
                                    key={user._id}
                                    disablePadding
                                    className={styles.userListItem}
                                >
                                    <ListItemButton
                                        onClick={() => {
                                            handleSelectUser(user._id)
                                            setOpen(false)
                                        }}
                                    >
                                        <ListItemText
                                            primary={`${user.firstName} ${user.lastName}`}
                                        />
                                    </ListItemButton>
                                </ListItem>
                            ))
                        )}
                    </List>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)}>Close</Button>
                </DialogActions>
            </Dialog>

            {loading && <Loader />}

            {error && (
                <Typography
                    color="error"
                    variant="body2"
                    className={styles.errorText}
                >
                    {error}
                </Typography>
            )}
        </Box>
    )
}

export default UserList
