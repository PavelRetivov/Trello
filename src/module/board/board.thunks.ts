import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  argsPost,
  deleteListInBoard,
  getBoardByIdService,
  getListsBoardByIdService,
  postCardInList,
  postListInBoardById,
  putBoardName,
} from '../../services/Services';
import IList from '../../interface/IDataList';

interface board {
  title: string | null;
  custom: { background: string } | null;
  lists: IList[];
}

export const getBoardByIdThunk = createAsyncThunk<board, number>('board/getBoardById', async (idBoard: number) => {
  const data = await getBoardByIdService(idBoard);
  return data;
});

export const putBoardNameThunk = createAsyncThunk<string, { idBoard: number; newTitle: string }>(
  'board/putBoardName',
  async (args) => {
    const { idBoard, newTitle } = args;
    const response = await putBoardName(idBoard, newTitle);
    return response;
  }
);

export const postListInBoardByIdThunk = createAsyncThunk<void, { idBoard: string; title: string; position: number }>(
  'board/postListInBoardById',
  async (args) => {
    const { idBoard, title, position } = args;
    await postListInBoardById(idBoard, title, position);
  }
);

export const getListsBoardByIdServiceThunk = createAsyncThunk<IList[], number>(
  'board/getListsBoardByIdService',
  async (boardId) => {
    const request = await getListsBoardByIdService(boardId);
    return request;
  }
);

export const deleteListInBoardThunk = createAsyncThunk<void, { idBoard: string; idList: number }>(
  'board/deleteListInBoard',
  async (args) => {
    const { idBoard, idList } = args;
    await deleteListInBoard(idBoard, idList);
  }
);

export const postCardInListThunk = createAsyncThunk<void, argsPost>('board/postCardInList', async (dataPost) => {
  await postCardInList(dataPost);
});
