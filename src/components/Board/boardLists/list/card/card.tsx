import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import ICard from '../../../../../interface/IDataCard';
import { deleteCardInList, putCardNameInList } from '../../../../../services/Services';
import { useAppDispatch } from '../../../../../store';
import { getListsBoardByIdServiceThunk } from '../../../../../module/board';
import style from '../../../../../styles/pageBoardStyle.module.scss';

interface cardPros {
  card: ICard;
  listId: number;
  updatePositionCard: (idCard: number) => void;
}

function Card({ card, listId, updatePositionCard }: cardPros): JSX.Element {
  const { boardId } = useParams();
  const { title, id } = card;
  const dispatch = useAppDispatch();
  const inputRef = useRef<HTMLInputElement>(null);
  const [isFocus, setIsFocus] = useState(false);

  const handleDeleteCard = async (): Promise<void> => {
    if (boardId) {
      await deleteCardInList(boardId, id);
      updatePositionCard(id); // not working 0_0
      await dispatch(getListsBoardByIdServiceThunk(Number(boardId)));
    }
  };

  const handleClick = (event: React.FormEvent): void => {
    event.preventDefault();
  };

  useEffect(() => {
    const handleEditCard = async (): Promise<void> => {
      if (isFocus && boardId && inputRef.current && inputRef.current.value.length > 1) {
        await putCardNameInList(boardId, listId, id, inputRef.current.value);
        await dispatch(getListsBoardByIdServiceThunk(Number(boardId)));
        setIsFocus(false);
      } else if (inputRef.current) {
        inputRef.current.value = title;
        setIsFocus(false);
      }
    };

    if (isFocus) {
      document.addEventListener('mousedown', handleEditCard);
    } else {
      document.removeEventListener('mousedown', handleEditCard);
    }

    return (): void => {
      document.removeEventListener('mousedown', handleEditCard);
    };
  }, [isFocus, boardId, dispatch, listId, id, title]);

  return (
    <form className={style.card} action="" onSubmit={handleClick}>
      <input
        className={style.cardName}
        type="text"
        defaultValue={title}
        ref={inputRef}
        onFocus={() => {
          setIsFocus(true);
        }}
      />
      <button onClick={handleDeleteCard}>X</button>
    </form>
  );
}

export default React.memo(Card);
