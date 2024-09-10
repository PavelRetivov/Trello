interface List {
  cards: ICard[];
  id: number;
  title: string;
  position: number;
  boardId: string | undefined;
  getList: (request: string) => void;
  setIsOpenModalWindowsAddCards: (isOpen: boolean) => void;
}

export default List;
