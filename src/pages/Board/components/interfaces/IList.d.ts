interface List {
  cards: ICard[];
  id: number;
  title: string;
  position: number;
  boardId: string | undefined;
  getList: () => void;
  setIsOpenModalWindowsAddCards: (isOpen: boolean) => void;
}

export default List;
