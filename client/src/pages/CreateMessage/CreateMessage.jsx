import { useState } from 'react';
import api from '../../services/api';
import styles from './CreateMessage.module.css';

const TEMPLATES = [
  'Your account has been suspended. Click here to verify immediately.',
  'We detected unusual activity. Reset your password now to avoid lockout.',
  'Unclaimed reward waiting. Provide details to claim your prize.'
];

const CreateMessage = () => {
  const [type, setType] = useState('text'); // 'text' | 'video'
  const [content, setContent] = useState('');
  const [templateIndex, setTemplateIndex] = useState(0);
  const [shareLink, setShareLink] = useState('');
  const [messageWithLink, setMessageWithLink] = useState('');
  const [loading, setLoading] = useState(false);

  // templates are applied automatically when creating a text message

  // Request server to create a synthetic (clearly-labeled) video for a fictional avatar
  const generateSyntheticVideo = async () => {
    setLoading(true);
    try {
      const res = await api.post('/videos', { title: 'Synthetic Video', script: content });
      const id = res.data.video.id;
      setShareLink(`${window.location.origin}/video/${id}`);
    } catch (err) {
      console.error(err);
      alert('Failed to create synthetic video');
    } finally {
      setLoading(false);
    }
  };

  const handleSend = async () => {
    if (type === 'video') {
      await generateSyntheticVideo();
      return;
    }

    setLoading(true);
    try {
      const templateText = TEMPLATES[templateIndex];
      const res = await api.post('/messages', { title: 'Important Notice', content: templateText });
      const id = res.data.message.id;
      const link = `${window.location.origin}/phish/${id}`;
      setShareLink(link);
      // Build a message that includes the generated link for easy copying
      setMessageWithLink(`${templateText}\n${link}`);
    } catch (err) {
      console.error(err);
      alert('Failed to create message');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h2>Create Fake Message</h2>

      <label>Type</label>
      <select value={type} onChange={e => setType(e.target.value)}>
        <option value="text">Text Message (templates)</option>
        <option value="video">Synthetic Video (fictional avatar)</option>
      </select>

      {type === 'video' && (
        <>
          <label>Script</label>
          <textarea value={content} onChange={e => setContent(e.target.value)} />
        </>
      )}

      {type === 'text' && (
        <>
          <label>Template</label>
          <select value={templateIndex} onChange={e => setTemplateIndex(Number(e.target.value))}>
            {TEMPLATES.map((t, i) => (
              <option key={i} value={i}>{t.slice(0, 40)}{t.length > 40 ? '…' : ''}</option>
            ))}
          </select>
        </>
      )}

      <div className={styles.actions}>
        {type === 'video' ? (
          <button onClick={() => { /* future: open video options */ }}>Configure Video</button>
        ) : null}

        <button onClick={handleSend} disabled={loading}>{loading ? 'Creating...' : 'Create & Get Link'}</button>
      </div>

      {shareLink && (
        <div className={styles.share}>
          <p><strong>Note:</strong> This content is synthetic and does not depict a real person.</p>
          <p>Share this link:</p>
          {type === 'text' ? (
            <>
              <textarea readOnly value={messageWithLink} rows={4} style={{whiteSpace: 'pre-wrap', width: '100%'}} />
              <div style={{display: 'flex', gap: 8}}>
                <button onClick={() => navigator.clipboard?.writeText(messageWithLink)} disabled={!messageWithLink}>Copy Message</button>
              </div>
            </>
          ) : (
            <>
              <input readOnly value={shareLink} style={{width: '100%'}} />
              <button onClick={() => navigator.clipboard?.writeText(shareLink)}>Copy Link</button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default CreateMessage;
