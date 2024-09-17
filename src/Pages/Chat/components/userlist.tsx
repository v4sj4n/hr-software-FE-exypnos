import React, { useState } from 'react';
import { useChat } from '../context/ChatContext';
import { User } from '@/Pages/Chat/Interfaces/types';
import { List, ListItem, ListItemButton, ListItemText, CircularProgress, Typography } from '@mui/material';
import AxiosInstance from '@/Helpers/Axios';
import { Box  } from '@mui/material'; // Add Box to the imports



interface UserListProps {
  users: User[];
}

const UserList: React.FC<UserListProps> = ({ users }) => {
  const { setRecipientId, setMessages, senderId } = useChat();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSelectUser = async (userId: string) => {
    console.log('Selected Recipient ID:', userId);  // Log recipientId
    console.log('Current Sender ID:', senderId);    // Log senderId

    setRecipientId(userId);  // Set the selected recipient
    setLoading(true);        // Set loading to true when fetching starts
    setError(null);          // Reset any previous errors

    try {
      const response = await AxiosInstance.get(`/messages/${senderId}/${userId}`);
      const messages = response.data;
      setMessages(messages);  // Update the message list with fetched messages
    } catch (error) {
      console.error('Error fetching messages:', error);
      setError('Failed to fetch messages. Please try again later.');
    } finally {
      setLoading(false);  // Stop loading when the fetch is complete
    }
  };

  return (
    <List>
      {users.length === 0 ? (
        <Typography variant="body1">No users available.</Typography>
      ) : (
        users.map((user) => (
          <ListItem key={user._id} disablePadding>
            <ListItemButton onClick={() => handleSelectUser(user._id)}>
              <ListItemText primary={`${user.firstName} ${user.lastName}`} />
            </ListItemButton>
          </ListItem>
        ))
      )}

      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
          <CircularProgress />
        </Box>
      )}

      {error && (
        <Typography color="error" variant="body2" sx={{ textAlign: 'center', marginTop: 2 }}>
          {error}
        </Typography>
      )}
    </List>
  );
};

export default UserList;
