import api from '../../../../../../api/request';

interface PositionBoard {
  idBoard: string;
  cardId: number;
  listId: number;
}

const UpdatePositionCards = async ({ idBoard, cardId, listId }: PositionBoard): Promise<void> => {
  console.log(`idBoard: ${idBoard}cardId: ${cardId} list_id: ${listId}`);
  try {
    const url = `/board/${idBoard}/card/${cardId}`;
    console.log(url);
    const request = await api.put(url, {
      title: 'to pet a cat',
      description: 'petting process',
      position: 232,
      list_id: listId,
    });
    console.log(request);
  } catch (error) {
    console.log(error);
  }
};
export default UpdatePositionCards;
