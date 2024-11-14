import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/loginStyle.module.scss';
import LoginForm from '../components/Login/loginForm/LoginForm';

function Login(): JSX.Element {
  return (
    <div className={styles.container}>
      <div className={styles.blockLogin}>
        <h1>Autorisation</h1>
        <LoginForm />
        <footer className={styles.footerAutorisation}>
          <p>For the first time here</p>
          <Link to="/Registration"> sign up</Link>
        </footer>
      </div>
    </div>
  );
}

export default React.memo(Login);
