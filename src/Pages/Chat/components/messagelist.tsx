import React from 'react';
import { Message } from '@/Pages/Chat/Interfaces/types';

interface MessageListProps {
  messages: Message[];
}

const MessageList: React.FC<MessageListProps> = ({ messages }) => {
  return (
    <div>
      {messages.map((msg, index) => (
        <p key={index}>
          {msg.senderId === 'logged-in-user-id' ? 'Me' : 'Them'}: {msg.message}
        </p>
      ))}
    </div>
  );
};

export default MessageList;
