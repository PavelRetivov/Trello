import React from 'react';
import IList from '../../../../interface/IDataList';
import Card from './card/card';
import styles from '../../../../styles/pageBoardStyle.module.scss';
import { useAppDispatch } from '../../../../store';
import { deleteListInBoardThunk } from '../../../../module/board';
import AddNewCard from './addNewCard/AddNewCard';
import ListName from './listName/ListName';
import { putPositionCard } from '../../../../services/Services';

interface listProps {
  list: IList;
  idBoard: string | undefined;
  updatePosition: (position: number) => void;
}

function List({ list, idBoard, updatePosition }: listProps): JSX.Element {
  const { id, title, cards, position } = list;
  const dispatch = useAppDispatch();

  console.log(title, cards);

  const deleteList = async (): Promise<void> => {
    if (idBoard) {
      await dispatch(deleteListInBoardThunk({ idBoard, idList: id }));
      updatePosition(position);
    }
  };

  const updatePositionCard = async (deletePosition: number): Promise<void> => {
    const newPositionCard = cards
      .filter((card) => card.position !== deletePosition)
      .map((card, index) => ({ id: card.id, position: index }));
    if (idBoard) {
      await putPositionCard(idBoard, id, newPositionCard);
    }
  };

  return (
    <li className={styles.listSetting}>
      <div className={styles.listStyle}>
        <button className={styles.buttonDeleteList} onClick={deleteList}>
          delete
        </button>
        <ListName title={title} idList={id} idBoard={idBoard} />
        <div className={styles.cardsBlock}>
          {cards?.map((card) => <Card key={card.id} card={card} listId={id} updatePositionCard={updatePositionCard} />)}
        </div>
        <AddNewCard idList={id} position={cards.length + 1} />
      </div>
    </li>
  );
}

export default React.memo(List);
