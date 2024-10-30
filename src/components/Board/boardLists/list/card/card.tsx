import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ICard from '../../../../../interface/IDataCard';
import { deleteCardInList, putCardNameInList } from '../../../../../services/Services';
import { useAppDispatch, useAppSelector } from '../../../../../store';
import { getListsBoardByIdServiceThunk } from '../../../../../module/board';
import style from '../../../../../styles/pageBoardStyle.module.scss';
import {
  setCardDropPosition,
  setDropCardId,
  setDropListId,
  setStartCardId,
} from '../../../../../module/dragAndDrop/dragAndDropSlice.slice';
import { selectBotBlock, selectDropCardId, selectTopBlock } from '../../../../../module/dragAndDrop';

interface cardPros {
  card: ICard;
  listId: number;
  updatePositionCardHandleDelete: (
    deleteId: number,
    isAnotherId?: boolean,
    idListAnotherCard?: number
  ) => Promise<void>;
}

function Card({ card, listId, updatePositionCardHandleDelete }: cardPros): JSX.Element {
  const { boardId } = useParams();
  const { title, id, position } = card;
  const dispatch = useAppDispatch();
  const inputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const divRef = useRef<HTMLDivElement>(null);
  const [isFocus, setIsFocus] = useState(false);
  const isVisibleBlockTop = useAppSelector(selectTopBlock);
  const isVisibleBlockBot = useAppSelector(selectBotBlock);
  const dropCardId = useAppSelector(selectDropCardId);
  const [isShowButtons, setIsShowButtons] = useState(false);
  const navigate = useNavigate();

  const handleDeleteCard = async (): Promise<void> => {
    if (boardId) {
      await deleteCardInList(boardId, id);
      await updatePositionCardHandleDelete(id);
      await dispatch(getListsBoardByIdServiceThunk(Number(boardId)));
    }
  };

  const handleClick = (event: React.FormEvent): void => {
    event.preventDefault();
    event.stopPropagation();
  };

  useEffect(() => {
    const handleEditCard = async (mouseEvent: MouseEvent): Promise<void> => {
      if (
        isFocus &&
        boardId &&
        inputRef.current &&
        inputRef.current.value.length > 1 &&
        !inputRef.current.contains(mouseEvent.target as Node)
      ) {
        await putCardNameInList(boardId, listId, id, inputRef.current.value);
        await dispatch(getListsBoardByIdServiceThunk(Number(boardId)));
        setIsFocus(false);
      } else if (inputRef.current && !inputRef.current.contains(mouseEvent.target as Node)) {
        inputRef.current.value = title;
        setIsFocus(false);
      }
    };

    if (isFocus) {
      document.addEventListener('mousedown', handleEditCard);
      inputRef?.current?.focus();
    } else {
      document.removeEventListener('mousedown', handleEditCard);
    }

    return (): void => {
      document.removeEventListener('mousedown', handleEditCard);
    };
  }, [isFocus, boardId, dispatch, listId, id, title]);

  const openEditCard = (): void => {
    navigate(`/board/${boardId}/card/${id}`);
  };

  const handleDragStart = (event: React.DragEvent<HTMLDivElement>): void => {
    dispatch(setDropListId({ id: listId }));
    dispatch(setStartCardId({ id }));
    dispatch(setDropCardId({ id }));
    event.dataTransfer.setData('cardId', id.toString());
    event.dataTransfer.setData('listId', listId.toString());
    event.dataTransfer.setData('cardPosition', position.toString());
  };

  const handleDragEnter = (): void => {
    if (dropCardId !== id) {
      dispatch(setDropCardId({ id }));
      dispatch(setCardDropPosition({ position }));
    }
  };

  const handleOnDrag = (): void => {
    if (dropCardId === id && divRef.current) {
      divRef.current.style.opacity = '0.5';
    } else if (divRef.current) {
      divRef.current.style.display = 'none';
    }
  };

  const checkTopBlock = (): boolean => {
    if (isVisibleBlockTop && dropCardId === id) {
      return true;
    }
    return false;
  };

  const checkBotBlock = (): boolean => {
    if (isVisibleBlockBot && dropCardId === id) {
      return true;
    }
    return false;
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>): void => {
    event.preventDefault();
  };

  return (
    <div
      id={`${card.id.toString()}C`}
      className={style.cards}
      ref={divRef}
      onDragOver={handleDragOver}
      onDragStart={handleDragStart}
      onDragEnter={handleDragEnter}
      onDrag={handleOnDrag}
      draggable
    >
      {checkTopBlock() && <div className={style.pseudoCard} />}

      <form
        className={style.card}
        action=""
        onSubmit={handleClick}
        onMouseEnter={() => setIsShowButtons(true)}
        onMouseLeave={() => setIsShowButtons(false)}
        ref={formRef}
        onClick={openEditCard}
      >
        {!isFocus ? (
          <h3>{title}</h3>
        ) : (
          <input
            className={style.cardName}
            type="text"
            defaultValue={title}
            ref={inputRef}
            onFocus={() => {
              setIsFocus(true);
            }}
          />
        )}
        <div className={style.buttons} style={{ display: isShowButtons ? 'flex' : 'none' }}>
          <button onClick={() => setIsFocus(true)} className={style.edit}>
            <img src={`${process.env.PUBLIC_URL}/edit.png`} alt="edit" />
          </button>
          <button onClick={handleDeleteCard} className={style.delete}>
            X
          </button>
        </div>
      </form>
      {checkBotBlock() && <div className={style.pseudoCard} />}
    </div>
  );
}

export default React.memo(Card);
