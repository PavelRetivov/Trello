import api from '../../../../../api/request';

const Delete = async (id: number) => {
  await api.delete(`/board/${id}`);
};

export default Delete;
