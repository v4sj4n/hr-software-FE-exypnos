import React, { useMemo, useState, useEffect } from 'react';
import { useChat } from '../context/ChatContext';
import { User } from '@/Pages/Chat/Interfaces/types';
import { List, ListItem, ListItemButton, ListItemText, CircularProgress, Typography, Box, TextField } from '@mui/material';
import AxiosInstance from '@/Helpers/Axios';
import { io, Socket } from 'socket.io-client';
import styles from '@/Pages/Chat/styles/chat.module.css';

interface UserListProps {
  users: User[];
}

const UserList: React.FC<UserListProps> = ({ users }) => {
  const { setRecipientId, setMessages, senderId } = useChat();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [searchActiveChatsQuery, setSearchActiveChatsQuery] = useState<string>(''); // Search state for active chats
  const [searchUsersQuery, setSearchUsersQuery] = useState<string>(''); // Search state for all users
  const [activeUserIds, setActiveUserIds] = useState<string[]>([]); // Active user IDs
  const [socket, setSocket] = useState<Socket | null>(null); // WebSocket instance

  // Initialize the WebSocket connection when the component mounts
  useEffect(() => {
    const newSocket = io('http://localhost:4000'); // Adjust the URL as per your backend setup
    setSocket(newSocket);

    // Clean up the socket when the component unmounts
    return () => {
      newSocket.close();
    };
  }, []);

  // Listen for new messages and update active chats
  useEffect(() => {
    if (socket) {
      socket.on('newMessage', (message: { senderId: string; recipientId: string }) => {
        // Update active chats when a new message is sent or received
        setActiveUserIds((prevActiveUserIds) => {
          const newActiveUserIds = new Set(prevActiveUserIds);

          // Update active chat based on message sender/recipient
          if (message.senderId !== senderId) {
            newActiveUserIds.add(message.senderId);
          } else {
            newActiveUserIds.add(message.recipientId);
          }

          return Array.from(newActiveUserIds);
        });
      });
    }
  }, [socket, senderId]);

  // Fetch initial active chats when the component mounts
  useEffect(() => {
    const fetchActiveChats = async () => {
      try {
        setLoading(true);

        // Fetch all messages sent or received by the current user
        const response = await AxiosInstance.get(`/messages/sender/${senderId}`);
        const messages = response.data;

        // Extract unique user IDs (both senders and recipients)
        const uniqueUserIds = new Set<string>();
        messages.forEach((msg: { senderId: string; recipientId: string }) => {
          if (msg.senderId !== senderId) {
            uniqueUserIds.add(msg.senderId); // If the current user is the recipient, add the sender ID
          } else {
            uniqueUserIds.add(msg.recipientId); // If the current user is the sender, add the recipient ID
          }
        });

        setActiveUserIds(Array.from(uniqueUserIds)); // Convert Set to Array and store unique user IDs
      } catch (error) {
        console.error('Error fetching active chats:', error);
      } finally {
        setLoading(false);
      }
    };

    if (senderId) {
      fetchActiveChats();
    }
  }, [senderId]);

  // Filter active users based on the active chats and search query
  const filteredActiveUsers = useMemo(() => {
    // Filter users based on active user IDs (those involved in conversations)
    const activeUsers = users.filter((user) => activeUserIds.includes(user._id));

    // If there is a search query for active chats, filter the active users further by first name and last name
    if (searchActiveChatsQuery.trim()) {
      return activeUsers.filter((user) =>
        `${user.firstName.toLowerCase()} ${user.lastName.toLowerCase()}`.includes(searchActiveChatsQuery.toLowerCase())
      );
    }

    // If no search query, return the active users as is
    return activeUsers;
  }, [searchActiveChatsQuery, users, activeUserIds]);

  // Filter users based on the search query for all users (separate from active chats)
  const filteredAllUsers = useMemo(() => {
    if (searchUsersQuery.trim()) {
      return users.filter((user) =>
        `${user.firstName.toLowerCase()} ${user.lastName.toLowerCase()}`.includes(searchUsersQuery.toLowerCase())
      );
    }

    return [];
  }, [searchUsersQuery, users]);

  // Handle selecting a user and fetching messages between sender and recipient
  const handleSelectUser = async (userId: string) => {
    console.log('Selected Recipient ID:', userId);

    setRecipientId(userId);  // Set the selected recipient ID
    setLoading(true);
    setError(null);

    try {
      // Fetch messages between senderId and recipientId
      const response = await AxiosInstance.get(`/messages/${senderId}/${userId}`);
      setMessages(response.data);

      // Immediately add the recipient to the active chats when a message is sent
      setActiveUserIds((prevActiveUserIds) => {
        const newActiveUserIds = new Set(prevActiveUserIds);
        newActiveUserIds.add(userId); // Add the recipient to active chats
        return Array.from(newActiveUserIds);
      });
    } catch (error) {
      console.error('Error fetching messages:', error);
      setError('Failed to fetch messages. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      {/* Search input for searching through active chats */}
      <TextField
        fullWidth
        label="Search active chats..."
        variant="outlined"
        value={searchActiveChatsQuery}
        onChange={(e) => setSearchActiveChatsQuery(e.target.value)}
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

      {/* Search input for searching through all users */}
      <TextField
        fullWidth
        label="Search all users..."
        variant="outlined"
        value={searchUsersQuery}
        onChange={(e) => setSearchUsersQuery(e.target.value)}
        className={styles.searchInput}
        sx={{ marginTop: '16px' }}
      />

      {/* Display searched users */}
      {searchUsersQuery && (
        <>
          <Typography variant="h6">Search Results</Typography>
          <List className={styles.userList}>
            {filteredAllUsers.length === 0 ? (
              <Typography variant="body1">No users found.</Typography>
            ) : (
              filteredAllUsers.map((user) => (
                <ListItem key={user._id} disablePadding className={styles.userListItem}>
                  <ListItemButton onClick={() => handleSelectUser(user._id)}>
                    <ListItemText primary={`${user.firstName} ${user.lastName}`} />
                  </ListItemButton>
                </ListItem>
              ))
            )}
          </List>
        </>
      )}

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
