import React, { FormEvent, useRef, useState } from 'react';
import PasswordValidator from 'password-validator';
import styles from '../../styles/registrationStyle.module.scss';
import {
  fourAndMorError,
  oneError,
  threeError,
  twoError,
  zeroError,
} from '../../utils/registerPasswordValidation/RegisterPasswordValidation';
import { addUser } from '../../services/Services';

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
      if (validationLogin && validationPassword && parolsRepeat) {
        await addUser(refLogin.current.value, refPassword.current.value);
      }
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

  return (
    <form className={styles.registerForm} onSubmit={handleSubmit}>
      <label className={styles.setLoginRegister}>
        login
        {noValidLogin && <p>login entered incorrectly </p>}
        <input type="text" ref={refLogin} />
      </label>

      <label className={styles.setPasswordRegister}>
        password
        {errors && <p>{errors}</p>}
        <input type="text" ref={refPassword} placeholder="enter password" onChange={handleInputPassword} />
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
        <input type="text" ref={refRepeatPassword} />
      </label>

      <button type="submit" className={styles.buttonAccept}>
        accept
      </button>
    </form>
  );
}

export default RegistrationForm;
