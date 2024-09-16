import { useState, useEffect } from 'react';
import { io, Socket } from 'socket.io-client';
import './Chat.css';

const SOCKET_SERVER_URL = 'http://localhost:3000';  // Backend WebSocket server

interface User {
  id: string;
  fullName: string;
}

const ChatComponent = () => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [messages, setMessages] = useState<{ senderId: string, message: string }[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);  // Store logged-in user
  const [recipientId, setRecipientId] = useState('');  // Store recipient ID
  const [users, setUsers] = useState<User[]>([]);  // Store list of users

  // Automatically fetch logged-in user and users when the component loads
  useEffect(() => {
    const fetchLoggedInUserAndUsers = async () => {
      try {
        // Fetch the logged-in user automatically (e.g., using a token from local storage or cookies)
        const response = await fetch('http://localhost:3000/auth/getuser', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('access_token')}` // Use the token from localStorage (or cookies)
          }
        });
        const userData = await response.json();
        setLoggedInUser({ id: userData._id, fullName: `${userData.firstName} ${userData.lastName}` });

        // Fetch other users, excluding the logged-in user
        const usersResponse = await fetch('http://localhost:3000/user', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('access_token')}` // Include token if necessary
          }
        });
        const usersData = await usersResponse.json();
        setUsers(usersData.filter((user: any) => user._id !== userData._id));
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchLoggedInUserAndUsers();
  }, []);

  // Initialize Socket.IO connection once the user is fetched
  useEffect(() => {
    if (loggedInUser) {
      const newSocket = io(SOCKET_SERVER_URL);
      setSocket(newSocket);

      // Listen for private messages
      newSocket.on('privateMessage', (message) => {
        setMessages((prevMessages) => [...prevMessages, message]);
      });

      return () => {
        newSocket.disconnect();
      };
    }
  }, [loggedInUser]);

  // Handle sending a private message
  const handleSendMessage = () => {
    if (socket && newMessage.trim() && recipientId) {
      const messageData = { senderId: loggedInUser?.id, recipientId, message: newMessage };
      socket.emit('privateMessage', messageData);
      setNewMessage('');  // Clear input after sending
    }
  };

  return (
    <div className="chat-container">
      {loggedInUser ? (
        <>
          <h2>Private Chat</h2>

          <p>Logged in as: {loggedInUser.fullName}</p>

          {/* Select recipient dropdown */}
          <div className="recipient-select">
            <label htmlFor="recipient">Select Recipient:</label>
            <select
              id="recipient"
              value={recipientId}
              onChange={(e) => setRecipientId(e.target.value)}
            >
              <option value="">--Select a user--</option>
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.fullName}
                </option>
              ))}
            </select>
          </div>

          {/* Chat message history */}
          <div className="chat-box">
            {messages.map((msg, index) => (
              <div key={index} className={`message ${msg.senderId === loggedInUser?.id ? 'sent' : 'received'}`}>
                <strong>{msg.senderId === loggedInUser?.id ? 'Me' : 'Them'}:</strong> {msg.message}
              </div>
            ))}
          </div>

          {/* New message input */}
          <div className="message-input">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message..."
            />
            <button onClick={handleSendMessage}>Send</button>
          </div>
        </>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
};

export default ChatComponent;
