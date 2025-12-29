import { useEffect, useState } from 'react';
import api from '../../services/api';
import styles from './Stats.module.css';

const Stats = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await api.get('/messages');
        setMessages(res.data.messages || []);
      } catch (err) {
        console.error(err);
      }
    };
    load();
  }, []);

  return (
    <div className={styles.container}>
      <h2>Phishing Simulation Stats</h2>
      <ul>
        {messages.map(m => (
          <li key={m.id} className={styles.item}>
            <strong>{m.title}</strong> — Fallen: {m.fallCount || 0}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Stats;
