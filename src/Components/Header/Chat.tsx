import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';  // Correctly import socket.io-client
import style from './header.module.css';

// Use the environment variable from Vite
const socket = io((import.meta as any).env.VITE_API_URL);  // This should work now

const Chat: React.FC = () => {
  const [message, setMessage] = useState<string>('');  // Message input
  const [chat, setChat] = useState<Array<{ sender: string; content: string; timestamp: string }>>([]);  // Chat messages
  const [username, setUsername] = useState<string>('');  // Username input

  useEffect(() => {
    // Listening for incoming messages
    socket.on('message', (msg: { sender: string; content: string; timestamp: string }) => {
      setChat((prevChat) => [...prevChat, msg]);
    });

    return () => {
      socket.off('message');  // Clean up when the component unmounts
    };
  }, []);

  const sendMessage = () => {
    if (message && username) {
      socket.emit('message', { sender: username, content: message });
      setMessage('');  // Clear input
    }
  };

  return (
    <div className={style.chatContainer}>
      <div className={style.chatHeader}>
        <h3>Live Chat</h3>
      </div>
      <div className={style.chatMessages}>
        {chat.map((msg, index) => (
          <div key={index} className={style.chatMessage}>
            <strong>{msg.sender}: </strong>{msg.content}
            <span className={style.chatTimestamp}>({new Date(msg.timestamp).toLocaleTimeString()})</span>
          </div>
        ))}
      </div>
      <div className={style.chatInputContainer}>
        <input
          type="text"
          placeholder="Your Name"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className={style.chatInput}
        />
        <input
          type="text"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className={style.chatInput}
        />
        <button onClick={sendMessage} className={style.chatSendButton}>Send</button>
      </div>
    </div>
  );
};

export default Chat;
