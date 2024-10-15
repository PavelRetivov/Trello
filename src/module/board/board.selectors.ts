import IList from '../../interface/IDataList';
import { AppState } from '../../store';
import { stateBoard } from './board.slice';

export const selectBoard = (state: AppState): stateBoard => state.board;
export const selectBoardList = (state: AppState): IList[] => state.board.lists;
export const selectBoardTitle = (state: AppState): string | null => state.board.title;
export const selectBoardCustom = (state: AppState): { background: string } | null => state.board.custom;
