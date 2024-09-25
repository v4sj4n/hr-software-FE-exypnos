import React from 'react';
import ConversationList from './components/ConversationList';
import ChatWindow from './components/ChatWindow';

import useChat from './hooks/useChat';

const Chat: React.FC = () => {
  const { conversations, messages, selectedConversation, selectConversation, sendMessage } = useChat();

  return (
    <div style={{ display: 'flex' }}>
      <ConversationList 
        conversations={conversations} 
        selectConversation={selectConversation} 
      />
      {selectedConversation && (
        <ChatWindow 
          messages={messages} 
          sendMessage={sendMessage} 
        />
      )}
      <NewConversationModal />
    </div>
  );
};

export default Chat;
