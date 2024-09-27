import { useState, useContext } from 'react'
import { useAuth } from '@/ProtectedRoute/Context/AuthContext'
import { SocketContext } from '@/Pages/chat/context/SocketContext'
import styles from '@/Pages/chat/styles/chat.module.css'

interface ChatInputProps {
    conversationId: string
}

export const ChatInput: React.FC<ChatInputProps> = ({ conversationId }) => {
    const [message, setMessage] = useState<string>('')
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState<boolean>(false)
    const socket = useContext(SocketContext)
    const { currentUser } = useAuth()

    const sendMessage = async () => {
        if (message.trim()) {
            if (socket?.connected) {
                const newMessage = {
                    conversationId,
                    text: message,
                    senderId: currentUser?._id,
                }

                try {
                    setLoading(true)
                    setError(null)

                    socket.emit('sendMessage', newMessage, (ack: any) => {
                        if (ack.status === 'ok') {
                            console.log('Message sent successfully')
                            setMessage('')
                        } else {
                            console.error('Failed to send message:', ack.error)
                            setError(
                                'Failed to send message. Please try again.',
                            )
                        }
                    })
                } catch (error: any) {
                    console.error('Send message error:', error)
                    setError('Failed to send message. Please try again.')
                } finally {
                    setLoading(false)
                }
            } else {
                setError('Socket is not connected. Unable to send message.')
            }
        } else {
            setError('Message cannot be empty.')
        }
    }

    // const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    //     if (e.key === 'Enter' && !loading) {
    //         sendMessage()
    //     }
    // }

    return (
        <div className={styles.chatInputContainer}>
            <form
                className={styles.inputWrapper}
                onSubmit={(e) => {
                    e.preventDefault()
                    if (!loading) sendMessage()
                }}
            >
                <input
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type a message"
                    disabled={loading}
                    className={styles.chatInput}
                />
                <button
                    type="submit"
                    disabled={loading}
                    className={`${styles.sendButton} ${loading ? styles.sendButtonDisabled : ''}`}
                >
                    {loading ? 'Sending...' : 'Send'}
                </button>
            </form>
            {error && <p className={styles.errorMessage}>{error}</p>}
        </div>
    )
}
