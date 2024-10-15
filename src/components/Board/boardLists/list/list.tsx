import React, { useState } from 'react';
import IList from '../../../../interface/IDataList';
import Card from './card/card';
import styles from '../../../../styles/pageBoardStyle.module.scss';
import { useAppDispatch, useAppSelector } from '../../../../store';
import { deleteListInBoardThunk, getListsBoardByIdServiceThunk, selectBoardList } from '../../../../module/board';
import AddNewCard from './addNewCard/AddNewCard';
import ListName from './listName/ListName';
import { deleteCardInList, postCardInList, putPositionCard } from '../../../../services/Services';
import ICard from '../../../../interface/IDataCard';

interface listProps {
  list: IList;
  idBoard: string | undefined;
  updatePosition: (position: number) => void;
}

function List({ list, idBoard, updatePosition }: listProps): JSX.Element {
  const { id, title, cards, position } = list;
  const dispatch = useAppDispatch();
  const [isVisibleBlock, setIsVisibleBlock] = useState(false);
  const lists = useAppSelector(selectBoardList);

  const deleteList = async (): Promise<void> => {
    if (idBoard) {
      await dispatch(deleteListInBoardThunk({ idBoard, idList: id }));
      updatePosition(position);
    }
  };

  const updatePositionCardHandleDelete = async (
    deleteId: number,
    isAnotherId?: boolean,
    idListAnotherCard?: number
  ): Promise<void> => {
    let newPositionCard = [];
    if (isAnotherId) {
      const selectedList = lists.find((valueList) => valueList.id === idListAnotherCard);
      if (selectedList) {
        newPositionCard = selectedList.cards
          .filter((card) => card.id !== deleteId)
          .map((card, index) => ({ id: card.id, position: index + 1, list_id: selectedList.id }));
      } else {
        return;
      }
    } else {
      newPositionCard = cards
        .filter((card) => card.id !== deleteId)
        .map((card, index) => ({ id: card.id, position: index + 1, list_id: id }));
    }
    if (idBoard) {
      await putPositionCard(idBoard, newPositionCard);
    }
  };

  const handleDragEnter = (event: React.DragEvent<HTMLDivElement>): void => {
    const targetElement = event.target as HTMLElement;
    const parentElement = targetElement.closest(`.${styles.card}`);
    if (parentElement) {
      setIsVisibleBlock(false);
    } else {
      setIsVisibleBlock(true);
    }
  };

  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>): void => {
    const targetElement = event.target as HTMLElement;
    const parentElement = targetElement.closest(`.${styles.card}`);
    if (!event.currentTarget.contains(event.relatedTarget as Node) || parentElement) {
      setIsVisibleBlock(false);
    }
  };

  const handleDrop = async (event: React.DragEvent<HTMLDivElement>): Promise<void> => {
    event.preventDefault();
    if (isVisibleBlock && idBoard) {
      const dataCard = event.dataTransfer.getData('card');
      const idListAnotherCard = Number(event.dataTransfer.getData('idList'));
      const parseCard: ICard = JSON.parse(dataCard);

      await deleteCardInList(idBoard, parseCard.id);
      if (id === idListAnotherCard) {
        await updatePositionCardHandleDelete(parseCard.id);
      } else {
        await updatePositionCardHandleDelete(parseCard.id, true, idListAnotherCard);
      }
      await postCardInList({
        idBoard,
        dataPost: { title: parseCard.title, listId: id, position: cards.length + 1 },
      });
    }
    await dispatch(getListsBoardByIdServiceThunk(Number(idBoard)));

    setIsVisibleBlock(false);
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>): void => {
    event.preventDefault();
  };

  return (
    <li className={styles.listSetting}>
      <div
        className={styles.listStyle}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <button className={styles.buttonDeleteList} onClick={deleteList}>
          delete
        </button>
        <ListName title={title} idList={id} idBoard={idBoard} />
        <div className={styles.cardsBlock}>
          {cards?.map((card) => (
            <Card
              key={card.id}
              card={card}
              listId={id}
              updatePositionCardHandleDelete={updatePositionCardHandleDelete}
            />
          ))}
          {isVisibleBlock && <div>helloPeople</div>}
        </div>
        <AddNewCard idList={id} position={cards.length + 1} />
      </div>
    </li>
  );
}

export default React.memo(List);
