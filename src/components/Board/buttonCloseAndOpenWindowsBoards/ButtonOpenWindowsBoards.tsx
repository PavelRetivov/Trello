import React from 'react';
import styles from '../../../styles/pageBoardStyle.module.scss';

interface propsButtonOpenWindowsBoards {
  setIsCloseWindowsBoards: (isClose: boolean) => void;
}

function ButtonOpenWindowsBoards({ setIsCloseWindowsBoards }: propsButtonOpenWindowsBoards): JSX.Element {
  return (
    <button className={styles.openWindowsByBoards} onClick={() => setIsCloseWindowsBoards(false)}>
      <img src={`${process.env.PUBLIC_URL}/arrowRight.png`} alt="arrow left" />
    </button>
  );
}

export default ButtonOpenWindowsBoards;
