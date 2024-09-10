interface List {
  cards: ICard[];
  id: number;
  title: string;
  position: number;
  boardId: string | undefined;
  setIsInputTitle: (isInput: boolean) => void;
  getList: (request: string) => void;
  setIsOpenModalWindowsAddCards: (isOpen: boolean) => void;
  deleteBoardById: (id) => void;
}

export default List;
