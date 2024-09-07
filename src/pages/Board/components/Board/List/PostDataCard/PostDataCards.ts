import api from '../../../../../../api/request';

const postDataCards = async (
  boardId: string,
  data: { title: string; id: number; position: number; description: string; custom: string }
): Promise<void> => {
  const url = `/board/${boardId}/card`;
  console.log(url);
  console.log(data);
  console.log(data.id);
  console.log(data.title);

  await api
    .post(url, {
      title: data.title,
      list_id: data.id,
      position: data.position,
      description: data.description,
      custom: data.custom,
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
};

export default postDataCards;
