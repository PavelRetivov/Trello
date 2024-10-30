import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector, useStore } from 'react-redux';
import boardsReducer from './module/boards/boards.slice';
import boardReducer from './module/board/board.slice';
import modalEditCardSliceReducer from './module/modalEditCardSlice/modalEditCardSlice';
import { dragAndDropReducer } from './module/dragAndDrop';

const reducer = combineReducers({
  boards: boardsReducer,
  board: boardReducer,
  modalEditCard: modalEditCardSliceReducer,
  dragAndDropReducer,
});

export const store = configureStore({
  reducer,
});

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector = useSelector.withTypes<AppState>();
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppStore = useStore.withTypes<typeof store>();
