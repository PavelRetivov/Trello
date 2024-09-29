import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import styles from '../../../styles/pageBoardStyle.module.scss';

function ButtonHome(): JSX.Element {
  return (
    <Link to="/" className={styles.HeaderLinkHome}>
      go home
    </Link>
  );
}

export default memo(ButtonHome);
