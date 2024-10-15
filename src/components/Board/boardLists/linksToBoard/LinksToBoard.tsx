import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { fetchBoardsThunk, selectBoards } from '../../../../module/boards';
import { useAppDispatch } from '../../../../store';
import LinkBoard from './link/LinkBoard';
import styles from '../../../../styles/pageBoardStyle.module.scss';

function LinksToBoard(): JSX.Element {
  const boards = useSelector(selectBoards);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (boards === null) {
      dispatch(fetchBoardsThunk());
    }
  }, [boards, dispatch]);

  return (
    <div className={styles.links}>
      {boards?.map((board) => (
        <LinkBoard key={board.id} idBoard={board.id} title={board.title} custom={board.custom} />
      ))}
    </div>
  );
}

export default React.memo(LinksToBoard);
