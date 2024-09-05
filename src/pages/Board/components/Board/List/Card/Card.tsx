import './cards.scss';
import ICard from '../../../interfaces/ICard';
import api from '../../../../../../api/request';

interface CardProps {
  props: ICard;
  board_id: string | undefined;
  getList: Function;
}

function Card(card: CardProps) {
  const deleteCard = async () => {
    const url = `/board/${card.board_id}/card/${card.props.id}`;
    await api.delete(url);
    card.getList();
  };

  return (
    <li className="list-li">
      <div className="div-li">
        <h1>{card.props.title + card.props.id}</h1>
      </div>
      <button className="" onClick={deleteCard}>
        X
      </button>
    </li>
  );
}

export default Card;
