import IList from '../../interface/IDataList';
import { putPositionCard } from '../../services/Services';

interface moveCardAndThisBoardProps {
  moveList: IList;
  cardId: string;
  positionCard: number;
  boardId: string;
  nativeList: IList;
}
export const moveCardAndThisBoard = async ({
  moveList,
  cardId,
  positionCard,
  boardId,
  nativeList,
}: moveCardAndThisBoardProps): Promise<void> => {
  const cardsEdit = moveList.cards.map((card) => {
    return {
      id: card.id,
      position: card.position,
      list_id: moveList.id,
    };
  });
  const dataMovedCard = {
    id: Number(cardId),
    position: positionCard,
    list_id: moveList.id,
  };

  const moveCardAnotherList = async (): Promise<void> => {
    const firsHalfList = cardsEdit.slice(0, positionCard - 1);
    const secondHalfList = cardsEdit.slice(positionCard - 1).map((card) => {
      return { ...card, position: card.position + 1 };
    });
    const dataCards = firsHalfList.concat(dataMovedCard, secondHalfList);
    await putPositionCard(boardId, dataCards);
    const updatePositionSeparatedLists = nativeList.cards
      .filter((card) => card.id !== Number(cardId))
      .map((card, index) => {
        return { id: card.id, position: index + 1, list_id: nativeList.id };
      });
    await putPositionCard(boardId, updatePositionSeparatedLists);
  };

  const moveCardThisList = async (): Promise<void> => {
    const filterCards = cardsEdit
      .filter((card) => card.id !== Number(cardId))
      .map((card, index) => {
        return { ...card, position: index + 1 };
      });
    const firstHalfList = filterCards.slice(0, positionCard - 1);
    const secondHalfList = filterCards.slice(positionCard - 1).map((card) => {
      return { ...card, position: card.position + 1 };
    });
    const dataCards = firstHalfList.concat(dataMovedCard, secondHalfList);
    await putPositionCard(boardId, dataCards);
  };

  if (nativeList.id && moveList.id !== nativeList.id) {
    await moveCardAnotherList();
  } else {
    await moveCardThisList();
  }
};
