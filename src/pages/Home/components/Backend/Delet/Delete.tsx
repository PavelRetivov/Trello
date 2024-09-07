import api from '../../../../../api/request';

const Delete = async (id: number): Promise<void> => {
  await api.delete(`/board/${id}`);
};

export default Delete;
