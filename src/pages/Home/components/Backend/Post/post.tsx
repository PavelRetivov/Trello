import api from '../../../../../api/request';

const postData = async (title: string, custom: { background: string }): Promise<void> => {
  const request = await api
    .post('/board', {
      title,
      custom,
    })
    .catch(function (error) {
      console.log(error);
    });
  console.log(request);
};

export default postData;
