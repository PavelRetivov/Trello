import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/homeStyle.module.scss';
import HomeBoard from '../components/Home/HomeBoards';

function Home(): JSX.Element {
  const navigate = useNavigate();

  const handleExitSession = (): void => {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    navigate('/Login');
  };

  return (
    <div className={styles.HomeStyle}>
      <h1 className={styles.headerHome}> My Boards</h1>
      <HomeBoard />
      <button className={styles.exitSession} onClick={handleExitSession}>
        exit
      </button>
    </div>
  );
}

export default React.memo(Home);
