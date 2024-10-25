import ICard from '../../interface/IDataCard';
import IList from '../../interface/IDataList';
import { deleteCardInList, postCardInList, putPositionCard } from '../../services/Services';

interface moveCardAndNewBoardProps {
  nativeBoardId: string;
  boardIdMove: string;
  modalCard: ICard;
  listIdMoved: number;
  positionCard: number;
  nativeList: IList;
}

export const moveCardAndNewBoard = async ({
  nativeBoardId,
  boardIdMove,
  modalCard,
  listIdMoved,
  positionCard,
  nativeList,
}: moveCardAndNewBoardProps): Promise<void> => {
  await postCardInList({
    idBoard: boardIdMove,
    dataPost: {
      title: modalCard.title,
      listId: listIdMoved,
      position: positionCard,
      description: modalCard.description,
      custom: modalCard.custom,
    },
  });
  await deleteCardInList(nativeBoardId, modalCard.id);
  const updatePositionSeparatedLists = nativeList.cards
    .filter((card) => card.id !== Number(card.id))
    .map((card, index) => {
      return { id: card.id, position: index + 1, list_id: nativeList.id };
    });
  await putPositionCard(nativeBoardId, updatePositionSeparatedLists);
};
