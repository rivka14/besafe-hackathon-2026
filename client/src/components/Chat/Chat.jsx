import { useState } from 'react';
import styles from '../RandomDuck/RandomDuck.module.css';
import msgStyles from './Chat.module.css';
import api from '../../services/api';

const Chat = () => {
  const [text, setText] = useState('');
  const [messages, setMessages] = useState([]);

  const fetchMessages = async () => {
    try {
      const res = await api.get('/messages');
      if (res && res.data && Array.isArray(res.data.messages)) {
        setMessages(res.data.messages);
      }
    } catch (err) {
      console.error('Failed to fetch messages', err);
    }
  };

  const handleSend = async () => {
    if (!text || !text.trim()) return;
    try {
      const payload = { user: 'You', text: text.trim() };
      await api.post('/messages', payload);
      setText('');
      fetchMessages();
    } catch (err) {
      console.error('Failed to send message', err);
      alert('Could not send message');
    }
  };



  return (
    <div className={styles.container}>
      <div className={styles.duck}>
        <div className={msgStyles.list}>
          {messages.slice().reverse().map((m) => (
            <div
              key={m.id}
              className={`${msgStyles.message} ${m.user === 'You' ? msgStyles.mine : msgStyles.other}`}
            >
              <div className={msgStyles.user}>{m.user}</div>
              <div className={msgStyles.text}>{m.text}</div>
            </div>
          ))}
        </div>

        <div className={msgStyles.inputRow}>
          <input
            className={msgStyles.input}
            type="text"
            placeholder="type here..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button className={msgStyles.button} onClick={handleSend}>send</button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
