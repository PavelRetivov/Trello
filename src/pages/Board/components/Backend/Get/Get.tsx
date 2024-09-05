import api from '../../../../../api/request';
import IDate from '../../interfaces/ICard';

interface dataBoard {
  boards: IDate[];
}

const getData = async (id: string | number) => {
  try {
    const url = typeof id === 'string' ? `/board/${id}` : `/board/${id}/card`;
    const response: dataBoard = await api.get(url);
    return response;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

export default getData;
