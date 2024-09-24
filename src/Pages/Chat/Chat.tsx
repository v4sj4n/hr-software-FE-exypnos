import { useContext } from 'react'
import { MessagesList } from './components/MessagesList'
import { ChatContext } from './context/ChatContext'
import { UserList } from './components/userlist'
import { ChatInput } from './components/chatinput'

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
