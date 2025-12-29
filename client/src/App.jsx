import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Home from './pages/HomePage/HomePage';
import CreateMessage from './pages/CreateMessage/CreateMessage';
import FakeLanding from './pages/FakeLanding/FakeLanding';
import Stats from './pages/Stats/Stats';
import styles from './styles/App.module.css';

import projectLogo from './assets/project-logo.png'

function App() {
  return (
    <BrowserRouter>
      <div className={styles.app}>
        <header className={styles.appHeader}>
          <img src={projectLogo} alt="Logo" className={styles.appLogo} />
          <nav className={styles.appNav}>
            <Link to="/" className={styles.appLink}>Home</Link>
            <Link to="/create" className={styles.appLink}>Create Message</Link>
            <Link to="/stats" className={styles.appLink}>Stats</Link>
          </nav>
        </header>
        <main className={styles.main}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create" element={<CreateMessage />} />
            <Route path="/phish/:id" element={<FakeLanding />} />
            <Route path="/stats" element={<Stats />} />
          </Routes>
        </main>
        <footer className={styles.footer}>
          <p>&copy; 2024 My App</p>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
