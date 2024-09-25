import { useContext, useEffect, useState } from 'react'
import { SocketContext } from '../context/SocketContext'
import AxiosInstance from '@/Helpers/Axios'
import { Message } from '../Interfaces/types'

export const useGetAllMessages = ({
    conversationId,
}: {
    conversationId: string
}) => {
    const [messages, setMessages] = useState<Message[]>([])
    const socket = useContext(SocketContext)

    useEffect(() => {
        if (!conversationId) {
            console.log('No conversation ID provided, skipping fetch')
            return
        }

        console.log('Fetching messages for conversation ID:', conversationId)

        const fetchMessages = async () => {
            try {
                const { data } = await AxiosInstance.get(
                    `/conversations/${conversationId}/messages`
                )
                setMessages(data)
                console.log('Messages fetched:', data)
            } catch (error) {
                console.error('Error fetching messages:', error)
            }
        }

        fetchMessages()

        if (socket) {
            socket.on('message', (newMessage: Message) => {
                console.log('New message received:', newMessage)
                setMessages((prevMessages) => [...prevMessages, newMessage])
            })

            return () => {
                socket.off('message')
            }
        }
    }, [conversationId, socket])

    return { messages }
}
