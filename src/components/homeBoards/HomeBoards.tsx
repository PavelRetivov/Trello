import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import BoardInBoardHome from './boardInBoardsHome/BoardInBoardHome';
import styles from '../../styles/homeStyle.module.scss';
import ModalWindowsForAddNewBoardInHome from '../../components/modalWindowsForAddNewBoardInHome/ModalWindowsForAddNewBoardInHome';
import { fetchBoardsThunk, selectBoards } from '../../module/boards';
import { useAppDispatch } from '../../store';

function Header(): JSX.Element {
  const boards = useSelector(selectBoards);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchBoardsThunk());
  }, [dispatch]);

  const [isOpenModalWindowsForAddBoard, setIsOpenModalWindowsForAddBoard] = useState(false);

  const openModalForAddBoardInHome = (): void => {
    setIsOpenModalWindowsForAddBoard(true);
  };

  const closeModalForAddBoardInHome = (): void => {
    setIsOpenModalWindowsForAddBoard(false);
  };

  return (
    <div className={styles.BoardsStyleInHome}>
      {boards?.map((board) => <BoardInBoardHome key={board.id} board={board} />)}
      <button className={styles.buttonAddBoard} onClick={openModalForAddBoardInHome}>
        <h1>add Board</h1>
      </button>
      <ModalWindowsForAddNewBoardInHome
        isOpenModal={isOpenModalWindowsForAddBoard}
        closeModal={closeModalForAddBoardInHome}
      />
    </div>
  );
}

export default React.memo(Header);
