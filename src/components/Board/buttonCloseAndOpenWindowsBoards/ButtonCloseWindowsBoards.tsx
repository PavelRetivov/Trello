import React from 'react';
import styles from '../../../styles/pageBoardStyle.module.scss';

interface propsButtonCloseWindowsBoards {
  setIsCloseWindowsBoards: (isClose: boolean) => void;
}

function ButtonCloseWindowsBoards({ setIsCloseWindowsBoards }: propsButtonCloseWindowsBoards): JSX.Element {
  return (
    <button className={styles.closeWindowsByBoards} onClick={() => setIsCloseWindowsBoards(true)}>
      <img src={`${process.env.PUBLIC_URL}/arrowLeft.png`} alt="arrow left" />
    </button>
  );
}

export default ButtonCloseWindowsBoards;
