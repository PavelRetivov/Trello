import React from 'react';
import { useParams } from 'react-router-dom';
import ICard from '../../../../../interface/IDataCard';
import { deleteCardInList } from '../../../../../services/Services';
import { useAppDispatch } from '../../../../../store';
import { getListsBoardByIdServiceThunk } from '../../../../../module/board';
import style from '../../../../../styles/pageBoardStyle.module.scss';

function Card(data: { card: ICard }): JSX.Element {
  const { boardId } = useParams();
  const { card } = data;
  const { title, id } = card;
  const dispatch = useAppDispatch();

  const handleDeleteCard = async (): Promise<void> => {
    if (boardId) {
      await deleteCardInList(boardId, id);
      await dispatch(getListsBoardByIdServiceThunk(Number(boardId)));
    }
  };
  return (
    <div className={style.card}>
      <h3>{title}</h3>
      <button onClick={handleDeleteCard}>X</button>
    </div>
  );
}

export default React.memo(Card);
