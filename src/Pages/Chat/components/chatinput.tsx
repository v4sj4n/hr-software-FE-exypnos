import React, { useState } from 'react'
import { useChat } from '../context/ChatContext'
import { Box, TextField, IconButton, InputAdornment } from '@mui/material'
import {
    Send as SendIcon,
    AttachFile as AttachFileIcon,
} from '@mui/icons-material'
import { useSocket } from '../context/SocketContext'
import AxiosInstance from '@/Helpers/Axios'

const API_URL = import.meta.env.VITE_API_URL

const SendMessage: React.FC = () => {
    const [message, setMessage] = useState('')
    const { senderId, recipientId, setMessages } = useChat()
    const socket = useSocket()

    console.log('Current Sender ID:', senderId)
    console.log('Current Recipient ID:', recipientId)

    function getAuthToken(): string | null {
        return localStorage.getItem('access_token')
    }

    const sendMessageToAPI = async (
        message: string,
        senderId: string,
        recipientId: string,
    ) => {
        try {
            const token = getAuthToken()
            const response = await fetch(`${API_URL}/messages`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    message,
                    senderId,
                    recipientId,
                }),
            })

            if (!response.ok) {
                throw new Error('Failed to send message')
            }

            const data = await response.json()
            setMessages((prevMessages) => [...prevMessages, data])
            return data
        } catch (error) {
            console.error('Error sending message:', (error as Error).message)
        }
    }

    const fetchMessages = async () => {
        try {
            const response = await AxiosInstance.get(
                `/messages/${senderId}/${recipientId}`,
            )
            const fetchedMessages = response.data || []
            setMessages(fetchedMessages)
        } catch (error) {
            console.error('Error fetching messages:', error)
            setMessages([])
        }
    }

    const handleSendMessage = async () => {
        console.log('Sending message:', message)
        if (!senderId || !recipientId || !message.trim()) {
            console.error(
                'Sender or recipient ID is missing or message is empty.',
            )
            return
        }

        const messageData = {
            senderId,
            recipientId,
            message,
            timestamp: new Date().toISOString(),
        }

        socket.emit('sendMessage', messageData)

        setMessages((prevMessages) =>
            Array.isArray(prevMessages)
                ? [...prevMessages, messageData]
                : [messageData],
        )

        await sendMessageToAPI(message, senderId, recipientId)

        await fetchMessages()

        console.log('Message sent:', message)

        setMessage('')
    }

    return (
        <Box
            sx={{
                display: 'flex',
                gap: 1.5,
                alignItems: 'center',
                marginTop: 2,
            }}
        >
            <TextField
                fullWidth
                label="Type a message..."
                variant="outlined"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault()
                        handleSendMessage()
                    }
                }}
                InputProps={{
                    sx: {
                        borderRadius: '20px',
                        paddingRight: '8px',
                    },
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton color="primary">
                                <AttachFileIcon />
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
            />

            <IconButton
                color="primary"
                onClick={handleSendMessage}
                sx={{
                    backgroundColor: 'primary.main',
                    borderRadius: '50%',
                    padding: '12px',
                    '&:hover': {
                        backgroundColor: 'primary.dark',
                    },
                }}
            >
                <SendIcon sx={{ color: '#fff' }} />
            </IconButton>
        </Box>
    )
}

export default SendMessage
