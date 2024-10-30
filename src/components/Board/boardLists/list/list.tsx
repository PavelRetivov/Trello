import React, { useRef } from 'react';
import IList from '../../../../interface/IDataList';
import Card from './card/card';
import styles from '../../../../styles/pageBoardStyle.module.scss';
import { useAppDispatch, useAppSelector } from '../../../../store';
import { deleteListInBoardThunk, selectBoardList } from '../../../../module/board';
import AddNewCard from './addNewCard/AddNewCard';
import ListName from './listName/ListName';
import { putPositionCard } from '../../../../services/Services';
import {
  activateListPseudoBlock,
  setCardDropPosition,
  setDropCardId,
  setDropListId,
} from '../../../../module/dragAndDrop/dragAndDropSlice.slice';
import { selectDropListId, selectListPseudoBlock } from '../../../../module/dragAndDrop';

interface listProps {
  list: IList;
  idBoard: string | undefined;
  updatePosition: (position: number) => void;
}

function List({ list, idBoard, updatePosition }: listProps): JSX.Element {
  const { id, title, cards, position } = list;
  const dispatch = useAppDispatch();
  const lists = useAppSelector(selectBoardList);
  const dropListId = useAppSelector(selectDropListId);
  const pseudoBlock = useAppSelector(selectListPseudoBlock);
  const liRef = useRef<HTMLLIElement>(null);

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
      const selectedList = Object.values(lists).find((valueList) => valueList.id === idListAnotherCard);
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

  const handleDragOver = (event: React.DragEvent<HTMLLIElement>): void => {
    event.preventDefault();
  };

  const handleDragEnter = (event: React.DragEvent<HTMLLIElement>): void => {
    event.preventDefault();

    if (dropListId !== id) {
      dispatch(setDropListId({ id }));
      dispatch(setDropCardId({ id: null }));
      dispatch(setCardDropPosition({ position: null }));
      dispatch(activateListPseudoBlock({ dataBlock: true }));
    }
  };

  const checkPseudoBlock = (): boolean => {
    if (pseudoBlock && list.id === dropListId) {
      return true;
    }
    return false;
  };

  return (
    <li className={styles.listSetting} onDragOver={handleDragOver} onDragEnter={handleDragEnter} ref={liRef}>
      <div className={styles.listStyle}>
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
          {checkPseudoBlock() && <div className={styles.pseudoCard} />}
        </div>
        <AddNewCard idList={id} position={cards.length + 1} />
      </div>
    </li>
  );
}

export default React.memo(List);
