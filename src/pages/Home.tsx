import React from 'react';
import styles from '../styles/homeStyle.module.scss';
import HomeBoard from '../components/homeBoards/HomeBoards';

function Home(): JSX.Element {
  return (
    <div className={styles.HomeStyle}>
      <h1 className={styles.headerHome}> My Boards</h1>
      <HomeBoard />
    </div>
  );
}

export default React.memo(Home);
