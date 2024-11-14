import React, { FormEvent, useRef, useState } from 'react';
import PasswordValidator from 'password-validator';
import { useNavigate } from 'react-router-dom';
import styles from '../../styles/registrationStyle.module.scss';
import {
  fourAndMorError,
  oneError,
  threeError,
  twoError,
  zeroError,
} from '../../utils/registerPasswordValidation/RegisterPasswordValidation';
import { addUser, getUser } from '../../services/Services';

const schema = new PasswordValidator();
schema
  .is()
  .min(8, 'minimum 8 letter')
  .has()
  .uppercase(1, 'needs one letter uppercase')
  .has()
  .lowercase(1, 'needs one litter lowercase')
  .has()
  .digits(2, 'minimum 2 digits')
  .has()
  .not()
  .spaces(0, 'no space');

function RegistrationForm(): JSX.Element {
  const refLogin = useRef<HTMLInputElement>(null);
  const refPassword = useRef<HTMLInputElement>(null);
  const refRepeatPassword = useRef<HTMLInputElement>(null);
  const [errors, setErrors] = useState<string>('');
  const [noValidLogin, setNoValidLogin] = useState(false);
  const [noRepeatPassword, setNoRepeatPassword] = useState(false);
  const indicatorRef1 = useRef<HTMLSpanElement>(null);
  const indicatorRef2 = useRef<HTMLSpanElement>(null);
  const indicatorRef3 = useRef<HTMLSpanElement>(null);
  const indicatorRef4 = useRef<HTMLSpanElement>(null);
  const [lockPasswordImage] = useState(`${process.env.PUBLIC_URL}/passwordLock.png`);
  const [unlockPasswordImage] = useState(`${process.env.PUBLIC_URL}/unlockPassword.png`);
  const [isUnLockPassword, setIsUnlockPassword] = useState(false);
  const [isUnLockRepeatPassword, setIsUnlockRepeatPassword] = useState(false);
  const navigate = useNavigate();

  const checkPassword = (testText: string): number => {
    const result = schema.validate(testText, { details: true });
    if (Array.isArray(result)) {
      setErrors(
        result
          .map((error) => {
            return error.message;
          })
          .join(', ')
      );
      if (result.length > 0) {
        return result.length;
      }
    }
    return 0;
  };
  const checkLogin = (testText: string): boolean => {
    const regex = /^[a-zA-Z\d]+@[a-z]+\.[a-z]+$/;
    return regex.test(testText);
  };
  const checkRepeatPassword = (firstPassword: string, repeatPassword: string): boolean => {
    return firstPassword === repeatPassword;
  };

  const handleSubmit = async (event: FormEvent): Promise<void> => {
    event.preventDefault();
    if (refLogin.current && refPassword.current && refRepeatPassword.current) {
      let validationLogin = false;
      let validationPassword = false;
      let parolsRepeat = false;

      if (checkLogin(refLogin.current.value)) {
        setNoValidLogin(false);
        validationLogin = true;
      } else {
        setNoValidLogin(true);
      }
      if (checkPassword(refPassword.current.value) === 0) {
        validationPassword = true;
      }
      if (checkRepeatPassword(refPassword.current.value, refRepeatPassword.current.value)) {
        parolsRepeat = true;
        setNoRepeatPassword(false);
      } else {
        setNoRepeatPassword(true);
      }
      if (!(validationLogin && validationPassword && parolsRepeat)) {
        return;
      }
      addUser(refLogin.current.value, refPassword.current.value).then((response) => {
        if (
          !(
            response &&
            'result' in response &&
            response.result === 'Created' &&
            refPassword.current &&
            refLogin.current
          )
        ) {
          return;
        }
        getUser(refLogin.current.value, refPassword.current.value).then((responseDataUser) => {
          if (!(responseDataUser && 'token' in responseDataUser)) {
            return;
          }
          localStorage.setItem('token', responseDataUser.token);
          localStorage.setItem('refreshToken', responseDataUser.refreshToken);
          if (responseDataUser.result === 'Authorized') {
            navigate('/');
          }
        });
      });
    }
  };

  const handleInputPassword = (event: React.ChangeEvent<HTMLInputElement>): void => {
    event.preventDefault();
    const numberError = checkPassword(event.target.value);
    if (numberError === 0) {
      zeroError(indicatorRef1, indicatorRef2, indicatorRef3, indicatorRef4);
    } else if (numberError === 1) {
      oneError(indicatorRef1, indicatorRef2, indicatorRef3, indicatorRef4);
    } else if (numberError === 2) {
      twoError(indicatorRef1, indicatorRef2, indicatorRef3, indicatorRef4);
    } else if (numberError === 3) {
      threeError(indicatorRef1, indicatorRef2, indicatorRef3, indicatorRef4);
    } else if (numberError === 4 || numberError > 4) {
      fourAndMorError(indicatorRef1, indicatorRef2, indicatorRef3, indicatorRef4);
    }
  };

  const togglePasswordVisibility = (event: React.MouseEvent<HTMLSpanElement>): void => {
    event.preventDefault();
    if (!refPassword.current) {
      return;
    }
    const { currentTarget } = event;
    if (isUnLockPassword) {
      refPassword.current.type = 'password';
      setIsUnlockPassword(false);
      currentTarget.style.backgroundImage = `url(${lockPasswordImage})`;
    } else {
      refPassword.current.type = 'text';
      setIsUnlockPassword(true);
      currentTarget.style.backgroundImage = `url(${unlockPasswordImage})`;
    }
  };

  const toggleRepeatPasswordVisibility = (event: React.MouseEvent<HTMLSpanElement>): void => {
    event.preventDefault();
    if (!refRepeatPassword.current || !event.target) {
      return;
    }
    const { currentTarget } = event;
    if (isUnLockRepeatPassword) {
      refRepeatPassword.current.type = 'password';
      setIsUnlockRepeatPassword(false);
      currentTarget.style.backgroundImage = `url(${lockPasswordImage})`;
    } else {
      refRepeatPassword.current.type = 'text';
      setIsUnlockRepeatPassword(true);
      currentTarget.style.backgroundImage = `url(${unlockPasswordImage})`;
    }
  };

  return (
    <form className={styles.registerForm} onSubmit={handleSubmit}>
      <label className={styles.setLoginRegister}>
        login
        {noValidLogin && <p>the login must be in the format example@exm.ex </p>}
        <input type="text" ref={refLogin} placeholder="example: example@gmail.com" />
      </label>

      <label className={styles.setPasswordRegister}>
        password
        {errors && <p>{errors}</p>}
        <div className={styles.passwordContainer}>
          <input type="password" ref={refPassword} placeholder="enter password" onChange={handleInputPassword} />
          <span
            className={styles.indicatorPassword}
            style={{ backgroundImage: `url(${lockPasswordImage})` }}
            onClick={togglePasswordVisibility}
          />
        </div>
        <div className={styles.blockIndicators}>
          <span className={styles.indicator} ref={indicatorRef4} />
          <span className={styles.indicator} ref={indicatorRef3} />
          <span className={styles.indicator} ref={indicatorRef2} />
          <span className={styles.indicator} ref={indicatorRef1} />
        </div>
      </label>

      <label className={styles.setPasswordRegister}>
        repeat password
        {noRepeatPassword && <p>passwords do not match</p>}
        <div className={styles.passwordContainer}>
          <input type="password" ref={refRepeatPassword} placeholder="enter repeat password" />
          <span
            className={styles.indicatorPassword}
            style={{ backgroundImage: `url(${lockPasswordImage})` }}
            onClick={toggleRepeatPasswordVisibility}
          />
        </div>
      </label>

      <button type="submit" className={styles.buttonAccept}>
        accept
      </button>
    </form>
  );
}

export default React.memo(RegistrationForm);
