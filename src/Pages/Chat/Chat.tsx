import { useContext } from 'react'
import { MessagesList } from '@/Pages/chat/components/MessagesList'
import { ChatContext } from '@/Pages/chat/context/ChatContext'
import { UserList } from '@/Pages/chat/components/UserList'
import { ChatInput } from '@/Pages/chat/components/ChatInput'

const Chat = () => {
    const chatContext = useContext(ChatContext)

    // Check if the context is null
    if (!chatContext) {
        return <div>Loading...</div> // or handle it in any other appropriate way
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
