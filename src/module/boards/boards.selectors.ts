import IDataBoard from '../../interface/IDataBoard';
import { AppState } from '../../store';

export const selectBoards = (state: AppState): IDataBoard[] | null => state.boards.boards;
export const selectBoardsLoading = (state: AppState): boolean => state.boards.loading;
export const selectBoardsError = (state: AppState): string | null => state.boards.error;
