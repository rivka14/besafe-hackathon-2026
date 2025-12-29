import { useContext } from 'react';
import styles from './RandomMessage.module.css';
import { MessageContext } from '../../context/MessageContext.jsx';
import FirstButton from '../common/FirstButton/FirstButton.jsx';

//const apiUrl = import.meta.env.VITE_SERVER_API_URL;

const RandomMessage = () => {
  const { message, getRandomMessage } = useContext(MessageContext);

  if (!message) return null;

  return (
    <div className={styles.container}>
      <FirstButton onClick={getRandomMessage}>Show Random Example</FirstButton>
      <div className={styles.message}>
        <h2 className={styles.messageName}>{message.title}</h2>
        <p className={styles.content}>{message.content}</p>
        <p className={styles.fall}>People fallen: {message.fallCount ?? 0}</p>
      </div>
    </div>
  );
};

export default RandomMessage;
