import React, { useEffect, useRef } from 'react';
import { Typography, Box } from '@mui/material';
import { useChat } from '../context/ChatContext';
import styles from '@/Pages/Chat/styles/chat.module.css';

const MessageList: React.FC = () => {
  const { messages, senderId, recipientId } = useChat();
  const messageEndRef = useRef<null | HTMLDivElement>(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Filter messages between the current user (sender) and the selected recipient
  const filteredMessages = Array.isArray(messages)
    ? messages.filter(
        (msg) =>
          (msg.senderId === senderId && msg.recipientId === recipientId) ||
          (msg.senderId === recipientId && msg.recipientId === senderId)
      )
    : [];

  if (!recipientId) {
    return <Typography variant="body2">Select a chat to view messages.</Typography>;
  }

  if (filteredMessages.length === 0) {
    return <Typography variant="body2">No messages in this conversation.</Typography>;
  }

  return (
    <Box className={styles.messageListContainer}>
      {filteredMessages.map((msg, index) => (
        <Box
          key={index}
          className={`${styles.messageContainer} ${
            msg.senderId === senderId ? styles.senderContainer : styles.recipientContainer
          }`}
        >
          <Box
            className={`${styles.messageBox} ${
              msg.senderId === senderId ? styles.senderMessage : styles.recipientMessage
            }`}
          >
            <Typography variant="body1">{msg.message}</Typography>
            <Typography variant="caption" className={styles.messageTimestamp}>
              {msg.senderId === senderId ? 'You' : `User ${msg.senderId}`} - {/* Display time */}
              {new Date(msg.timestamp).toLocaleTimeString()}
            </Typography>
          </Box>
        </Box>
      ))}
      <div ref={messageEndRef} />
    </Box>
  );
};

export default MessageList;
