import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../../services/api';
import styles from './FakeLanding.module.css';

const FakeLanding = () => {
  const { id } = useParams();
  const [message, setMessage] = useState(null);

  useEffect(() => {
    const hitAndExplain = async () => {
      try {
        const res = await api.post(`/messages/${id}/fall`);
        setMessage(res.data.message);
      } catch (err) {
        console.error(err);
      }
    };
    hitAndExplain();
  }, [id]);

  return (
    <div className={styles.container}>
      <h2>This was a fake link</h2>
      <p>The link you clicked was part of a phishing simulation.</p>
      <p><strong>Why this is dangerous:</strong> Phishing messages try to trick you into revealing personal info or credentials.</p>
      <p><strong>Tips:</strong> Don&apos;t click unexpected links, check sender address, hover links to inspect URL, and report suspicious messages.</p>
      {message && <p>Message: {message.title} — People fallen so far: {message.fallCount}</p>}
      <Link to="/">Return Home</Link>
    </div>
  );
};

export default FakeLanding;
