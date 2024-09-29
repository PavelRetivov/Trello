import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import TextareaAutosize from 'react-textarea-autosize';
import { useAppDispatch } from '../../../../../store';
import styles from '../../../../../styles/pageBoardStyle.module.scss';
import { getListsBoardByIdServiceThunk, postCardInListThunk } from '../../../../../module/board';

function AddNewCard(data: { idList: number }): JSX.Element {
  const { idList } = data;
  const { boardId } = useParams();
  const textAreaNameList = useRef<HTMLTextAreaElement>(null);
  const formAddCard = useRef<HTMLFormElement>(null);
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = (event: MouseEvent): void => {
    if (formAddCard.current && !formAddCard.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleClick);
    } else {
      document.removeEventListener('mousedown', handleClick);
    }

    return (): void => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, [isOpen]);

  const addCard = async (): Promise<void> => {
    if (boardId && textAreaNameList.current) {
      await dispatch(
        postCardInListThunk({
          idBoard: boardId,
          dataPost: { title: textAreaNameList.current.value, listId: idList, position: 1 },
        })
      );
      await dispatch(getListsBoardByIdServiceThunk(Number(boardId)));
      textAreaNameList.current.value = '';
    }
  };

  const handelSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
  };

  return (
    <div className={styles.windowsAddCard}>
      {!isOpen ? (
        <button
          className={styles.openBlockAddCard}
          onClick={() => {
            setIsOpen(true);
          }}
        >
          add card
        </button>
      ) : (
        <form className={styles.blockAddCard} ref={formAddCard} onSubmit={handelSubmit}>
          <TextareaAutosize className={styles.textAreaCard} minRows={1} ref={textAreaNameList} />
          <div className={styles.buttonAddAndDeleteCard}>
            <button className={styles.buttonAddCard} onClick={addCard}>
              add
            </button>
            <button className={styles.buttonCloseCard} onClick={() => setIsOpen(false)}>
              close
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default React.memo(AddNewCard);
