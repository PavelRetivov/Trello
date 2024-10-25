import React from 'react';
import styles from '../../../../../styles/globalStyle.module.scss';
import IDataBoard from '../../../../../interface/IDataBoard';
import { useAppSelector } from '../../../../../store';
import { selectBoardTitle } from '../../../../../module/board';

interface choseListsProps {
  boards: IDataBoard[] | null;
  handleItemClick: (id: number, title: string) => Promise<void>;
  filter: string;
}

function ListsChoseBoards({ handleItemClick, boards, filter }: choseListsProps): JSX.Element {
  const thisBoardTitle = useAppSelector(selectBoardTitle);

  return (
    <ul className={styles.choseBoard}>
      {boards
        ?.filter((board) => board.title.toLowerCase().includes(filter.toLowerCase()))
        .map((board) => (
          <li key={board.id} onClick={() => handleItemClick(board.id, board.title)} className={styles.nameBoard}>
            <h3>{board.title}</h3>
            {thisBoardTitle && thisBoardTitle === board.title && <p>this board</p>}
          </li>
        ))}
    </ul>
  );
}

export default ListsChoseBoards;
