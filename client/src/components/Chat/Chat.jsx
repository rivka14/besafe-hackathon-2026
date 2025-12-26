import { useState, useEffect } from 'react';
import styles from '../RandomDuck/RandomDuck.module.css';
import msgStyles from './Chat.module.css';
import api from '../../services/api';

const Chat = () => {
  const [text, setText] = useState('');
  const [messages, setMessages] = useState([]);
  const [suggestion, setSuggestion] = useState('');
  const [showSuggestion, setShowSuggestion] = useState(false);
  const [loadingSend, setLoadingSend] = useState(false);

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

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleSend = async (overrideText) => {
    const bodyText = (overrideText ?? text)?.trim();
    if (!bodyText) return;
    setLoadingSend(true);
    try {
      const payload = { user: 'You', text: bodyText };
      await api.post('/messages', payload);
      setText('');
      setShowSuggestion(false);
      setSuggestion('');
      fetchMessages();
    } catch (err) {
      const resp = err?.response?.data;
      if (resp && resp.suggestion) {
        setSuggestion(resp.suggestion);
        setShowSuggestion(true);
      } else {
        console.error('Failed to send message', err);
        alert(resp?.error || 'Could not send message');
      }
    } finally {
      setLoadingSend(false);
    }
  };

  const sendSuggestionAndClear = async () => {
    if (!suggestion) return;
    await handleSend(suggestion);
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

        {showSuggestion && (
          <div className={msgStyles.suggestionBox}>
            <div className={msgStyles.suggestionLabel}>Message flagged — suggested alternative:</div>
            <div className={msgStyles.suggestionText}>{suggestion}</div>
            <div className={msgStyles.suggestionButtons}>
              <button className={msgStyles.suggestionBtn} onClick={() => { setText(suggestion); setShowSuggestion(false); }}>Edit</button>
              <button className={msgStyles.suggestionBtn} onClick={sendSuggestionAndClear} disabled={loadingSend}>Use &amp; send</button>
              <button className={msgStyles.cancelBtn} onClick={() => { setShowSuggestion(false); setSuggestion(''); }}>Cancel</button>
            </div>
          </div>
        )}

        <div className={msgStyles.inputRow}>
          <input
            className={msgStyles.input}
            type="text"
            placeholder="type here..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button className={msgStyles.button} onClick={() => handleSend()} disabled={loadingSend}>send</button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
