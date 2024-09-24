import React, { useEffect, useRef } from 'react'
import { Typography, Box } from '@mui/material'
import { useChat } from '../context/ChatContext'
import styles from '@/Pages/Chat/styles/chat.module.css'

const MessageList: React.FC = () => {
    const { messages, senderId, recipientId, users } = useChat()
    const messageEndRef = useRef<null | HTMLDivElement>(null)

    useEffect(() => {
        messageEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [messages])

    const filteredMessages = Array.isArray(messages)
        ? messages.filter(
              (msg) =>
                  (msg.senderId === senderId &&
                      msg.recipientId === recipientId) ||
                  (msg.senderId === recipientId &&
                      msg.recipientId === senderId),
          )
        : []

    if (!recipientId) {
        return (
            <Typography variant="body2">
                Select a chat to view messages.
            </Typography>
        )
    }

    if (filteredMessages.length === 0) {
        return (
            <Typography variant="body2">
                No messages in this conversation.
            </Typography>
        )
    }

    const getUserFullName = (userId: string) => {
        const user = users.find((u) => u._id === userId)
        return user ? `${user.firstName} ${user.lastName}` : `User ${userId}`
    }

    return (
        <Box className={styles.messageListContainer}>
            {filteredMessages.map((msg, index) => (
                <Box
                    key={index}
                    className={`${styles.messageContainer} ${
                        msg.senderId === senderId
                            ? styles.senderContainer
                            : styles.recipientContainer
                    }`}
                >
                    <Box
                        className={`${styles.messageBox} ${
                            msg.senderId === senderId
                                ? styles.senderMessage
                                : styles.recipientMessage
                        }`}
                    >
                        <Typography variant="body1" gutterBottom>
                            {msg.message}
                        </Typography>
                        <Typography
                            variant="caption"
                            className={styles.messageTimestamp}
                        >
                            {msg.senderId === senderId
                                ? 'You'
                                : getUserFullName(msg.senderId)}{' '}
                            - {''}
                            {new Date(msg.timestamp).toLocaleTimeString([], {
                                hour: '2-digit',
                                minute: '2-digit',
                            })}
                        </Typography>
                    </Box>
                </Box>
            ))}
            <div ref={messageEndRef} />
        </Box>
    )
}

export default MessageList
