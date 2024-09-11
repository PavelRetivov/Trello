import api from '../../../../../../api/request';

const PutNewTitle = async (boardId: string, id: number, title: string): Promise<void> => {
  const ulr = `/board/${boardId}/list/${id}`;

  const request = api.put(ulr, {
    title,
  });
  console.log(request);
};

export default PutNewTitle;
