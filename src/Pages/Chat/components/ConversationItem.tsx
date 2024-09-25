import React from 'react';
import { ListItem, ListItemText } from '@mui/material';

interface ConversationItemProps {
  conversationId: string;
  participants: string[];
  onSelectConversation: (conversationId: string) => void;
}

const ConversationItem: React.FC<ConversationItemProps> = ({ conversationId, participants, onSelectConversation }) => {
  const handleSelect = () => {
    onSelectConversation(conversationId);
  };

  return (
    <ListItem button onClick={handleSelect}>
      <ListItemText primary={`Participants: ${participants.join(', ')}`} />
    </ListItem>
  );
};

export default ConversationItem;
