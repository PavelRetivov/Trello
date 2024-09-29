import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import styles from '../../../../../styles/pageBoardStyle.module.scss';

function LinkToBoard(data: { idBoard: number; title: string; custom: { background: string } }): JSX.Element {
  const { idBoard, title, custom } = data;
  const { background } = custom;
  const location = useLocation();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>): void => {
    if (location.pathname === `/board/${idBoard}`) {
      e.preventDefault();
    }
  };

  return (
    <NavLink
      to={`/board/${idBoard.toString()}`}
      className={styles.linkStyle}
      style={({ isActive }) => ({ backgroundColor: isActive ? 'red' : 'transparent' })}
      onClick={handleClick}
    >
      <div className={styles.blockImageBoard}>
        <span className={styles.imageBoard} style={{ background }} />
      </div>
      <p className={styles.boardNameText}>{title}</p>
    </NavLink>
  );
}

export default React.memo(LinkToBoard);
