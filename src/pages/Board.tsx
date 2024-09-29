import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styles from '../styles/pageBoardStyle.module.scss';
import BoardLists from '../components/Board/boardLists/boardLists';
import { useAppDispatch } from '../store';
import { fetchBoardsThunk, selectBoards } from '../module/boards';
import LinkToBoard from '../components/Board/boardLists/list/link/LinkToBoard';
import { getBoardByIdThunk } from '../module/board';
import ButtonHome from '../components/Board/buttonHome/buttonHome';
import Logo from '../components/Board/logo/Logo';
import ButtonCloseWindowsBoards from '../components/Board/buttonCloseAndOpenWindowsBoards/ButtonCloseWindowsBoards';
import ButtonOpenWindowsBoards from '../components/Board/buttonCloseAndOpenWindowsBoards/ButtonOpenWindowsBoards';

function Board(): JSX.Element {
  const { boardId } = useParams();
  const boards = useSelector(selectBoards);
  const dispatch = useAppDispatch();
  const [isCloseWindowsBoards, setIsCloseWindowsBoards] = useState(false);

  useEffect(() => {
    if (boards === null) {
      dispatch(fetchBoardsThunk());
    }
    if (boardId) {
      dispatch(getBoardByIdThunk(Number(boardId)));
    }
  }, [dispatch, boardId, boards]);

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
          <div className={styles.links}>
            {boards?.map((board) => (
              <LinkToBoard key={board.id} idBoard={board.id} title={board.title} custom={board.custom} />
            ))}
          </div>
        </div>
        <BoardLists boardId={boardId} />
      </div>
    </div>
  );
}

export default React.memo(Board);
