import React from 'react';
import { Message } from '@/Pages/Chat/Interfaces/types';
import { Box, Typography } from '@mui/material';
import { useChat } from '../context/ChatContext';

interface MessageListProps {
  messages: Message[];
}

const MessageList: React.FC<MessageListProps> = () => {
  const { messages, senderId } = useChat(); // Get the messages from context

  return (
    <Box sx={{ padding: 2 }}>
      {messages.map((msg, index) => (
        <Box
          key={index}
          sx={{
            display: 'flex',
            justifyContent: msg.senderId === senderId ? 'flex-end' : 'flex-start',
            marginBottom: 2,
          }}
        >
          <Box
            sx={{
              maxWidth: '60%',
              backgroundColor: msg.senderId === senderId ? '#2196f3' : '#e0e0e0',
              color: msg.senderId === senderId ? '#fff' : '#000',
              padding: '10px',
              borderRadius: '10px',
            }}
          >
            <Typography variant="body1">{msg.message}</Typography>
            <Typography variant="caption" sx={{ fontSize: '0.75rem' }}>
              {msg.senderId === senderId ? 'You' : `User ${msg.senderId}`}
            </Typography>
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default MessageList;
