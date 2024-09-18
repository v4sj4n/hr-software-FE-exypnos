import React, { useEffect } from 'react';
import { User } from '@/Pages/Chat/Interfaces/types';
import { useChat } from './context/ChatContext';
import AxiosInstance from '@/Helpers/Axios';
import { Box, Typography } from '@mui/material';
import UserList from './components/userlist';
import MessageList from './components/messagelist';
import SendMessage from './components/chatinput';

const Chat: React.FC = () => {
  const { users, setUsers } = useChat();  // Removed messages from the destructuring

  // Fetch users from the backend
  useEffect(() => {
    const fetchUsers = async () => {
      const response = await AxiosInstance('/user');
      const data: User[] = await response.data;
      setUsers(data);
    };
    fetchUsers();
  }, [setUsers]);

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Chat
      </Typography>
      <Box sx={{ display: 'flex', gap: 2 }}>
        {/* User list */}
        <Box sx={{ width: '30%' }}>
          <Typography variant="h6" component="h2" gutterBottom>
            Users
          </Typography>
          <UserList users={users} />
        </Box>

        {/* Chat box */}
        <Box sx={{ width: '70%', display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Typography variant="h6" component="h2">
            Chat Box
          </Typography>
          {/* Message List */}
          <Box sx={{ flexGrow: 1, overflowY: 'auto', maxHeight: '400px' }}>
            <MessageList /> {/* Removed messages prop */}
          </Box>
          {/* Send Message Input */}
          <SendMessage />
        </Box>
      </Box>
    </Box>
  );
};

export default Chat;
