import api from '../../../../../api/request';

const putData = async (id_border: string, id_list?: number, title?: string) => {
  const url = id_list ? `/board/${id_border}/list/${id_list}` : `/board/${id_border}`;

  await api
    .put(url, {
      title: title,
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
};

export default putData;
