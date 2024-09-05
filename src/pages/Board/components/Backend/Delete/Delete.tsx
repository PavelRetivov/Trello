import api from '../../../../../api/request';

const Delete = async (id_border: string, id_list: number) => {
  const url = `/board/${id_border}/list/${id_list}`;
  await api.delete(url);
};

export default Delete;
