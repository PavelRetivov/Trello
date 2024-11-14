import api from '../api/request';
import IDataBoard from '../interface/IDataBoard';
import IList from '../interface/IDataList';
import { IDataStateBoard } from '../interface/IDataStateBoard';
import { IDataLogin } from '../interface/IDataLogin';

export const getDataBoardsByHome = async (): Promise<IDataBoard[] | null> => {
  try {
    const url = '/board/';
    const request: { boards: IDataBoard[] } = await api.get(url);
    return request.boards;
  } catch (error) {
    return null;
  }
};

export const deleteBoardInBoardsService = async (idBoard: number): Promise<void> => {
  await api.delete(`/board/${idBoard}`);
};

export const postBoardHome = async (title: string, custom: { background: string }): Promise<void> => {
  await api.post('/board', {
    title,
    custom,
  });
};

export const getBoardByIdService = async (idBoard: number): Promise<IDataStateBoard> => {
  const request: IDataStateBoard = await api.get(`/board/${idBoard}`);
  return request;
};

export const putBoardName = async (idBoard: number, newTitle: string): Promise<string> => {
  try {
    await api.put(`/board/${idBoard}`, {
      title: newTitle,
    });
    return newTitle;
  } catch (error) {
    return 'error';
  }
};

export const postListInBoardById = async (idBoard: string, title: string, position: number): Promise<void> => {
  await api.post(`/board/${idBoard}/list`, {
    title,
    position,
  });
};

export const getListsBoardByIdService = async (idBoard: number): Promise<IList[]> => {
  const request: { lists: IList[] } = await api.get(`/board/${idBoard}`);
  return request.lists;
};

export const deleteListInBoard = async (idBoard: string, idList: number): Promise<void> => {
  await api.delete(`/board/${idBoard}/list/${idList}`);
};

export interface argsPost {
  idBoard: string;
  dataPost: {
    title: string;
    listId: number;
    position: number;
    description?: string;
    custom?: { deadline: string };
  };
}

export const postCardInList = async ({ idBoard, dataPost }: argsPost): Promise<void> => {
  const { title, listId, position, description, custom } = dataPost;
  await api.post(`/board/${idBoard}/card`, {
    title,
    list_id: listId,
    position,
    description: description || '',
    custom,
  });
};

export const deleteCardInList = async (idBoard: string, idCard: number): Promise<void> => {
  await api.delete(`/board/${idBoard}/card/${idCard}`);
};

export const putListNameInBoard = async (boardId: string, listId: number, title: string): Promise<void> => {
  await api.put(`/board/${boardId}/list/${listId}`, {
    title,
  });
};

export const putCardNameInList = async (
  boardId: string,
  listId: number,
  cardId: number,
  nameCard: string
): Promise<void | string> => {
  try {
    const url = `/board/${boardId}/card/${cardId}`;
    const request = await api.put(url, {
      title: nameCard,
      list_id: listId,
    });
    if (request && 'result' in request && typeof request.result === 'string') {
      return request.result;
    }
    return undefined;
  } catch (error) {
    return undefined;
  }
};

interface putPositionListProps {
  id: number;
  position: number;
}

export const putPositionList = async (boardId: string, newPositionList: putPositionListProps[]): Promise<void> => {
  const url = `/board/${boardId}/list`;
  await api.put(url, newPositionList);
};

interface putPositionCardProps {
  id: number;
  position: number;
  list_id: number;
}
export const putPositionCard = async (boardId: string, newPositionCard: putPositionCardProps[]): Promise<void> => {
  const url = `/board/${boardId}/card`;
  await api.put(url, newPositionCard);
};

export const putDescriptionCard = async (
  boardId: string,
  cardId: string,
  description: string,
  listId: number
): Promise<void | string> => {
  try {
    const ulr = `/board/${boardId}/card/${cardId}`;
    const request = await api.put(ulr, {
      description,
      list_id: listId,
    });
    if ('result' in request && typeof request.result === 'string') {
      return request.result;
    }
    return undefined;
  } catch (error) {
    return undefined;
  }
};

export const addUser = async (email: string, password: string): Promise<{ result: string }> => {
  try {
    const url = '/user';
    const request: { result: string } = await api.post(url, {
      email,
      password,
    });
    if (request && 'result' in request) {
      return request;
    }
    return { result: 'error' };
  } catch (error) {
    return { result: 'error' };
  }
};

export const getUser = async (email: string, password: string): Promise<IDataLogin | { result: string }> => {
  try {
    const url = '/login';
    const request: IDataLogin = await api.post(url, {
      email,
      password,
    });
    return request;
  } catch (error) {
    return { result: 'Unauthorized' };
  }
};
