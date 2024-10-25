import React from 'react';
import style from '../../../styles/pageBoardStyle.module.scss';

function Logo(): JSX.Element {
  return (
    <div className={style.logo}>
      <img className={style.imageLogo} src={`${process.env.PUBLIC_URL}/logo.png`} alt="logo company" />
    </div>
  );
}

export default React.memo(Logo);
