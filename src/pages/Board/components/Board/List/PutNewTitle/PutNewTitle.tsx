import api from '../../../../../../api/request';

const PutNewTitle = async (boardId: string, id: number, title: string): Promise<void> => {
  const ulr = `/board/${boardId}/list/${id}`;

  const requaest = api.put(ulr, {
    title,
  });
  console.log(requaest);
};

export default PutNewTitle;
