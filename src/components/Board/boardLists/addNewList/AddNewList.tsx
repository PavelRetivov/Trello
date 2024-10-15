import React, { useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { GenericHTMLFormElement } from 'axios';
import styles from '../../../../styles/pageBoardStyle.module.scss';
import { useAppDispatch } from '../../../../store';
import { getListsBoardByIdServiceThunk, postListInBoardByIdThunk } from '../../../../module/board';
import useOutsideClick from '../../../../hooks/useOutsideClick';

function AddNewList(addListProps: { position: number }): JSX.Element {
  const { position } = addListProps;
  const { boardId } = useParams();
  const inputNameList = useRef<HTMLInputElement>(null);
  const formAddList = useRef<HTMLFormElement>(null);
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState(false);

  const addNewList = async (): Promise<void> => {
    if (boardId && inputNameList.current?.value && inputNameList.current.value.length > 1) {
      await dispatch(postListInBoardByIdThunk({ idBoard: boardId, title: inputNameList.current.value, position }));
      await dispatch(getListsBoardByIdServiceThunk(Number(boardId)));
      inputNameList.current.value = '';
    }
  };

  useOutsideClick({ inputRef: formAddList, isOpen, setIsOpen });

  const handleSubmit = async (event: React.FormEvent<GenericHTMLFormElement>): Promise<void> => {
    event.preventDefault();
    await addNewList();
  };

  return (
    <div className={styles.windowsAddList}>
      {!isOpen ? (
        <button
          className={styles.openBlockAddList}
          onClick={() => {
            setIsOpen(true);
          }}
        >
          add list
        </button>
      ) : (
        <form className={styles.blockAddList} ref={formAddList} onSubmit={handleSubmit}>
          <label className={styles.inputNameList} htmlFor="">
            {' '}
            Назва дошки
            <input ref={inputNameList} type="text" />
          </label>
          <div className={styles.buttonAddAndDelete}>
            <button type="submit">add</button>
            <button onClick={() => setIsOpen(false)}>close</button>
          </div>
        </form>
      )}
    </div>
  );
}

export default React.memo(AddNewList);
