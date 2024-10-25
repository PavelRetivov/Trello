import { AppState } from '../../store';
import { stateDataModal } from './modalEditCardSlice';

export const selectDataEditCard = (state: AppState): stateDataModal => state.modalEditCard;
