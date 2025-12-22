import styles from './Home.module.css';
//import RandomDuck from '../../components/RandomDuck/RandomDuck.jsx';
import Chat from '../../components/Chat/Chat.jsx';


const Home = () => {
  return (
    <div className={styles.home}>
      <h1 className={styles.headline}>Duck It</h1>
       {/* <RandomDuck /> */}
      <Chat />
    </div>
  );
};

export default Home;
