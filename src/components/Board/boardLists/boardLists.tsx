import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getListsBoardByIdServiceThunk, selectBoard } from '../../../module/board';
import styles from '../../../styles/pageBoardStyle.module.scss';
import List from './list/list';
import NameBoard from './nameBoard/NameBoard';
import AddNewList from './addNewList/AddNewList';
import { putPositionList } from '../../../services/Services';
import { useAppDispatch, useAppSelector } from '../../../store';
import { selectDataEditCard } from '../../../module/modalEditCardSlice';
import { setIsOpen, updateModalEditCard } from '../../../module/modalEditCardSlice/modalEditCardSlice';
import ModalWindowsEditCard from '../../modalWindowsEditCard/ModalWindowsEditCard';

function BoardLists(boardDataId: { boardId: string | undefined }): JSX.Element {
  const { lists, title, custom } = useSelector(selectBoard);
  const { boardId } = boardDataId;
  const dispatch = useAppDispatch();
  const dataModalEditCard = useAppSelector(selectDataEditCard);
  const { isOpen, modalCard } = dataModalEditCard;
  const { cardId } = useParams();
  const navigate = useNavigate();
  const [listId, setListId] = useState<number | null>(null);

  console.log('lists', lists);

  useEffect(() => {
    if (cardId && lists) {
      const needList = Object.values(lists).find((list) => list.cards.some((card) => card.id === Number(cardId)));
      if (needList) {
        setListId(needList.id);
        const editCard = needList.cards.find((card) => card.id === Number(cardId));
        if (editCard) {
          dispatch(
            updateModalEditCard({
              isOpen: true,
              card: editCard,
            })
          );
        }
      }
    }
  }, [dispatch, cardId, lists]);

  useEffect(() => {
    if (title) document.title = title;
  }, [title]);

  const updatePosition = async (position: number): Promise<void> => {
    const newPositionList = Object.values(lists)
      .filter((list) => list.position !== position)
      .map((list, index) => ({ id: list.id, position: index + 1 }));

    if (boardId && newPositionList) {
      await putPositionList(boardId, newPositionList);
      await dispatch(getListsBoardByIdServiceThunk(Number(boardId)));
    }
  };

  const closeModalWindows = (): void => {
    dispatch(setIsOpen({ isOpen: false }));
    navigate(`/board/${boardId}`);
  };

  return (
    <div className={styles.positionTitleAndList}>
      <div className={styles.name}>
        <NameBoard nameBoard={title || ''} boardId={boardId ? Number(boardId) : null} />
      </div>
      <div className={styles.listBlock} style={{ backgroundColor: custom?.background ? custom.background : '#ffffff' }}>
        <ol className={styles.lists}>
          {Object.values(lists)?.map((list) => (
            <List key={list.id} idBoard={boardId} list={list} updatePosition={updatePosition} />
          ))}
          <AddNewList key={boardId} position={lists ? Object.values(lists).length + 1 : 1} />
        </ol>
      </div>
      {isOpen ? (
        <ModalWindowsEditCard
          modalCard={modalCard}
          closeModalWindows={closeModalWindows}
          isOpen={isOpen}
          listId={listId}
          boardId={boardId || null}
        />
      ) : null}
    </div>
  );
}

export default React.memo(BoardLists);
