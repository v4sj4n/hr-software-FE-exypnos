import { useEffect, useState, useContext } from 'react'
import { SocketContext } from '@/Pages/chat/context/SocketContext'
import AxiosInstance from '@/Helpers/Axios'

interface Message {
    _id: string
    conversationId: string
    text: string
    senderId: string
    createdAt: string
}

interface MessagesListProps {
    conversationId: string
}

export const MessagesList: React.FC<MessagesListProps> = ({
    conversationId,
}) => {
    const [messages, setMessages] = useState<Message[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)
    const socket = useContext(SocketContext)

    useEffect(() => {
        if (conversationId) {
            const fetchMessages = async () => {
                setLoading(true)
                setError(null)

                try {
                    const { data } = await AxiosInstance.get(
                        `/conversations/${conversationId}/messages`,
                    )

                    setMessages((prevMessages) => {
                        const newMessages = data.filter(
                            (message: Message) =>
                                !prevMessages.some(
                                    (prevMessage) =>
                                        prevMessage._id === message._id,
                                ),
                        )
                        return [...prevMessages, ...newMessages]
                    })

                    console.log('Messages fetched:', data)

                    if (data.length === 0) {
                        console.log('No messages in this conversation.')
                    }
                } catch (error) {
                    console.error('Error fetching messages:', error)
                    setError('Failed to fetch messages. Please try again.')
                } finally {
                    setLoading(false)
                }
            }

            fetchMessages()
        }
    }, [conversationId])

    useEffect(() => {
        if (socket && conversationId) {
            console.log(
                `Setting up socket listener for conversation: ${conversationId}`,
            )

            socket.emit('joinRoom', conversationId)

            const handleMessage = (newMessage: Message) => {
                console.log('Message received from socket:', newMessage)
                if (newMessage.conversationId === conversationId) {
                    setMessages((prevMessages) => {
                        const messageExists = prevMessages.some(
                            (message) => message._id === newMessage._id,
                        )
                        if (!messageExists) {
                            return [...prevMessages, newMessage]
                        }
                        return prevMessages
                    })
                }
            }

            socket.on('receiveMessage', handleMessage)

            return () => {
                console.log('Cleaning up socket listener')
                socket.off('receiveMessage', handleMessage)
            }
        }
    }, [socket, conversationId])

    return (
        <div>
            {loading ? (
                <p>Loading messages...</p>
            ) : error ? (
                <p>{error}</p>
            ) : messages.length > 0 ? (
                messages.map((message) => (
                    <div key={message._id}>
                        <p>{message.text}</p>
                        <small>
                            {new Date(message.createdAt).toLocaleTimeString()}
                        </small>
                    </div>
                ))
            ) : (
                <p>No messages in this conversation.</p>
            )}
        </div>
    )
}
