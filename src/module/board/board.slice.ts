import { createSlice } from '@reduxjs/toolkit';
import IList from '../../interface/IDataList';
import { getBoardByIdThunk, getListsBoardByIdServiceThunk, putBoardNameThunk } from './board.thunks';

export interface stateBoard {
  title: string | null;
  custom: { background: string } | null;
  lists: Record<number, IList>;
}

const initialState: stateBoard = {
  title: null,
  custom: null,
  lists: {},
};

const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBoardByIdThunk.fulfilled, (state, action) => {
        state.title = action.payload.title;
        state.custom = action.payload.custom;
        state.lists = action.payload.lists.reduce(
          (acc, list) => {
            acc[list.id] = list;
            return acc;
          },
          {} as Record<number, IList>
        );
      })
      .addCase(putBoardNameThunk.fulfilled, (state, action) => {
        state.title = action.payload;
      })
      .addCase(getListsBoardByIdServiceThunk.fulfilled, (state, action) => {
        state.lists = action.payload.reduce(
          (acc, list) => {
            acc[list.id] = list;
            return acc;
          },
          {} as Record<number, IList>
        );
      });
  },
});

export default boardSlice.reducer;
