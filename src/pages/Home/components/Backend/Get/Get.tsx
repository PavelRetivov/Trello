import api from '../../../../../api/request';
import IDate from '../../interface/IData';

interface dataBoard {
  boards: IDate[];
}

const GetData = async (id?: number): Promise<IDate[] | dataBoard | undefined> => {
  try {
    const url = id ? `/board/${id}` : `/board/`;
    const response: dataBoard = await api.get(url);
    return id ? response : response.boards;
  } catch (error) {
    console.error('Error fetching data:', error);
    return undefined;
  }
};

export default GetData;
