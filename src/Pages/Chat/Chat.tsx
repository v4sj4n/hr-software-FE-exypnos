import { useContext } from 'react'
import { MessagesList } from '@/Pages/chat/components/MessagesList'
import { ChatContext } from '@/Pages/chat/context/ChatContext'
import { UserList } from '@/Pages/chat/components/userlist'
import { ChatInput } from '@/Pages/chat/components/chatinput'

const Chat = () => {
    const chatContext = useContext(ChatContext)

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
