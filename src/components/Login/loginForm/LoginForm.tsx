import React, { FormEvent, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../../../styles/loginStyle.module.scss';
import { getUser } from '../../../services/Services';

function LoginForm(): JSX.Element {
  const refLogin = useRef<HTMLInputElement>(null);
  const refPassword = useRef<HTMLInputElement>(null);
  const [errors] = useState('');
  const navigate = useNavigate();
  const [lockPasswordImage] = useState(`${process.env.PUBLIC_URL}/passwordLock.png`);
  const [unlockPasswordImage] = useState(`${process.env.PUBLIC_URL}/unlockPassword.png`);
  const [isUnLockPassword, setIsUnlockPassword] = useState(false);
  const [unAuthorized] = useState('Invalid account or password');
  const [isUnAuthorized, setIsUnAuthorized] = useState(false);

  const handleSubmit = async (event: FormEvent): Promise<void> => {
    event.preventDefault();
    if (!(refLogin.current && refPassword.current)) {
      return;
    }
    const userData = await getUser(refLogin.current.value, refPassword.current.value);
    if (!('token' in userData)) {
      if (userData.result === 'Unauthorized') setIsUnAuthorized(true);
      return;
    }
    localStorage.setItem('token', userData.token);
    localStorage.setItem('refreshToken', userData.refreshToken);

    if (userData.result === 'Authorized') {
      setIsUnAuthorized(false);
      navigate('/');
    }
  };

  const togglePasswordVisibility = (event: React.MouseEvent<HTMLSpanElement>): void => {
    event.preventDefault();
    if (!refPassword.current) {
      return;
    }
    if (isUnLockPassword) {
      refPassword.current.type = 'password';
      setIsUnlockPassword(false);
      event.currentTarget.style.backgroundImage = `url(${lockPasswordImage})`;
    } else {
      refPassword.current.type = 'text';
      setIsUnlockPassword(true);
      event.currentTarget.style.backgroundImage = `url(${unlockPasswordImage})`;
    }
  };

  return (
    <form className={styles.loginForm} onSubmit={handleSubmit}>
      <label className={styles.setLogin}>
        Login
        <input type="text" ref={refLogin} placeholder="example: example@gmail.com" />
      </label>

      <label className={styles.setPassword}>
        Password
        {errors && <p>{errors}</p>}
        <div className={styles.passwordContainer}>
          <input type="password" ref={refPassword} placeholder="enter password" />
          <span
            className={styles.indicatorPassword}
            style={{ backgroundImage: `url(${lockPasswordImage})` }}
            onClick={togglePasswordVisibility}
          />
        </div>
      </label>
      {isUnAuthorized ? (
        <p className={styles.errorAuthorized}>{unAuthorized}</p>
      ) : (
        <div style={{ width: '100%', height: '1.5rem' }} />
      )}
      <button type="submit" className={styles.buttonAccept}>
        accept
      </button>
    </form>
  );
}

export default React.memo(LoginForm);
