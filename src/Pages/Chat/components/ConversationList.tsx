import { List, ListItem, ListItemText } from '@mui/material';
import { ConversationListProps } from '../interfaces/chatInterfaces';

const ConversationList: React.FC<ConversationListProps> = ({ conversations, selectConversation }) => {
  return (
    <List>
      {conversations.map((conversation) => (
        <ListItem button key={conversation._id} onClick={() => selectConversation(conversation._id)}>
          <ListItemText primary={`Conversation with ${conversation.participants.join(', ')}`} />
        </ListItem>
      ))}
    </List>
  );
};

export default ConversationList;
