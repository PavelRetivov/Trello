import api from '../../../../../api/request';

const Delete = async (idBorder: string, idList: number): Promise<void> => {
  const url = `/board/${idBorder}/list/${idList}`;
  await api.delete(url);
};

export default Delete;
