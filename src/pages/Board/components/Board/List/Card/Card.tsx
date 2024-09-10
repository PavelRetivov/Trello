import React from 'react';
import './cards.scss';
import ICard from '../../../interfaces/ICard';
import api from '../../../../../../api/request';

interface CardProps {
  props: ICard;
  boardId: string | undefined;
  getList: (request: string) => void;
}

function Card({ props, boardId, getList }: CardProps): JSX.Element {
  const { id, title } = props;

  const deleteCard = async (): Promise<void> => {
    const url = `/board/${boardId}/card/${boardId}`;
    await api.delete(url);
    getList('setList');
  };

  return (
    <li className="list-li">
      <div className="div-li">
        <h1>{title + id}</h1>
      </div>
      <button className="" onClick={deleteCard}>
        X
      </button>
    </li>
  );
}

export default Card;
