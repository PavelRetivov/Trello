import api from '../../../../../api/request';

const postData = async (title: string, custom: { background: string }): Promise<void> => {
  await api
    .post('/board', {
      title,
      custom,
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
};

export default postData;
