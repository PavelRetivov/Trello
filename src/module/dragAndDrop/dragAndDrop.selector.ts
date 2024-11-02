import { AppState } from '../../store';
import { dragAndDropCardProps } from './dragAndDropSlice.slice';

export const selectCardTopIndicatorBlock = (state: AppState): boolean => state.dragAndDropReducer.cardTopIndicatorBlock;
export const selectCardBotIndicatorBlock = (state: AppState): boolean => state.dragAndDropReducer.cardBotIndicatorBlock;
export const selectListIndicatorBlock = (state: AppState): boolean => state.dragAndDropReducer.listIndicatorBlock;
export const selectDropCardId = (state: AppState): number | null => state.dragAndDropReducer.dropCardId;
export const selectStartCardId = (state: AppState): number | null => state.dragAndDropReducer.dragCardId;
export const selectDropListId = (state: AppState): number | null => state.dragAndDropReducer.dropListId;
export const selectDragStart = (state: AppState): boolean => state.dragAndDropReducer.dragStart;
export const selectDragEnd = (state: AppState): boolean => state.dragAndDropReducer.dragEnd;
export const selectDragElementHide = (state: AppState): boolean => state.dragAndDropReducer.dragElementHide;
export const selectDragAndDropData = (state: AppState): dragAndDropCardProps => state.dragAndDropReducer;
