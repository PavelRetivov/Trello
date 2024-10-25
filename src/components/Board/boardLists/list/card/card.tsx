import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
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
  const divRef = useRef<HTMLDivElement>(null);
  const [isFocus, setIsFocus] = useState(false);
  const [draggingIndex, setDraggingIndex] = useState<number | null>(null);
  const [isVisibleBlockTop, setIsVisibleBlockTop] = useState(false);
  const [isVisibleBlockBot, setIsVisibleBlockBot] = useState(false);
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

  const handleDragStart = (event: React.DragEvent<HTMLDivElement>): void => {
    event.dataTransfer.setData('card', JSON.stringify(card));
    event.dataTransfer.setData('idList', listId.toString());
    setDraggingIndex(id);
    const dragImage = document.createElement('div');
    dragImage.innerText = 'Перетягнутий елемент';
    dragImage.style.backgroundColor = 'lightgray';
    dragImage.style.padding = '10px';
    dragImage.style.border = '1px solid black';

    event.dataTransfer.setDragImage(dragImage, 0, 0);
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>): void => {
    event.preventDefault();
    if (draggingIndex !== null && draggingIndex === id && divRef.current) {
      divRef.current.style.display = 'none';
    }
    // choice between create block from top and block from bot
    if (draggingIndex === null && draggingIndex !== id) {
      const rect = divRef.current?.getBoundingClientRect();
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

  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>): void => {
    event.stopPropagation();

    // check is there leave it is outside it block
    if (!divRef.current?.contains(event.relatedTarget as Node)) {
      setIsVisibleBlockBot(false);
      setIsVisibleBlockTop(false);
    }
  };

  const handleDrop = async (event: React.DragEvent<HTMLDivElement>): Promise<void> => {
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

  const handleDragEnd = (event: React.DragEvent<HTMLDivElement>): void => {
    event.preventDefault();
    if (divRef.current) {
      divRef.current.style.display = 'flex';
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

  const openEditCard = (): void => {
    navigate(`/board/${boardId}/card/${card?.id}`);
  };

  return (
    <div
      className={style.cards}
      ref={divRef}
      onDragStart={(event) => handleDragStart(event)}
      onDragOver={(event) => handleDragOver(event)}
      onDragLeave={handleDragLeave}
      onDragEnd={handleDragEnd}
      onDrop={handleDrop}
      draggable
    >
      {isVisibleBlockTop && <div className={style.pseudoCard} />}
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
      {isVisibleBlockBot && <div className={style.pseudoCard} />}
    </div>
  );
}

export default React.memo(Card);
