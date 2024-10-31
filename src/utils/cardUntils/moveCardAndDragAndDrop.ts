import ICard from '../../interface/IDataCard';
import IList from '../../interface/IDataList';
import { putPositionCard } from '../../services/Services';

interface moveCardAndThisBoardProps {
  moveList: IList;
  dragCard: ICard;
  newPositionCard: number;
  boardId: string;
  nativeList: IList;
}

interface listsTransfer {
  startList: IList;
  dropList: IList;
}
export const moveCardAndDragAndDrop = async ({
  moveList,
  dragCard,
  newPositionCard,
  boardId,
  nativeList,
}: moveCardAndThisBoardProps): Promise<listsTransfer | IList> => {
  const cardsEdit = moveList.cards;

  const dataMovedCard = { ...dragCard, position: newPositionCard };

  const moveCardAnotherList = async (): Promise<listsTransfer> => {
    // division into two arrays before the card position and after
    const firsHalfList = cardsEdit.slice(0, newPositionCard - 1);
    const secondHalfList = cardsEdit.slice(newPositionCard - 1).map((card) => {
      return { ...card, position: card.position + 1 };
    });

    // connect and add the desired card among them
    const dataCards = firsHalfList.concat(dataMovedCard, secondHalfList);
    const dropList = { ...moveList, cards: dataCards }; // updated drop list

    // preparing for the update to the backend
    const putPositionDataCards = dataCards.map((card) => {
      return { id: card.id, position: card.position, list_id: moveList.id };
    });

    // update cards in native lists
    const updateStartCards = nativeList.cards
      .filter((card) => card.id !== dragCard.id)
      .map((card, index) => {
        return { ...card, position: index + 1 };
      });

    // preparing for the update to the backend
    const putPositionNativeList = updateStartCards.map((card) => {
      return { id: card.id, position: card.position, list_id: nativeList.id };
    });

    const startList = { ...nativeList, cards: updateStartCards }; // updated native list

    // ready to be sent to the backend
    const putUpdatePosition = putPositionDataCards.concat(putPositionNativeList);

    putPositionCard(boardId, putUpdatePosition);
    return { startList, dropList };
  };

  const moveCardThisList = async (): Promise<IList> => {
    // update the positions of the cards after removing the card from the array
    const filterCards = cardsEdit
      .filter((card) => card.id !== dragCard.id)
      .map((card, index) => {
        return { ...card, position: index + 1 };
      });

    // division into two arrays before the card position and after
    const firstHalfList = filterCards.slice(0, newPositionCard - 1);
    const secondHalfList = filterCards.slice(newPositionCard - 1).map((card) => {
      return { ...card, position: card.position + 1 };
    });

    // connect and add the desired card among them
    const dataCards = firstHalfList.concat(dataMovedCard, secondHalfList);

    // preparing for the update to the backend
    const putDataCards = dataCards.map((card) => {
      return { id: card.id, position: card.position, list_id: moveList.id };
    });

    putPositionCard(boardId, putDataCards);
    return { ...moveList, cards: dataCards };
  };

  if (nativeList.id && moveList.id !== nativeList.id) {
    return moveCardAnotherList();
  }
  return moveCardThisList();
};
