import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import ICard from '../../interface/IDataCard';

export interface stateDataModal {
  isOpen: boolean;
  modalCard: ICard | null;
}

const initialState: stateDataModal = {
  isOpen: false,
  modalCard: null,
};

const modalEditCardSlice = createSlice({
  name: 'modalEditCardSlice',
  initialState,
  reducers: {
    updateModalEditCard: (state, action: PayloadAction<{ isOpen: boolean; card: ICard | null }>) => {
      state.modalCard = action.payload.card;
      state.isOpen = action.payload.isOpen;
    },
    setIsOpen: (state, action: PayloadAction<{ isOpen: boolean }>) => {
      state.isOpen = action.payload.isOpen;
    },
    updateTitleCard: (state, action: PayloadAction<{ newTitle: string }>) => {
      if (state.modalCard?.title) state.modalCard.title = action.payload.newTitle;
      console.log('title Name UPDATE');
    },
    updateDescription: (state, action: PayloadAction<{ description: string }>) => {
      if (state.modalCard) state.modalCard.description = action.payload.description;
    },
  },
});
export const { updateModalEditCard } = modalEditCardSlice.actions;
export const { setIsOpen } = modalEditCardSlice.actions;
export const { updateTitleCard } = modalEditCardSlice.actions;
export const { updateDescription } = modalEditCardSlice.actions;

export default modalEditCardSlice.reducer;
