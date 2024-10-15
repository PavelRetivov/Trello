import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import ICard from '../../../../../interface/IDataCard';
import { deleteCardInList, postCardInList, putCardNameInList } from '../../../../../services/Services';
import { useAppDispatch } from '../../../../../store';
import { getListsBoardByIdServiceThunk } from '../../../../../module/board';
import style from '../../../../../styles/pageBoardStyle.module.scss';

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
  const [isFocus, setIsFocus] = useState(false);
  const [draggingIndex, setDraggingIndex] = useState<number | null>(null);
  const [isVisibleBlockTop, setIsVisibleBlockTop] = useState(false);
  const [isVisibleBlockBot, setIsVisibleBlockBot] = useState(false);

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

  const handleDragStart = (event: React.DragEvent<HTMLFormElement>): void => {
    event.dataTransfer.setData('card', JSON.stringify(card));
    event.dataTransfer.setData('idList', listId.toString());
    if (formRef.current) {
      formRef.current.style.opacity = '0.5';
    }
    setDraggingIndex(id);
  };

  const handleDragOver = (event: React.DragEvent<HTMLFormElement>): void => {
    event.preventDefault();
    // choice between create block from top and block from bot
    if (draggingIndex === null && draggingIndex !== id) {
      const rect = formRef.current?.getBoundingClientRect();
      if (rect) {
        const offsetY = event.clientY - rect.top;
        const middle = rect.height / 2;
        if (offsetY < middle) {
          if (!isVisibleBlockTop) {
            setIsVisibleBlockTop(true);
            setIsVisibleBlockBot(false);
          }
        } else if (!isVisibleBlockBot) {
          setIsVisibleBlockBot(true);
          setIsVisibleBlockTop(false);
        }
      }
    }
  };

  const handleDragLeave = (event: React.DragEvent<HTMLFormElement>): void => {
    event.stopPropagation();

    // check is there leave it is outside it block
    if (!formRef.current?.contains(event.relatedTarget as Node)) {
      setIsVisibleBlockBot(false);
      setIsVisibleBlockTop(false);
    }
  };

  const handleDrop = async (event: React.DragEvent<HTMLFormElement>): Promise<void> => {
    if (draggingIndex !== null && draggingIndex === id) {
      return;
    }
    event.preventDefault();
    const dataCard = event.dataTransfer.getData('card');
    const idListAnotherCard = Number(event.dataTransfer.getData('idList'));
    const parseCard: ICard = JSON.parse(dataCard);

    if (boardId) {
      if (isVisibleBlockTop) {
        if (parseCard.position < position && idListAnotherCard === listId) {
          parseCard.position = position - 1;
        } else {
          parseCard.position = position;
        }
      } else if (isVisibleBlockBot) {
        if (parseCard.position < position && idListAnotherCard === listId) {
          parseCard.position = position;
        } else {
          parseCard.position = position + 1;
        }
      }
      await deleteCardInList(boardId, parseCard.id);
      if (listId === idListAnotherCard) {
        await updatePositionCardHandleDelete(parseCard.id);
      } else {
        await updatePositionCardHandleDelete(parseCard.id, true, idListAnotherCard);
      }
      await postCardInList({
        idBoard: boardId,
        dataPost: { title: parseCard.title, listId, position: parseCard.position },
      });
    }
    await dispatch(getListsBoardByIdServiceThunk(Number(boardId)));

    setIsVisibleBlockBot(false);
    setIsVisibleBlockTop(false);
  };

  const handleDragEnd = async (event: React.DragEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    if (formRef.current) {
      formRef.current.style.opacity = '1';
    }
    setDraggingIndex(null);
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

  return (
    <form
      className={style.card}
      action=""
      onSubmit={handleClick}
      ref={formRef}
      onDragStart={(event) => handleDragStart(event)}
      onDragOver={(event) => handleDragOver(event)}
      onDragLeave={handleDragLeave}
      onDragEnd={handleDragEnd}
      onDrop={handleDrop}
      draggable
    >
      {isVisibleBlockTop && <div className={style.pseudoCard} />}
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
      <div className={style.buttons}>
        <button onClick={() => setIsFocus(true)} className={style.edit}>
          <img src={`${process.env.PUBLIC_URL}/edit.png`} alt="edit" />
        </button>
        <button onClick={handleDeleteCard} className={style.delete}>
          X
        </button>
      </div>
      {isVisibleBlockBot && <div className={style.pseudoCard} />}
    </form>
  );
}

export default React.memo(Card);
