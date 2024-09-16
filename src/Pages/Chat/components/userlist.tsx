import { useChat } from '../context/ChatContext';
import { User } from '@/Pages/Chat/Interfaces/types';
import { List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import AxiosInstance from '@/Helpers/Axios';

interface UserListProps {
  users: User[];
}

const UserList: React.FC<UserListProps> = ({ users }) => {
  const { setRecipientId, setMessages, senderId } = useChat();

  const handleSelectUser = async (userId: string) => {
    console.log('Selected Recipient ID:', userId);  // Log recipientId
    console.log('Current Sender ID:', senderId);  // Log senderId

    setRecipientId(userId); // Set the selected recipient

    try {
      const response = await AxiosInstance.get(`/messages/${senderId}/${userId}`);
      const messages = response.data;
      setMessages(messages); // Set the fetched messages into the state
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  return (
    <List>
      {users.map((user) => (
        <ListItem key={user._id} disablePadding>
          <ListItemButton onClick={() => handleSelectUser(user._id)}>
            <ListItemText primary={`${user.firstName} ${user.lastName}`} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
};

export default UserList;
