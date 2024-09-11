import api from '../../../../../../../api/request';

interface PositionBoard {
  idBoard: string;
  cardId: number;
  listId: number;
  title: string;
}

const PutNewTitleCards = async ({ idBoard, cardId, listId, title }: PositionBoard): Promise<void> => {
  console.log(`idBoard: ${idBoard}cardId: ${cardId} list_id: ${listId}`);
  try {
    const url = `/board/${idBoard}/card/${cardId}`;
    console.log(url);
    const request = await api.put(url, {
      title,
      list_id: listId,
    });
    console.log(request);
  } catch (error) {
    console.log(error);
  }
};
export default PutNewTitleCards;
