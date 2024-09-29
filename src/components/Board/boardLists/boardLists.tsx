import React from 'react';
import { useSelector } from 'react-redux';
import { selectBoard } from '../../../module/board';
import styles from '../../../styles/pageBoardStyle.module.scss';
import List from './list/list';
import NameBoard from './nameBoard/NameBoard';
import AddNewList from './addNewList/AddNewList';

function BoardLists(boardDataId: { boardId: string | undefined }): JSX.Element {
  const { lists, title } = useSelector(selectBoard);
  const { boardId } = boardDataId;
  return (
    <div className={styles.positionTitleAndList}>
      <div className={styles.name}>
        <NameBoard nameBoard={title || ''} boardId={boardId ? Number(boardId) : null} />
      </div>
      <div className={styles.listBlock}>
        <ol className={styles.lists}>
          {lists?.map((list) => <List key={list.id} idBoard={boardId} list={list} />)}
          <AddNewList key={boardId} />
        </ol>
      </div>
    </div>
  );
}

export default React.memo(BoardLists);
