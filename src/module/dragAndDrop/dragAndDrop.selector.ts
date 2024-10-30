import { AppState } from '../../store';
import { dragAndDropCardProps } from './dragAndDropSlice.slice';

export const selectTopBlock = (state: AppState): boolean => state.dragAndDropReducer.topBlock;
export const selectBotBlock = (state: AppState): boolean => state.dragAndDropReducer.botBlock;
export const selectListPseudoBlock = (state: AppState): boolean => state.dragAndDropReducer.listPseudoBlock;
export const selectDropCardId = (state: AppState): number | null => state.dragAndDropReducer.dropCardId;
export const selectStartCardId = (state: AppState): number | null => state.dragAndDropReducer.startCardId;
export const selectDropListId = (state: AppState): number | null => state.dragAndDropReducer.dropListId;
export const selectDragAndDropData = (state: AppState): dragAndDropCardProps => state.dragAndDropReducer;
