import { useState, useEffect } from 'react';
import { io, Socket } from 'socket.io-client';

const SOCKET_SERVER_URL = 'http://localhost:3000';  // Ensure this matches your backend URL

const ChatComponent = () => {
  const [socket, setSocket] = useState<Socket | null>(null); // Store the socket connection
  const [messages, setMessages] = useState<{ sender: string, message: string }[]>([]); // Store chat messages
  const [newMessage, setNewMessage] = useState(''); // Message being typed
  const [username, setUsername] = useState('Anonymous'); // User's name, default to "Anonymous"

  // Initialize the Socket.IO connection on component mount
  useEffect(() => {
    const newSocket = io(SOCKET_SERVER_URL); // Connect to the backend server
    setSocket(newSocket);

    // Listen for 'message' events from the server
    newSocket.on('message', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    // Cleanup socket when component unmounts
    return () => {
      newSocket.disconnect();
    };
  }, []);

  // Handle sending a message to the server
  const handleSendMessage = () => {
    if (socket && newMessage.trim()) {
      const messageData = { sender: username, message: newMessage };

      // Emit 'message' event to the server
      socket.emit('message', messageData);

      // Clear the input field after sending the message
      setNewMessage('');
    }
  };

  return (
    <div>
      <h2>Live Chat</h2>

      {/* Display current chat messages */}
      <div className="chat-box" style={{ border: '1px solid #ccc', padding: '10px', height: '300px', overflowY: 'scroll' }}>
        {messages.map((msg, index) => (
          <div key={index}>
            <strong>{msg.sender}: </strong>{msg.message}
          </div>
        ))}
      </div>

      {/* Input to set username */}
      <div>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter your name"
          style={{ margin: '10px 0' }}
        />
      </div>

      {/* Input to type a new message */}
      <input
        type="text"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        placeholder="Type your message..."
        style={{ width: '300px' }}
      />
      <button onClick={handleSendMessage}>Send</button>
    </div>
  );
};

export default ChatComponent;
