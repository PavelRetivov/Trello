import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface dragAndDropCardProps {
  cardTopIndicatorBlock: boolean;
  cardBotIndicatorBlock: boolean;
  listIndicatorBlock: boolean;
  dropCardId: number | null;
  dragCardId: number | null;
  dropListId: number | null;
  cardDropPosition: number | null;
}

const initialState: dragAndDropCardProps = {
  cardTopIndicatorBlock: false,
  cardBotIndicatorBlock: false,
  listIndicatorBlock: false,
  dropCardId: null,
  dropListId: null,
  dragCardId: null,
  cardDropPosition: null,
};

const dragAndDropCardSlice = createSlice({
  name: 'dragAndDropCard',
  initialState,
  reducers: {
    activateCardTopIndicatorBlock: (state, active: PayloadAction<{ dataBlock: boolean }>) => {
      state.cardTopIndicatorBlock = active.payload.dataBlock;
      state.cardBotIndicatorBlock = false;
      state.listIndicatorBlock = false;
    },
    activateCardBotIndicatorBlock: (state, active: PayloadAction<{ dataBlock: boolean }>) => {
      state.cardBotIndicatorBlock = active.payload.dataBlock;
      state.cardTopIndicatorBlock = false;
      state.listIndicatorBlock = false;
    },
    activateListIndicatorBlock: (state, action: PayloadAction<{ dataBlock: boolean }>) => {
      state.listIndicatorBlock = action.payload.dataBlock;
      state.cardTopIndicatorBlock = false;
      state.cardBotIndicatorBlock = false;
    },
    setStartCardId: (state, action: PayloadAction<{ id: number | null }>) => {
      state.dragCardId = action.payload.id;
    },
    setDropCardId: (state, active: PayloadAction<{ id: number | null }>) => {
      state.dropCardId = active.payload.id;
    },
    setDropListId: (state, action: PayloadAction<{ id: number | null }>) => {
      state.dropListId = action.payload.id;
    },
    setCardDropPosition: (state, action: PayloadAction<{ position: number | null }>) => {
      state.cardDropPosition = action.payload.position;
    },
    resetStateDragAndDrop: (state) => {
      state.cardBotIndicatorBlock = false;
      state.cardTopIndicatorBlock = false;
      state.listIndicatorBlock = false;
      state.cardDropPosition = null;
      state.dropCardId = null;
      state.dropListId = null;
      state.dragCardId = null;
    },
  },
});

export const {
  activateCardTopIndicatorBlock,
  activateCardBotIndicatorBlock,
  activateListIndicatorBlock,
  setDropCardId,
  setStartCardId,
  setDropListId,
  setCardDropPosition,
  resetStateDragAndDrop,
} = dragAndDropCardSlice.actions;

export default dragAndDropCardSlice.reducer;
