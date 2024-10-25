import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ChoseBoards from './choseBoards/ChoseBoards';
import ChoseLists from './choseLists/ChoseLists';
import IList from '../../../interface/IDataList';
import styles from '../../../styles/globalStyle.module.scss';
import ChosePosition from './chosePosition/ChosePosition';
import { useAppDispatch, useAppSelector } from '../../../store';
import ICard from '../../../interface/IDataCard';
import { getBoardByIdThunk, selectBoardList } from '../../../module/board';
import { moveCardAndNewBoard } from '../../../utils/cardUntils/moveCardAndMewBoard';
import { moveCardAndThisBoard } from '../../../utils/cardUntils/moveCardAndThisBoard';
import { postCardInList } from '../../../services/Services';

interface moveCardInAnotherPlaceProps {
  x: number;
  y: number;
  modalCard: ICard | null;
  closeModalWindows: () => void;
  isCopyCard: boolean;
  isMoveCard: boolean;
  nativeListId: number | null;
  setIsOpenAction: (isOpen: boolean) => void;
}

function MoveAndCopyCard({
  x,
  y,
  modalCard,
  closeModalWindows,
  isCopyCard,
  isMoveCard,
  nativeListId,
  setIsOpenAction,
}: moveCardInAnotherPlaceProps): JSX.Element {
  const [boardLists, setBoardLists] = useState<IList[] | null>(null);
  const [moveList, setMoveList] = useState<IList | null>(null);
  const [boardIdMove, setBoardIdMove] = useState<string | null>(null);
  const [positionCard, setPositionCard] = useState<number | null>(null);
  const [isThisList, setIsThisList] = useState(false);
  const { boardId, cardId } = useParams();
  const dispatch = useAppDispatch();
  const lists = useAppSelector(selectBoardList);

  useEffect(() => {
    if (moveList && moveList.id === nativeListId) {
      setIsThisList(true);
    } else {
      setIsThisList(false);
    }
  }, [moveList, nativeListId]);

  const moved = async (): Promise<void> => {
    if (boardId && nativeListId && boardIdMove && cardId && positionCard && moveList) {
      if (boardId !== boardIdMove) {
        if (modalCard) {
          await moveCardAndNewBoard({
            nativeBoardId: boardId,
            boardIdMove,
            modalCard,
            listIdMoved: moveList.id,
            positionCard,
            nativeList: lists[nativeListId],
          });
          await dispatch(getBoardByIdThunk(Number(boardId)));
          closeModalWindows();
        }
      } else {
        await moveCardAndThisBoard({
          moveList,
          cardId,
          positionCard,
          boardId,
          nativeList: lists[nativeListId],
        });
        await dispatch(getBoardByIdThunk(Number(boardId)));
        setIsOpenAction(false);
      }
    } else {
      console.log('no infa');
    }
  };

  const copy = async (): Promise<void> => {
    if (nativeListId && boardIdMove && cardId && positionCard && moveList) {
      if (modalCard) {
        await postCardInList({
          idBoard: boardIdMove,
          dataPost: {
            title: modalCard.title,
            listId: moveList.id,
            position: positionCard,
            description: modalCard.description,
            custom: modalCard.custom,
          },
        });
        await dispatch(getBoardByIdThunk(Number(boardId)));
      }
    } else {
      console.log('copynoInfa');
    }
  };
  return (
    <div className={styles.moveCardInAnotherPlace} style={{ left: x, top: y }}>
      {isMoveCard && <h3 className={styles.activeName}>moved card</h3>}
      {isCopyCard && <h3 className={styles.activeName}>copy card</h3>}
      <ChoseBoards setBoardLists={setBoardLists} setBoardId={setBoardIdMove} setList={setMoveList} />
      <div className={styles.containerChoseListsAndChosePosition}>
        <ChoseLists boardLists={boardLists} setList={setMoveList} listId={nativeListId} />
        <ChosePosition
          maxPosition={moveList ? moveList.cards.length : null}
          setPositionMovedCard={setPositionCard}
          isThisList={isThisList}
        />
      </div>
      {isMoveCard ? <button onClick={moved}>moved</button> : null}
      {isCopyCard ? <button onClick={copy}>copy</button> : null}
    </div>
  );
}

export default MoveAndCopyCard;
