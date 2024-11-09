import React, { FormEvent, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../../../styles/loginStyle.module.scss';
import { getUser } from '../../../services/Services';

function LoginForm(): JSX.Element {
  const refLogin = useRef<HTMLInputElement>(null);
  const refPassword = useRef<HTMLInputElement>(null);
  const [errors] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event: FormEvent): Promise<void> => {
    event.preventDefault();
    if (refLogin.current && refPassword.current) {
      console.log('refLogin', refLogin.current.value);
      console.log('refPassword', refPassword.current.value);
      const userData = await getUser(refLogin.current.value, refPassword.current.value);
      if (userData) {
        console.log(userData);
        localStorage.setItem('token', userData.token);
        localStorage.setItem('refreshToken', userData.refreshToken);
        if (userData.result === 'Authorized') {
          navigate('/');
        }
      }
    }
  };

  return (
    <form className={styles.loginForm} onSubmit={handleSubmit}>
      <label className={styles.setLogin}>
        login
        <input type="text" ref={refLogin} />
      </label>

      <label className={styles.setPassword}>
        password
        {errors && <p>{errors}</p>}
        <input type="password" ref={refPassword} placeholder="enter password" />
      </label>

      <button type="submit" className={styles.buttonAccept}>
        accept
      </button>
    </form>
  );
}

export default LoginForm;
