import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from '../styles/registrationStyle.module.scss';
import RegistrationForm from '../components/registration/Registration';

function Registration(): JSX.Element {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  if (token) {
    navigate('/');
  }

  return (
    <div className={styles.containerRegistration}>
      <div className={styles.blockRegistration}>
        <h1>registration</h1>
        <RegistrationForm />
        <footer className={styles.footerAutorisation}>
          <p>you have in account</p>
          <Link to="/Login"> sign in</Link>
        </footer>
      </div>
    </div>
  );
}

export default Registration;
