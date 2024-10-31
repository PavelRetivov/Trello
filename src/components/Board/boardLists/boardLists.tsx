import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getListsBoardByIdServiceThunk, selectBoard } from '../../../module/board';
import styles from '../../../styles/pageBoardStyle.module.scss';
import List from './list/list';
import NameBoard from './nameBoard/NameBoard';
import AddNewList from './addNewList/AddNewList';
import { putPositionList } from '../../../services/Services';
import { useAppDispatch, useAppSelector } from '../../../store';
import { selectDataEditCard } from '../../../module/modalEditCardSlice';
import { setIsOpen, updateModalEditCard } from '../../../module/modalEditCardSlice/modalEditCardSlice';
import ModalWindowsEditCard from '../../modalWindowsEditCard/ModalWindowsEditCard';
import {
  activateCardBotIndicatorBlock,
  activateCardTopIndicatorBlock,
  resetStateDragAndDrop,
} from '../../../module/dragAndDrop/dragAndDropSlice.slice';
import { selectDragAndDropData } from '../../../module/dragAndDrop';
import {
  getActiveBlockPositionOnAnotherList,
  getActiveBlockPositionOnCurrentList,
} from '../../../utils/dragAndDropUtils/dragAndDropCardUtil';
import { moveCardAndDragAndDrop } from '../../../utils/cardUntils/moveCardAndDragAndDrop';
import { updateCardsInList } from '../../../module/board/board.slice';

