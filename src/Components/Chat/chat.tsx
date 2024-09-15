import React, { useState, useEffect, useRef } from 'react';
import { db } from '/Users/reddy/cv/hr-software-FE-exypnos/firebase-config.js'; // Assuming firebase-config is set up
import { collection, addDoc, query, orderBy, onSnapshot } from 'firebase/firestore';
import styles from './styles/chat.module.css';
import { Message } from 'src/Components/Chat/interfaces/message.interface';

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const dummy = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const q = query(collection(db, 'messages'), orderBy('createdAt'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Message[];
      setMessages(msgs);
      dummy.current?.scrollIntoView({ behavior: 'smooth' });
    });
    return () => unsubscribe();
  }, []);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    await addDoc(collection(db, 'messages'), {
      text: newMessage,
      createdAt: new Date(),
      uid: 'guest', // Replace with actual user ID
      photoURL: 'guest_avatar.png', // Replace with actual photo URL
    });
    setNewMessage('');
    dummy.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className={styles.chatContainer}>
      <main>
        {messages.map((msg) => (
          <div key={msg.id} className={styles.chatMessage}>
            <img src={msg.photoURL || 'default_avatar.png'} alt="Avatar" />
            <p>{msg.text}</p>
          </div>
        ))}
        <div ref={dummy}></div>
      </main>
      <form onSubmit={sendMessage}>
        <input 
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message here..."
        />
        <button type="submit" disabled={!newMessage}>Send</button>
      </form>
    </div>
  );
};

export default Chat;
