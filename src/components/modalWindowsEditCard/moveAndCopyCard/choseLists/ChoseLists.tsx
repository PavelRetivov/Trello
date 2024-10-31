import React, { FormEvent, useEffect, useRef, useState } from 'react';
import styles from '../../../../styles/globalStyle.module.scss';
import IList from '../../../../interface/IDataList';
import ListsChoseLists from './listsChoseLists/ListsChoseLists';
import useCloseModalWindowsClick from '../../../../hooks/useCloseModalWindowsClick';

interface choseListProps {
  boardLists: IList[] | null;
  setList: (list: IList) => void;
  listId: number | null;
}

function ChoseLists({ boardLists, setList, listId }: choseListProps): JSX.Element {
  const [isOpenInputList, setIsOpenInputList] = useState(false);
  const [isFocus, setIsFocus] = useState(false);
  const [filter, setFilter] = useState('');
  const [selectedItemNameList, setSelectedItemNameList] = useState<string>('');
  const inputList = useRef<HTMLInputElement>(null);

  const addNeedTitle = (event: FormEvent): void => {
    event.preventDefault();
  };
  const handleItemClickList = async (list: IList): Promise<void> => {
    setSelectedItemNameList(list.title);
    setList(list);
    setIsOpenInputList(false);
  };

  const toggleDropDownLists = (): void => {
    setIsOpenInputList(!isOpenInputList);
    setFilter('');
  };

  const closeListsName = (event: MouseEvent): void => {
    const target = event.target as HTMLElement;

    if (target.closest(`.${styles.containerChoseLists}`)) {
      setIsOpenInputList(false);
    }
  };

  const searchTitle = (event: React.FormEvent<HTMLInputElement>): void => {
    if (!isOpenInputList) {
      setIsOpenInputList(true);
    }
    if (event.currentTarget) {
      setSelectedItemNameList(event.currentTarget.value);
      setFilter(event.currentTarget.value);
    }
  };

  useCloseModalWindowsClick({ isOpen: isFocus, closeListsBoardName: closeListsName });

  useEffect(() => {
    if (inputList.current) {
      setSelectedItemNameList('');
    }
  }, [boardLists, inputList]);

  return (
    <form className={styles.containerChoseLists} onSubmit={addNeedTitle}>
      <label htmlFor="">
        {' '}
        name list
        <input
          type="text"
          ref={inputList}
          value={boardLists ? selectedItemNameList : 'no variants'}
          placeholder={boardLists && boardLists.length > 0 ? 'selected chose' : 'no variants'}
          onInput={searchTitle}
          onClick={toggleDropDownLists}
          onFocus={() => setIsFocus(true)}
          readOnly={!(boardLists && boardLists.length > 1)}
        />
      </label>
      {isOpenInputList ? (
        <ListsChoseLists
          handleItemClickList={handleItemClickList}
          boardLists={boardLists}
          filter={filter}
          listId={listId}
        />
      ) : null}
    </form>
  );
}

export default ChoseLists;
