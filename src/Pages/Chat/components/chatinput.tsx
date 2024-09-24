import { useState, useContext } from 'react'
import { SocketContext } from '../context/SocketContext'
import { useAuth } from '@/ProtectedRoute/Context/AuthContext'

export const ChatInput = ({ conversationId }: { conversationId: string }) => {
    const [message, setMessage] = useState('')
    const { socket } = useContext(SocketContext) // Ensure socket is not null
    const { currentUser } = useAuth() // Properly get currentUser

    const sendMessage = () => {
        if (socket && message.trim()) {
            // Check if socket exists
            socket.emit('message', {
                conversationId,
                text: message,
                senderId: currentUser?._id,
            })
            setMessage('')
        }
    }

    return (
        <div>
            <input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message"
            />
            <button onClick={sendMessage}>Send</button>
        </div>
    )
}
