import { createSlice } from '@reduxjs/toolkit';
import { fetchBoardsThunk } from './boards.thunks';
import IDataBoard from '../../interface/IDataBoard';

interface BoardsState {
  boards: IDataBoard[] | null;
  loading: boolean;
  error: string | null;
}

const initialState: BoardsState = {
  boards: null,
  loading: false,
  error: null,
};

const boardsSlice = createSlice({
  name: 'boards',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBoardsThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBoardsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.boards = action.payload;
      })
      .addCase(fetchBoardsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch boards';
      });
  },
});

export default boardsSlice.reducer;
