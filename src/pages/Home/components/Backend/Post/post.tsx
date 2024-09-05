import api from '../../../../../api/request';

const postData = async (title: string, custom: { background: string }) => {
  console.log('ok');
  await api
    .post('/board', {
      title: title,
      custom: custom,
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
};

export default postData;
