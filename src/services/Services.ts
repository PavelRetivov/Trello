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
    console.log(`error: ${error}`);
    return null;
  }
};

export const deleteBoardInBoardsService = async (idBoard: number): Promise<void> => {
  try {
    await api.delete(`/board/${idBoard}`);
  } catch (error) {
    console.log(`error: ${error}`);
  }
};

export const postBoardHome = async (title: string, custom: { background: string }): Promise<void> => {
  try {
    await api
      .post('/board', {
        title,
        custom,
      })
      .catch(function (error) {
        console.log(error);
      });
  } catch (error) {
    console.log(`error: ${error}`);
  }
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
    console.log(`error: ${error}`);
    return 'error';
  }
};

export const postListInBoardById = async (idBoard: string, title: string, position: number): Promise<void> => {
  try {
    await api.post(`/board/${idBoard}/list`, {
      title,
      position,
    });
  } catch (error) {
    console.log(`error: ${error}`);
  }
};

export const getListsBoardByIdService = async (idBoard: number): Promise<IList[]> => {
  const request: { lists: IList[] } = await api.get(`/board/${idBoard}`);
  return request.lists;
};

export const deleteListInBoard = async (idBoard: string, idList: number): Promise<void> => {
  try {
    await api.delete(`/board/${idBoard}/list/${idList}`);
  } catch (error) {
    console.log(`error: ${error}`);
  }
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
  try {
    const { title, listId, position, description, custom } = dataPost;
    await api.post(`/board/${idBoard}/card`, {
      title,
      list_id: listId,
      position,
      description: description || '',
      custom,
    });
  } catch (error) {
    console.log(`error: ${error}`);
  }
};

export const deleteCardInList = async (idBoard: string, idCard: number): Promise<void> => {
  try {
    await api.delete(`/board/${idBoard}/card/${idCard}`);
  } catch (error) {
    console.log(`error: ${error}`);
  }
};

export const putListNameInBoard = async (boardId: string, listId: number, title: string): Promise<void> => {
  try {
    await api.put(`/board/${boardId}/list/${listId}`, {
      title,
    });
  } catch (error) {
    console.log(`error: ${error}`);
  }
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
    console.log(`error: ${error}`);
    return undefined;
  }
};

interface putPositionListProps {
  id: number;
  position: number;
}

export const putPositionList = async (boardId: string, newPositionList: putPositionListProps[]): Promise<void> => {
  try {
    const url = `/board/${boardId}/list`;
    await api.put(url, newPositionList);
  } catch (error) {
    console.log(`error: ${error}`);
  }
};

interface putPositionCardProps {
  id: number;
  position: number;
  list_id: number;
}
export const putPositionCard = async (boardId: string, newPositionCard: putPositionCardProps[]): Promise<void> => {
  try {
    const url = `/board/${boardId}/card`;
    await api.put(url, newPositionCard);
  } catch (error) {
    console.log(`error: ${error}`);
  }
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
    console.log(`error: ${error}`);
    return undefined;
  }
};

export const addUser = async (email: string, password: string): Promise<void> => {
  try {
    const url = '/user';
    const request = await api.post(url, {
      email,
      password,
    });
    console.log(request);
  } catch (error) {
    console.log(error);
  }
};

export const getUser = async (email: string, password: string): Promise<IDataLogin | undefined> => {
  try {
    const url = '/login';
    const request: IDataLogin = await api.post(url, {
      email,
      password,
    });
    return request;
  } catch (error) {
    console.log(error);
    return undefined;
  }
};
