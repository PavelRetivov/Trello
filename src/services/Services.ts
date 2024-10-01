import api from '../api/request';
import IDataBoard from '../interface/IDataBoard';
import { stateBoard } from '../module/board/board.slice';
import IList from '../interface/IDataList';

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
  const request = await api.delete(`/board/${idBoard}`);
  console.log(request);
};

export const postBoardHome = async (title: string, custom: { background: string }): Promise<void> => {
  const request = await api
    .post('/board', {
      title,
      custom,
    })
    .catch(function (error) {
      console.log(error);
    });
  console.log(request);
};

export const getBoardByIdService = async (idBoard: number): Promise<stateBoard> => {
  const request: stateBoard = await api.get(`/board/${idBoard}`);
  return request;
};

export const putBoardName = async (idBoard: number, newTitle: string): Promise<string> => {
  const response = await api.put(`/board/${idBoard}`, {
    title: newTitle,
  });
  console.log(response);
  return newTitle;
};

export const postListInBoardById = async (idBoard: string, title: string, position: number): Promise<void> => {
  const response = await api.post(`/board/${idBoard}/list`, {
    title,
    position,
  });
  console.log(response);
};

export const getListsBoardByIdService = async (idBoard: number): Promise<IList[] | [] | null> => {
  const request: stateBoard = await api.get(`/board/${idBoard}`);
  return request.lists;
};

export const deleteListInBoard = async (idBoard: string, idList: number): Promise<void> => {
  const request = await api.delete(`/board/${idBoard}/list/${idList}`);
  console.log(request);
};

export interface argsPost {
  idBoard: string;
  dataPost: {
    title: string;
    listId: number;
    position: number;
  };
}

export const postCardInList = async ({ idBoard, dataPost }: argsPost): Promise<void> => {
  const { title, listId, position } = dataPost;
  const request = await api.post(`/board/${idBoard}/card`, {
    title,
    list_id: listId,
    position,
  });
  console.log(request);
};

export const deleteCardInList = async (idBoard: string, idCard: number): Promise<void> => {
  const request = await api.delete(`/board/${idBoard}/card/${idCard}`);
  console.log(request);
};

export const putListNameInBoard = async (boardId: string, listId: number, title: string): Promise<void> => {
  const request = await api.put(`/board/${boardId}/list/${listId}`, {
    title,
  });
  console.log(request);
};

export const putCardNameInList = async (
  boardId: string,
  listId: number,
  cardId: number,
  nameCard: string
): Promise<void> => {
  const url = `/board/${boardId}/card/${cardId}`;
  const request = await api.put(url, {
    title: nameCard,
    list_id: listId,
  });
  console.log('update information', request);
};

interface putPositionListProps {
  id: number;
  position: number;
}

export const putPositionList = async (boardId: string, newPositionList: putPositionListProps[]): Promise<void> => {
  const url = `/board/${boardId}/list`;
  const request = await api.put(url, newPositionList);
  console.log('putPositionList', request);
};

interface putPositionCardProps {
  id: number;
  position: number;
}
export const putPositionCard = async (
  boardId: string,
  listId: number,
  newPositionCard: putPositionCardProps[]
): Promise<void> => {
  const url = `/board/${boardId}/list/${listId}/card`;
  console.log('url', url);
  console.log('newPositionCard', newPositionCard);
  const request = api.put(url, newPositionCard);
  console.log(request);
};
