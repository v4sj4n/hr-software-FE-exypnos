import { useState, useContext } from 'react'
import AxiosInstance from '@/Helpers/Axios'
import { useAuth } from '@/ProtectedRoute/Context/AuthContext'
import { SocketContext } from '@/Pages/chat/context/SocketContext'

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
                    // Optionally include a temporary ID or timestamp if needed
                }

                try {
                    setLoading(true)
                    setError(null)

                    // Emit the message to the server via socket
                    socket.emit('sendMessage', newMessage)
                    console.log('Message sent via socket:', newMessage)

                    setMessage('')
                } catch (error: any) {
                    console.error('Error sending message:', error)
                    setError('Failed to send message. Please try again.')
                } finally {
                    setLoading(false)
                }
            } else {
                setError('Socket is not connected. Unable to send message.')
                console.error('Socket is not connected, cannot send message')
            }
        } else {
            setError('Message cannot be empty.')
        }
    }

    return (
        <div>
            <input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message"
                disabled={loading}
            />
            <button onClick={sendMessage} disabled={loading}>
                {loading ? 'Sending...' : 'Send'}
            </button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    )
}
