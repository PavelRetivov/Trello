import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import ICard from '../../interface/IDataCard';
import styles from '../../styles/globalStyle.module.scss';
import { useAppDispatch, useAppSelector } from '../../store';
import useCloseModalWindowsClick from '../../hooks/useCloseModalWindowsClick';
import { getListsBoardByIdServiceThunk, selectBoardList } from '../../module/board';
import NameCard from './nameCard/NameCart';
import NameList from './nameList/NameList';
import DescriptionCard from './descriptionCard/DescriptionCard';
import MoveAndCopyCard from './moveAndCopyCard/MoveAndCopyCard';
import { deleteCardInList, putPositionCard } from '../../services/Services';

interface ModalWindowsEditCardProps {
  modalCard: ICard | null;
  closeModalWindows: () => void;
  isOpen: boolean;
  listId: number | null;
  boardId: string | null;
}

const ModalWindowsEditCard = ({
  modalCard,
  closeModalWindows,
  isOpen,
  listId,
  boardId,
}: ModalWindowsEditCardProps): JSX.Element => {
  const [isMoveCard, setIsMoveCard] = useState(false);
  const [isCopyCard, setIsCopyCard] = useState(false);
  const [isOpenAction, setIsOpenAction] = useState(false);
  const lists = useAppSelector(selectBoardList);
  const list = listId ? lists[listId] : null;
  const [positionMoveCard, setPositionMoveCard] = useState({ x: 0, y: 0 });
  const dispatch = useAppDispatch();

  const handleClickForm = (event: React.MouseEvent<HTMLDivElement>): void => {
    event.preventDefault();
  };

  const openModalWindowsMoveCard = (event: React.MouseEvent): void => {
    setPositionMoveCard({ x: event.clientX, y: event.clientY });
    setIsMoveCard(true);
    setIsOpenAction(true);
  };

  const openModalWindowsCopyCard = (event: React.MouseEvent): void => {
    setPositionMoveCard({ x: event.clientX, y: event.clientY });
    setIsCopyCard(true);
    setIsOpenAction(true);
  };
  const deleteCard = async (): Promise<void> => {
    if (boardId && modalCard && list && listId) {
      await deleteCardInList(boardId, modalCard.id);
      const updatePositionCard = list.cards
        .filter((card) => card.id !== modalCard.id)
        .map((card, index) => {
          return { id: card.id, position: index + 1, list_id: listId };
        });
      await putPositionCard(boardId, updatePositionCard);
      await dispatch(getListsBoardByIdServiceThunk(Number(boardId)));
      closeModalWindows();
    }
  };

  const closeModalWindowsMoveCardInAnotherPlace = (event: MouseEvent): void => {
    const target = event.target as HTMLElement;

    if (target.closest(`.${styles.moveCardInAnotherPlace}`)) {
      console.log('hz6');
    } else {
      setIsOpenAction(false);
      setIsCopyCard(false);
      setIsMoveCard(false);
    }
  };

  const closeModalWindowsEditCard = (event: MouseEvent): void => {
    const target = event.target as HTMLElement;

    if (target.closest(`.${styles.windowsEditCard}`)) {
      console.log('hz5');
    } else {
      closeModalWindows();
    }
  };

  useCloseModalWindowsClick({ isOpen: isOpenAction, closeListsBoardName: closeModalWindowsMoveCardInAnotherPlace });
  useCloseModalWindowsClick({ isOpen, closeListsBoardName: closeModalWindowsEditCard });

  return ReactDOM.createPortal(
    <div className={styles.ModalWindowsEditCard}>
      <div className={styles.windowsEditCard} onClick={handleClickForm}>
        <div className={styles.leftBlockEditCard}>
          <div className={styles.headerLeftBlock}>
            <NameCard
              title={modalCard ? modalCard.title : ''}
              cardId={modalCard ? modalCard.id : null}
              listId={listId}
            />
            <NameList title={list ? list.title : null} openModalWindowsMoveCard={openModalWindowsMoveCard} />
          </div>
          <footer className={styles.description}>
            <DescriptionCard description={modalCard ? modalCard.description : null} listId={listId} />
          </footer>
        </div>
        <div className={styles.rightBlockEditCard}>
          <div className="headerRightBlock">
            <h3>actions with card</h3>
          </div>
          <div className={styles.actions}>
            <button onClick={openModalWindowsMoveCard}>Move</button>
            <button onClick={openModalWindowsCopyCard}>Copy card</button>
            <button onClick={deleteCard}>Delete</button>
            <button onClick={closeModalWindows}>Close</button>
          </div>
        </div>
        {isOpenAction ? (
          <MoveAndCopyCard
            x={positionMoveCard.x}
            y={positionMoveCard.y}
            modalCard={modalCard}
            closeModalWindows={closeModalWindows}
            isCopyCard={isCopyCard}
            isMoveCard={isMoveCard}
            nativeListId={listId}
            setIsOpenAction={setIsOpenAction}
          />
        ) : null}
      </div>
    </div>,
    document.getElementById('root') as HTMLElement
  );
};

export default ModalWindowsEditCard;
