import React, { useState, useEffect } from 'react';
import { useChat } from '../context/ChatContext';
import { User } from '@/Pages/Chat/Interfaces/types';
import { List, ListItem, ListItemButton, ListItemText, CircularProgress, Typography, Box, TextField } from '@mui/material';
import AxiosInstance from '@/Helpers/Axios';
import styles from '@/Pages/Chat/styles/chat.module.css';

interface UserListProps {
  users: User[];
}

const UserList: React.FC<UserListProps> = ({ users }) => {
  const { setRecipientId, setMessages, senderId, fetchActiveChats, activeChats, setActiveChats } = useChat();  // <-- Include setActiveChats here
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>(''); // Search state

  // Fetch active chats on load
  useEffect(() => {
    const fetchInitialActiveChats = async () => {
      setLoading(true);
      await fetchActiveChats(); // Fetch only active chats on page load
      setLoading(false);
    };

    if (senderId) {
      fetchInitialActiveChats();
    }
  }, [senderId, fetchActiveChats]);

  // Fetch all users when search query is entered
  const fetchAllUsers = async () => {
    try {
      const response = await AxiosInstance.get('/users'); // Adjust API as needed
      setActiveChats(response.data); // Set the fetched users to the activeChats state
    } catch (error) {
      console.error('Error fetching all users:', error);
    }
  };

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.trim()) {
      // Fetch all users when there is a search query
      fetchAllUsers();
    } else {
      // If the search query is cleared, refetch only active chats
      fetchActiveChats();
    }
  };

  const handleSelectUser = async (userId: string) => {
    setRecipientId(userId); // Set the selected recipient
    setLoading(true); // Set loading to true when fetching starts
    setError(null); // Reset any previous errors

    try {
      const response = await AxiosInstance.get(`/messages/${senderId}/${userId}`);
      const fetchedMessages = response.data || [];
      setMessages(fetchedMessages); // Update the message list with fetched messages, or set an empty array
    } catch (error) {
      console.error('Error fetching messages:', error);
      setError('Failed to fetch messages. Please try again later.');
    } finally {
      setLoading(false); // Stop loading when the fetch is complete
    }
  };

  // Filter users based on the search query
  const filteredUsers = searchQuery
    ? users.filter((user: User) =>
        `${user.firstName} ${user.lastName}`.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : activeChats; // Show active chats if no search query

  return (
    <Box>
      {/* Search input for searching through all users */}
      <TextField
        fullWidth
        label="Search users..."
        variant="outlined"
        value={searchQuery}
        onChange={handleSearchChange} // Handle search input change
        className={styles.searchInput}
      />

      {/* Display active or filtered users */}
      <Typography variant="h6">Active Chats</Typography>
      <List className={styles.userList}>
        {loading ? (
          <Box className={styles.loadingContainer}>
            <CircularProgress />
          </Box>
        ) : filteredUsers.length === 0 ? (
          <Typography variant="body1">No active chats available.</Typography>
        ) : (
          filteredUsers.map((user: User) => (
            <ListItem key={user._id} disablePadding className={styles.userListItem}>
              <ListItemButton onClick={() => handleSelectUser(user._id)}>
                <ListItemText primary={`${user.firstName} ${user.lastName}`} />
              </ListItemButton>
            </ListItem>
          ))
        )}
      </List>

      {error && (
        <Typography color="error" variant="body2" className={styles.errorText}>
          {error}
        </Typography>
      )}
    </Box>
  );
};

export default UserList;
