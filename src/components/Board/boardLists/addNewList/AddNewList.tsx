import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from '../../../../styles/pageBoardStyle.module.scss';
import { useAppDispatch } from '../../../../store';
import { getListsBoardByIdServiceThunk, postListInBoardByIdThunk } from '../../../../module/board';

function AddNewList(): JSX.Element {
  const { boardId } = useParams();
  const inputNameList = useRef<HTMLInputElement>(null);
  const formAddList = useRef<HTMLFormElement>(null);
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState(false);

  const addNewList = async (): Promise<void> => {
    if (boardId && inputNameList.current?.value && inputNameList.current.value.length > 1) {
      await dispatch(postListInBoardByIdThunk({ idBoard: boardId, title: inputNameList.current.value }));
      await dispatch(getListsBoardByIdServiceThunk(Number(boardId)));
      inputNameList.current.value = '';
    }
  };

  const handleClick = (event: MouseEvent): void => {
    if (formAddList.current && !formAddList.current.contains(event.target as Node)) {
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

  return (
    <div className={styles.windowsAddList}>
      {!isOpen ? (
        <button
          className={styles.openBlockAddList}
          onClick={() => {
            setIsOpen(true);
          }}
        >
          add card
        </button>
      ) : (
        <form className={styles.blockAddList} ref={formAddList}>
          <label className={styles.inputNameList} htmlFor="">
            {' '}
            Назва дошки
            <input ref={inputNameList} type="text" />
          </label>
          <div className={styles.buttonAddAndDelete}>
            <button onClick={addNewList}>add</button>
            <button onClick={() => setIsOpen(false)}>close</button>
          </div>
        </form>
      )}
    </div>
  );
}

export default React.memo(AddNewList);