function BoardLists(boardDataId: { boardId: string | undefined }): JSX.Element {
  const { boardId } = boardDataId;

  const { cardId } = useParams();

  const navigate = useNavigate();

  const [targetListId, setTargetListId] = useState<number | null>(null);
  const [isDropped, setIsDropped] = useState(false);

  const dispatch = useAppDispatch();
  const { title, custom, lists } = useSelector(selectBoard);
  const { isOpen, modalCard } = useAppSelector(selectDataEditCard);
  const {
    dropCardId,
    dropListId,
    dragCardId,
    cardDropPosition,
    cardBotIndicatorBlock,
    cardTopIndicatorBlock,
    listIndicatorBlock,
  } = useAppSelector(selectDragAndDropData);

  /**
   * if i have cardId means than new moment need open modal edit card
   */
  useEffect(() => {
    if (cardId && lists) {
      const targetList = Object.values(lists).find((list) => list.cards.some((card) => card.id === Number(cardId)));
      if (targetList) {
        setTargetListId(targetList.id);
        const editingCard = targetList.cards.find((card) => card.id === Number(cardId));
        if (editingCard) {
          dispatch(
            updateModalEditCard({
              isOpen: true,
              card: editingCard,
            })
          );
        }
      }
    }
  }, [dispatch, cardId, lists]);

  /*
  setting the title page
  */
  useEffect(() => {
    if (title) document.title = title;
  }, [title]);

  /* 
  update position lists later remove list in board
  */
  const updatePositionLists = async (position: number): Promise<void> => {
    const newPositionList = Object.values(lists)
      .filter((list) => list.position !== position)
      .map((list, index) => ({ id: list.id, position: index + 1 }));

    if (boardId && newPositionList) {
      await putPositionList(boardId, newPositionList);
      await dispatch(getListsBoardByIdServiceThunk(Number(boardId)));
    }
  };

  const closeModalWindows = (): void => {
    dispatch(setIsOpen({ isOpen: false }));
    navigate(`/board/${boardId}`);
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>): void => {
    event.preventDefault();

    const target = event.target as HTMLElement; // take element witch point to mouse
    const closestCard = target.closest(`.${styles.card}`); // search component when have class card

    if (closestCard && dragCardId !== dropCardId) {
      const rect = closestCard.getBoundingClientRect(); // get size and position element
      const middleY = rect.top + rect.height / 2; // get middleY block
      const cursorY = event.clientY; // get position cursorY

      if (cursorY < middleY) {
        dispatch(activateCardTopIndicatorBlock({ dataBlock: true }));
      } else {
        dispatch(activateCardBotIndicatorBlock({ dataBlock: true }));
      }
    }
  };

  const handleOnDrop = async (event: React.DragEvent<HTMLDivElement>): Promise<void> => {
    // get card for drop
    const dragCard = event.dataTransfer.getData('dragCard/json');
    let parseDragCard = null;
    if (dragCard) {
      parseDragCard = JSON.parse(dragCard);
    }

    // get data for chose drop
    const cardDragId = event.dataTransfer.getData('cardId');
    const cardDragListId = event.dataTransfer.getData('listId');
    const cardDragPosition = event.dataTransfer.getData('cardPosition');
    const droppedCard = document.getElementById(`${cardDragId}C`);
    setIsDropped(true);

    if (cardDragListId && cardDragId && dropListId && boardId && cardDragPosition) {
      let newPositionCard = null;
      if (dropListId === Number(cardDragListId)) {
        newPositionCard = getActiveBlockPositionOnCurrentList(
          cardTopIndicatorBlock,
          cardBotIndicatorBlock,
          listIndicatorBlock,
          cardDropPosition,
          cardDragPosition,
          lists[dropListId].cards.length
        );
      } else if (dropListId !== Number(cardDragId)) {
        newPositionCard = getActiveBlockPositionOnAnotherList(
          cardTopIndicatorBlock,
          cardBotIndicatorBlock,
          listIndicatorBlock,
          cardDropPosition,
          lists[dropListId].cards.length
        );
      }
      if (newPositionCard && boardId && parseDragCard) {
        const updateListOrLists = await moveCardAndDragAndDrop({
          moveList: lists[dropListId],
          nativeList: lists[Number(cardDragListId)],
          dragCard: parseDragCard,
          newPositionCard,
          boardId,
        });
        if (updateListOrLists && 'startList' in updateListOrLists) {
          dispatch(updateCardsInList({ list: updateListOrLists.startList }));
          dispatch(updateCardsInList({ list: updateListOrLists.dropList }));
        } else {
          dispatch(updateCardsInList({ list: updateListOrLists }));
        }
        dispatch(resetStateDragAndDrop());
      }
      // turn everything back if do nothing
      if (droppedCard) {
        droppedCard.style.display = 'flex';
        droppedCard.style.opacity = '1';
        dispatch(resetStateDragAndDrop());
      }
    } // turn everything back if card no move
    else if (droppedCard) {
      droppedCard.style.display = 'flex';
      droppedCard.style.opacity = '1';
      dispatch(resetStateDragAndDrop());
    }
  };

  const handleDragEnd = (): void => {
    // if drop no happened reset data
    if (!isDropped && dragCardId) {
      const droppedCard = document.getElementById(`${dragCardId}C`);
      if (droppedCard) {
        droppedCard.style.display = 'flex';
        droppedCard.style.opacity = '1';
      }
      dispatch(resetStateDragAndDrop());
    }
    setIsDropped(false);
  };

  return (
    <div
      className={styles.positionTitleAndList}
      onDragOver={handleDragOver}
      onDrop={handleOnDrop}
      onDragEnd={handleDragEnd}
    >
      <div className={styles.name}>
        <NameBoard nameBoard={title || ''} boardId={boardId ? Number(boardId) : null} />
      </div>
      <div className={styles.listBlock} style={{ backgroundColor: custom?.background ? custom.background : '#ffffff' }}>
        <ol className={styles.lists}>
          {Object.values(lists)?.map((list) => (
            <List key={list.id} idBoard={boardId} list={list} updatePosition={updatePositionLists} />
          ))}
          <AddNewList key={boardId} position={lists ? Object.values(lists).length + 1 : 1} />
        </ol>
      </div>
      {isOpen ? (
        <ModalWindowsEditCard
          modalCard={modalCard}
          closeModalWindows={closeModalWindows}
          isOpen={isOpen}
          listId={targetListId}
          boardId={boardId || null}
        />
      ) : null}
    </div>
  );
}

export default React.memo(BoardLists);
