import React, { FormEvent, useRef, useState } from 'react';
import styles from '../../../../styles/globalStyle.module.scss';
import { getListsBoardByIdService } from '../../../../services/Services';
import IList from '../../../../interface/IDataList';
import { useAppSelector } from '../../../../store';
import { selectBoards } from '../../../../module/boards';
import ListsChoseBoards from './listsChoseBoards/listsChoseBoards';
import useCloseModalWindowsClick from '../../../../hooks/useCloseModalWindowsClick';

interface choseBoardProps {
  setBoardLists: (boardList: IList[]) => void;
  setBoardId: (boardId: string) => void;
  setList: (list: IList | null) => void;
}

function ChoseBoards({ setBoardLists, setBoardId, setList }: choseBoardProps): JSX.Element {
  const [selectedItemNameBoard, setSelectedItemNameBoard] = useState<string>('');
  const [isOpenInputBoard, setIsOpenInputBorder] = useState(false);
  const [isFocus, setIsFocus] = useState(false);
  const [filter, setFilter] = useState('');
  const inputBoard = useRef<HTMLInputElement>(null);
  const boards = useAppSelector(selectBoards);
  const formRef = useRef<HTMLFormElement>(null);

  const handleItemClickBoard = async (boardId: number, title: string): Promise<void> => {
    const boardList = await getListsBoardByIdService(boardId);
    setBoardId(boardId.toString());
    setBoardLists(boardList);
    setList(null);
    setIsOpenInputBorder(false);
    setSelectedItemNameBoard(title);
  };

  const toggleDropDownBoards = (): void => {
    setIsOpenInputBorder(!isOpenInputBoard);
    setFilter('');
  };

  const closeListsBoardName = (event: MouseEvent): void => {
    const target = event.target as HTMLElement;
    if (!target.closest(`.${styles.containerChoseBoards}`)) {
      setIsOpenInputBorder(false);
    }
  };

  const addNeedTitle = (event: FormEvent): void => {
    event.preventDefault();
  };

  const searchTitle = (event: React.FormEvent<HTMLInputElement>): void => {
    if (!isOpenInputBoard) {
      setIsOpenInputBorder(true);
    }
    if (event.currentTarget) {
      setSelectedItemNameBoard(event.currentTarget.value);
      setFilter(event.currentTarget.value);
    }
  };

  useCloseModalWindowsClick({ isOpen: isFocus, closeListsBoardName });

  return (
    <form className={styles.containerChoseBoards} ref={formRef} onSubmit={addNeedTitle}>
      <label htmlFor="">
        {' '}
        name board
        <input
          type="text"
          ref={inputBoard}
          onInput={searchTitle}
          value={boards ? selectedItemNameBoard : 'no variants'}
          placeholder={boards && boards.length > 1 ? 'selected chose' : 'no variants'}
          onClick={toggleDropDownBoards}
          onFocus={() => {
            setIsFocus(true);
          }}
        />
      </label>
      {isOpenInputBoard ? (
        <ListsChoseBoards handleItemClick={handleItemClickBoard} boards={boards} filter={filter} />
      ) : null}
    </form>
  );
}

export default ChoseBoards;
