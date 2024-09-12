import api from '../../../../../api/request';

const postData = async (id: number, title: string, color: string): Promise<void> => {
  await api
    .put(`/board/${id}`, {
      title,
      custom: { background: color },
    })
    .catch(function (error) {
      console.log(error);
    });
};

export default postData;
