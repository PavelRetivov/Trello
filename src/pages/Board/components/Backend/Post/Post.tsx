import api from '../../../../../api/request';

const postData = async (id: string, title: string, position: number) => {
  console.log('ok');
  const url = `/board/${id}/list`;
  await api
    .post(url, {
      title: title,
      position: position,
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
};

export default postData;
