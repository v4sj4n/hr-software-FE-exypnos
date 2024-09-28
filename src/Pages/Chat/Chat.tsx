import { useContext } from 'react'
import { MessagesList } from '@/Pages/Chat/components/MessagesList'
import { ChatContext } from '@/Pages/Chat/context/ChatContext'
import { UserList } from '@/Pages/Chat/components/UserList'
import { ChatInput } from '@/Pages/Chat/components/ChatInput'

const Chat = () => {
    const chatContext = useContext(ChatContext)

    // Check if the context is null
    if (!chatContext) {
        return <div>Loading...</div>
    }

    const { selectedConversation, setSelectedConversation } = chatContext

    return (
        <div style={{ display: 'flex' }}>
            <UserList onSelectConversation={setSelectedConversation} />
            {selectedConversation && (
                <div>
                    <MessagesList conversationId={selectedConversation} />
                    <ChatInput conversationId={selectedConversation} />
                </div>
            )}
        </div>
    )
}

export default Chat
