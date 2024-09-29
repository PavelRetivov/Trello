import React from 'react';
import IList from '../../../../interface/IDataList';
import Card from './card/card';
import styles from '../../../../styles/pageBoardStyle.module.scss';
import { useAppDispatch } from '../../../../store';
import { deleteListInBoardThunk, getListsBoardByIdServiceThunk } from '../../../../module/board';
import AddNewCard from './addNewCard/AddNewCard';
import ListName from './listName/ListName';

interface listProps {
  list: IList;
  idBoard: string | undefined;
}

function List({ list, idBoard }: listProps): JSX.Element {
  const { id, title, cards } = list;
  const dispatch = useAppDispatch();

  const deleteList = async (): Promise<void> => {
    if (idBoard) {
      await dispatch(deleteListInBoardThunk({ idBoard, idList: id }));
      await dispatch(getListsBoardByIdServiceThunk(Number(idBoard)));
    }
  };

  return (
    <li className={styles.listSetting}>
      <div className={styles.listStyle}>
        <button className={styles.buttonDeleteList} onClick={deleteList}>
          delete
        </button>
        <ListName title={title} idList={id} idBoard={idBoard} />
        <div className={styles.cardsBlock}>{cards?.map((card) => <Card key={card.id} card={card} />)}</div>
        <AddNewCard idList={id} />
      </div>
    </li>
  );
}

export default React.memo(List);
