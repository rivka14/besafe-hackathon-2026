import styles from './Home.module.css';
import RandomMessage from '../../components/RandomMessage/RandomMessage.jsx';


const Home = () => {
  return (
    <div className={styles.home}>
      <h1 className={styles.headline}>PhishSmart</h1>
      <p>Learn to spot phishing — try creating a fake message and see who falls for it.</p>
      <RandomMessage />
    </div>
  );
};

export default Home;
