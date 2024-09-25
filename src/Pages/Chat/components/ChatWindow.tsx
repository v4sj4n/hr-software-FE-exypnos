import React from 'react';
import { List, ListItem, ListItemText } from '@mui/material';
import MessageInput from './MessageInput';

interface ChatWindowProps {
  messages: { content: string; sender: string }[];
  sendMessage: (message: string) => void;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ messages, sendMessage }) => {
  return (
    <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
      <List style={{ flexGrow: 1, overflowY: 'auto' }}>
        {messages.map((message, index) => (
          <ListItem key={index}>
            <ListItemText primary={message.content} secondary={`Sent by ${message.sender}`} />
          </ListItem>
        ))}
      </List>
      <MessageInput onSendMessage={sendMessage} />
    </div>
  );
};

export default ChatWindow;
