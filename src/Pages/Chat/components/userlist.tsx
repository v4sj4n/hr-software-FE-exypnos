import React, { useMemo, useState, useEffect } from 'react';
import { useChat } from '../context/ChatContext';
import { User } from '@/Pages/Chat/Interfaces/types';
import { List, ListItem, ListItemButton, ListItemText, CircularProgress, Typography, Box, TextField } from '@mui/material';
import AxiosInstance from '@/Helpers/Axios';
import styles from '@/Pages/Chat/styles/chat.module.css';

interface UserListProps {
  users: User[];
}

const UserList: React.FC<UserListProps> = ({ users }) => {
  const { messages, setRecipientId, setMessages, senderId } = useChat();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>(''); // Search state

  // Fetch initial messages to populate active chats
  useEffect(() => {
    const fetchInitialMessages = async () => {
      try {
        const response = await AxiosInstance.get(`/messages/${senderId}`);
        setMessages(response.data);
      } catch (error) {
        console.error('Error fetching initial messages:', error);
      }
    };

    if (senderId) {
      fetchInitialMessages();
    }
  }, [senderId, setMessages]);

  // Memoize to get unique userIds from messages (active chats)
  const activeUserIds = useMemo(() => {
    const uniqueUserIds = new Set<string>();

    // Safeguard to ensure messages is always an array
    if (Array.isArray(messages)) {
      messages.forEach((msg) => {
        if (msg.senderId !== senderId) {
          uniqueUserIds.add(msg.senderId);
        } else {
          uniqueUserIds.add(msg.recipientId);
        }
      });
    }

    console.log('Active User IDs:', Array.from(uniqueUserIds)); // Log active user IDs for debugging

    return Array.from(uniqueUserIds);
  }, [messages, senderId]);

  // If no messages, show all users instead of filtering by active chats
  const activeUsers = messages.length === 0
    ? users
    : users.filter((user) => activeUserIds.includes(user._id));

  // Filter active users based on the search query
  const filteredActiveUsers = searchQuery
    ? users.filter((user) =>
        `${user.firstName} ${user.lastName}`.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : activeUsers;

  const handleSelectUser = async (userId: string) => {
    console.log('Selected Recipient ID:', userId);  // Log recipientId
    console.log('Current Sender ID:', senderId);    // Log senderId

    setRecipientId(userId);  // Set the selected recipient
    setLoading(true);        // Set loading to true when fetching starts
    setError(null);          // Reset any previous errors

    try {
      const response = await AxiosInstance.get(`/messages/${senderId}/${userId}`);
      const fetchedMessages = response.data || [];
      setMessages(fetchedMessages);  // Update the message list with fetched messages, or set an empty array
    } catch (error) {
      console.error('Error fetching messages:', error);
      setError('Failed to fetch messages. Please try again later.');
    } finally {
      setLoading(false);  // Stop loading when the fetch is complete
    }
  };

  return (
    <Box>
      {/* Search input for searching through active chats */}
      <TextField
        fullWidth
        label="Search active chats..."
        variant="outlined"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className={styles.searchInput}
      />

      {/* Display active chats */}
      <Typography variant="h6">Active Chats</Typography>
      <List className={styles.userList}>
        {filteredActiveUsers.length === 0 ? (
          <Typography variant="body1">No active chats available.</Typography>
        ) : (
          filteredActiveUsers.map((user) => (
            <ListItem key={user._id} disablePadding className={styles.userListItem}>
              <ListItemButton onClick={() => handleSelectUser(user._id)}>
                <ListItemText primary={`${user.firstName} ${user.lastName}`} />
              </ListItemButton>
            </ListItem>
          ))
        )}
      </List>

      {loading && (
        <Box className={styles.loadingContainer}>
          <CircularProgress />
        </Box>
      )}

      {error && (
        <Typography color="error" variant="body2" className={styles.errorText}>
          {error}
        </Typography>
      )}
    </Box>
  );
};

export default UserList;
