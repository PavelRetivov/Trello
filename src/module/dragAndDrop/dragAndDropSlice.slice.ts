import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface dragAndDropCardProps {
  topBlock: boolean;
  botBlock: boolean;
  listPseudoBlock: boolean;
  dropCardId: number | null;
  dropListId: number | null;
  startCardId: number | null;
  cardDropPosition: number | null;
}

const initialState: dragAndDropCardProps = {
  topBlock: false,
  botBlock: false,
  listPseudoBlock: false,
  dropCardId: null,
  dropListId: null,
  startCardId: null,
  cardDropPosition: null,
};

const dragAndDropCardSlice = createSlice({
  name: 'dragAndDropCard',
  initialState,
  reducers: {
    activateTopBlock: (state, active: PayloadAction<{ dataBlock: boolean }>) => {
      state.topBlock = active.payload.dataBlock;
      state.botBlock = false;
      state.listPseudoBlock = false;
    },
    activateBotBlock: (state, active: PayloadAction<{ dataBlock: boolean }>) => {
      state.botBlock = active.payload.dataBlock;
      state.topBlock = false;
      state.listPseudoBlock = false;
    },
    activateListPseudoBlock: (state, action: PayloadAction<{ dataBlock: boolean }>) => {
      state.listPseudoBlock = action.payload.dataBlock;
      state.topBlock = false;
      state.botBlock = false;
    },
    setStartCardId: (state, action: PayloadAction<{ id: number | null }>) => {
      state.startCardId = action.payload.id;
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
    resetState: (state) => {
      state.botBlock = false;
      state.topBlock = false;
      state.listPseudoBlock = false;
      state.cardDropPosition = null;
      state.dropCardId = null;
      state.dropListId = null;
      state.startCardId = null;
    },
  },
});

export const {
  activateTopBlock,
  activateBotBlock,
  activateListPseudoBlock,
  setDropCardId,
  setStartCardId,
  setDropListId,
  setCardDropPosition,
  resetState,
} = dragAndDropCardSlice.actions;

export default dragAndDropCardSlice.reducer;
