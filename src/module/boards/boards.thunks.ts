import { createAsyncThunk } from '@reduxjs/toolkit';
import { getDataBoardsByHome, deleteBoardInBoardsService, postBoardHome } from '../../services/Services';
import IDataBoard from '../../interface/IDataBoard';

export const fetchBoardsThunk = createAsyncThunk<IDataBoard[] | null>('boards/getDataBoardsByHome', async () => {
  const data = await getDataBoardsByHome();
  return data;
});

export const deleteBoardThunk = createAsyncThunk<void, number>(
  'board/deleteBoard',
  async (id: number, { dispatch }) => {
    await deleteBoardInBoardsService(id);
    dispatch(fetchBoardsThunk());
  }
);

export const postBoardThunk = createAsyncThunk<void, { title: string; custom: { background: string } }>(
  'board/postBoard',
  async ({ title, custom }, { dispatch }) => {
    await postBoardHome(title, custom);
    dispatch(fetchBoardsThunk());
  }
);
