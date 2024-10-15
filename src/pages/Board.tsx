import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from '../styles/pageBoardStyle.module.scss';
import BoardLists from '../components/Board/boardLists/boardLists';
import { useAppDispatch } from '../store';
import { getBoardByIdThunk } from '../module/board';
import ButtonHome from '../components/Board/buttonHome/buttonHome';
import Logo from '../components/Board/logo/Logo';
import ButtonCloseWindowsBoards from '../components/Board/buttonCloseAndOpenWindowsBoards/ButtonCloseWindowsBoards';
import ButtonOpenWindowsBoards from '../components/Board/buttonCloseAndOpenWindowsBoards/ButtonOpenWindowsBoards';
import LinksToBoard from '../components/Board/boardLists/linksToBoard/LinksToBoard';

function Board(): JSX.Element {
  const { boardId } = useParams();
  const dispatch = useAppDispatch();
  const [isCloseWindowsBoards, setIsCloseWindowsBoards] = useState(false);

  useEffect(() => {
    if (boardId) {
      dispatch(getBoardByIdThunk(Number(boardId)));
    }
  }, [dispatch, boardId]);

  return (
    <div className={styles.boardStyle}>
      <div className={styles.header}>
        <ButtonHome />
        <Logo />
      </div>
      <div className={styles.positionLinkAndAnother}>
        {isCloseWindowsBoards && <ButtonOpenWindowsBoards setIsCloseWindowsBoards={setIsCloseWindowsBoards} />}
        <div
          className={`${styles.blokLinks} ${isCloseWindowsBoards ? styles.hideBlockLinks : ''}`}
          style={{ display: isCloseWindowsBoards ? 'none' : 'flex' }}
        >
          <ButtonCloseWindowsBoards setIsCloseWindowsBoards={setIsCloseWindowsBoards} />
          <h3 className={styles.myBoardsName}>My boards</h3>
          <LinksToBoard />
        </div>
        <BoardLists boardId={boardId} />
      </div>
    </div>
  );
}

export default React.memo(Board);
