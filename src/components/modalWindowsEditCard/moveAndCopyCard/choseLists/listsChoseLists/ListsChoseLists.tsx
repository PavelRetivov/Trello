import React from 'react';
import IList from '../../../../../interface/IDataList';
import styles from '../../../../../styles/globalStyle.module.scss';

interface propsListsChoseLists {
  boardLists: IList[] | null;
  handleItemClickList: (list: IList) => Promise<void>;
  filter: string;
  listId: number | null;
}
function ListsChoseLists({ boardLists, handleItemClickList, filter, listId }: propsListsChoseLists): JSX.Element {
  return (
    <ul className={styles.choseList}>
      {boardLists
        ?.filter((list) => list.title.toLowerCase().includes(filter.toLowerCase()))
        .map((list) => (
          <li key={list.id} onClick={() => handleItemClickList(list)}>
            <h3>{list.title}</h3>
            {listId === list.id && <p>this list</p>}
          </li>
        ))}
    </ul>
  );
}

export default ListsChoseLists;
