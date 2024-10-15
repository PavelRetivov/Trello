import React, { useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import TextareaAutosize from 'react-textarea-autosize';
import { useAppDispatch } from '../../../../../store';
import styles from '../../../../../styles/pageBoardStyle.module.scss';
import { getListsBoardByIdServiceThunk, postCardInListThunk } from '../../../../../module/board';
import useOutsideClick from '../../../../../hooks/useOutsideClick';

function AddNewCard(addCardProps: { idList: number; position: number }): JSX.Element {
  const { idList, position } = addCardProps;
  const { boardId } = useParams();
  const textAreaNameList = useRef<HTMLTextAreaElement>(null);
  const formAddCard = useRef<HTMLFormElement>(null);
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState(false);

  useOutsideClick({ inputRef: formAddCard, isOpen, setIsOpen });

  const addCard = async (): Promise<void> => {
    if (boardId && textAreaNameList.current && textAreaNameList.current.value.length > 1) {
      await dispatch(
        postCardInListThunk({
          idBoard: boardId,
          dataPost: { title: textAreaNameList.current.value, listId: idList, position },
        })
      );
      await dispatch(getListsBoardByIdServiceThunk(Number(boardId)));
      textAreaNameList.current.value = '';
    }
  };

  const handelSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    await addCard();
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
            <button className={styles.buttonAddCard} type="submit">
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
