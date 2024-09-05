interface List {
  cards: ICard[];
  id: number;
  title: string;
  position: number;
  board_id: string | undefined;
  getList: Function;
  setIsOpenModalWindowsAddCards: Function;
}

export default List;
