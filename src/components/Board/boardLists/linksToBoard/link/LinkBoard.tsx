import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import styles from '../../../../../styles/pageBoardStyle.module.scss';

function LinkToBoard(data: { idBoard: number; title: string; custom: { background: string } }): JSX.Element {
  const { idBoard, title, custom } = data;
  const { background } = custom;
  const location = useLocation();
  const MemoizedNavLink = React.memo(NavLink);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>): void => {
    if (location.pathname === `/board/${idBoard}`) {
      e.preventDefault();
    }
  };

  const checkTypeFon = (): boolean => {
    if (background && background.startsWith('url')) {
      return true;
    }
    return false;
  };

  return (
    <MemoizedNavLink
      to={`/board/${idBoard.toString()}`}
      className={styles.linkStyle}
      style={({ isActive }) => ({ backgroundColor: isActive ? 'red' : 'transparent' })}
      onClick={handleClick}
    >
      <div className={styles.blockImageBoard}>
        <span className={styles.imageBoard} style={checkTypeFon() ? { backgroundImage: background } : { background }} />
      </div>
      <p className={styles.boardNameText}>{title}</p>
    </MemoizedNavLink>
  );
}

export default React.memo(LinkToBoard);
