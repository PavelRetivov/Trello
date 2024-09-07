import api from '../../../../../api/request';

const putData = async (idBorder: string, idList?: number, title?: string): Promise<void> => {
  const url = idList ? `/board/${idBorder}/list/${idList}` : `/board/${idBorder}`;

  await api
    .put(url, {
      title,
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
};

export default putData;
