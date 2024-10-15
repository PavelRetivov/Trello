import React from 'react';
import { useSelector } from 'react-redux';
import { getListsBoardByIdServiceThunk, selectBoard } from '../../../module/board';
import styles from '../../../styles/pageBoardStyle.module.scss';
import List from './list/list';
import NameBoard from './nameBoard/NameBoard';
import AddNewList from './addNewList/AddNewList';
import { putPositionList } from '../../../services/Services';
import { useAppDispatch } from '../../../store';

function BoardLists(boardDataId: { boardId: string | undefined }): JSX.Element {
  const { lists, title, custom } = useSelector(selectBoard);
  const { boardId } = boardDataId;
  const dispatch = useAppDispatch();

  const updatePosition = async (position: number): Promise<void> => {
    const newPositionList = lists
      ?.filter((list) => list.position !== position)
      .map((list, index) => ({ id: list.id, position: index + 1 }));

    if (boardId && newPositionList) {
      await putPositionList(boardId, newPositionList);
      await dispatch(getListsBoardByIdServiceThunk(Number(boardId)));
    }
  };

  return (
    <div className={styles.positionTitleAndList}>
      <div className={styles.name}>
        <NameBoard nameBoard={title || ''} boardId={boardId ? Number(boardId) : null} />
      </div>
      <div className={styles.listBlock} style={{ backgroundColor: custom?.background ? custom.background : '#ffffff' }}>
        <ol className={styles.lists}>
          {lists?.map((list) => <List key={list.id} idBoard={boardId} list={list} updatePosition={updatePosition} />)}
          <AddNewList key={boardId} position={lists ? lists.length + 1 : 1} />
        </ol>
      </div>
    </div>
  );
}

export default React.memo(BoardLists);
