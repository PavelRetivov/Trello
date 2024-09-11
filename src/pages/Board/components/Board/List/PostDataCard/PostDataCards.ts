import api from '../../../../../../api/request';

const postDataCards = async (boardId: string, data: { title: string; id: number; position: number }): Promise<void> => {
  const url = `/board/${boardId}/card`;

  const request = await api
    .post(url, {
      title: data.title,
      list_id: data.id,
      position: data.position,
    })
    .catch(function (error) {
      console.log(error);
    });
  console.log(request);
};

export default postDataCards;
