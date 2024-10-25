import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import useCloseModalWindowsClick from '../../../hooks/useCloseModalWindowsClick';
import styles from '../../../styles/globalStyle.module.scss';
import { putCardNameInList } from '../../../services/Services';
import { useAppDispatch } from '../../../store';
import { getListsBoardByIdServiceThunk } from '../../../module/board';
import { updateTitleCard } from '../../../module/modalEditCardSlice/modalEditCardSlice';

interface nameCardProps {
  title: string;
  cardId: number | null;
  listId: number | null;
}

function NameCard({ title, cardId, listId }: nameCardProps): JSX.Element {
  const [isEditCard, setIsEditCard] = useState(false);
  const [inputValue, setInputValue] = useState(title);
  const inputRef = useRef<HTMLInputElement>(null);
  const { boardId } = useParams();
  const dispatch = useAppDispatch();

  const editCard = (event: React.FormEvent<HTMLInputElement>): void => {
    if (event.currentTarget) {
      setInputValue(event.currentTarget.value);
    }
  };

  const acceptEditNameCard = async (): Promise<void> => {
    if (inputRef.current && inputRef.current.value.length > 1 && inputRef.current.value !== title) {
      if (boardId && listId && cardId) {
        const resultUpdateCard = await putCardNameInList(boardId, listId, cardId, inputRef.current.value);
        dispatch(getListsBoardByIdServiceThunk(Number(boardId)));
        if (resultUpdateCard === 'Updated') {
          dispatch(updateTitleCard({ newTitle: inputRef.current.value }));
        }
      }
    } else {
      setInputValue(title);
    }
    setIsEditCard(false);
  };

  const submitForm = (event: React.FormEvent): void => {
    event.preventDefault();
    acceptEditNameCard();
  };

  const closeInputEditCard = (event: MouseEvent): void => {
    const target = event.target as HTMLElement;
    console.log('parentElement', target.parentElement);

    if (target.closest(`.${styles.nameCard}`)) {
      console.log('hz');
    } else {
      acceptEditNameCard();
    }
  };

  useEffect(() => {
    if (isEditCard) {
      if (inputRef.current) inputRef.current.focus();
    }
  }, [isEditCard]);

  useCloseModalWindowsClick({ isOpen: isEditCard, closeListsBoardName: closeInputEditCard });

  return (
    <form onSubmit={submitForm} className={styles.nameCard}>
      <img src={`${process.env.PUBLIC_URL}/iconCard.png`} alt="iconCard" />
      {!isEditCard && (
        <h3 className={styles.editNameCard} onClick={() => setIsEditCard(true)}>
          {title}
        </h3>
      )}
      {isEditCard && (
        <input className={styles.editNameCard} ref={inputRef} type="text" value={inputValue} onInput={editCard} />
      )}
    </form>
  );
}

export default NameCard;
