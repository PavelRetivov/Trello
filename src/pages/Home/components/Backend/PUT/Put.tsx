import api from '../../../../../api/request';

const postData = async (id: number, title: string, color: string) => {
  console.log('ok2');
  await api
    .put(`/board/${id}`, {
      title: title,
      custom: { background: color },
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
};

export default postData;
