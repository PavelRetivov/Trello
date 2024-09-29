import ICard from './IDataCard';

interface IList {
  id: number;
  title: string;
  position: number;
  cards: ICard[];
}

export default IList;
