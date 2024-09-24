import React, { useEffect } from 'react'
import { User } from '@/Pages/Chat/Interfaces/types'
import { ChatProvider, useChat } from './context/ChatContext'
import AxiosInstance from '@/Helpers/Axios'
import { Box, Typography } from '@mui/material'
import UserList from './components/userlist'
import MessageList from './components/messagelist'
import SendMessage from './components/chatinput'
import { SocketProvider } from './context/SocketContext'

const Chat: React.FC = () => {
    const { users, setUsers } = useChat()

    // Fetch users from the backend
    useEffect(() => {
        const fetchUsers = async () => {
            const response = await AxiosInstance('/user')
            const data: User[] = await response.data
            setUsers(data)
        }
        fetchUsers()
    }, [setUsers])

    return (
        <Box sx={{ padding: 2 }}>
            <Box sx={{ display: 'flex', gap: 2 }}>
                <Box sx={{ width: '30%' }}>
                    <UserList users={users} />
                </Box>

                <Box
                    sx={{
                        width: '70%',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2,
                    }}
                >
                    <Box sx={{ flexGrow: 1, overflowY: 'auto' }}>
                        <MessageList />
                        <SendMessage />
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

const ChatWithProviders: React.FC = () => {
    return (
        <SocketProvider>
            <ChatProvider>
                <Chat />
            </ChatProvider>
        </SocketProvider>
    )
}

export default ChatWithProviders
