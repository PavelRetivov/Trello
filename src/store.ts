import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector, useStore } from 'react-redux';
import boardsReducer from './module/boards/boards.slice';
import boardReducer from './module/board/board.slice';

const reducer = combineReducers({
  boards: boardsReducer,
  board: boardReducer,
});

export const store = configureStore({
  reducer,
});

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector = useSelector.withTypes<AppState>();
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppStore = useStore.withTypes<typeof store>();
