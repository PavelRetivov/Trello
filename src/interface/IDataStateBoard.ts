import IList from './IDataList';

export interface IDataStateBoard {
  title: string | null;
  custom: { background: string } | null;
  lists: IList[];
}
