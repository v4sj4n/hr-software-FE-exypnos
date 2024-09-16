import React from 'react';
import { useChatLogic } from '@/Pages/Chat/Hooks/useChat';
import { useChat } from '@/Pages/Chat/context/ChatContext';
import ChatInput from '@/Pages/Chat/components/chatinput';
import MessageList from '@/Pages/Chat/components/messagelist';
import UserList from '@/Pages/Chat/components/userlist';
import '../../Pages/chat/styles/chat.module.css';  // Adjusted path to styles

const Chat: React.FC = () => {
  const { users, recipientId, setRecipientId, messages, newMessage, setNewMessage } = useChat();
  const { handleSendMessage } = useChatLogic();
  
  return (
    <div className="chatContainer">x
      <h2>Chat</h2>

      {/* User List to Select Recipient */}
      <UserList users={users} recipientId={recipientId} setRecipientId={setRecipientId} />

      {/* Message List */}
      <MessageList messages={messages} />

      {/* Input Field for Chat Messages */}
      <ChatInput newMessage={newMessage} setNewMessage={setNewMessage} handleSendMessage={handleSendMessage} />
    </div>
  );
};

export default Chat;
