import './cards.scss';

interface CardPros {
  title: string;
}

function Card(props: CardPros) {
  return (
    <li className="list-li">
      <div className="div-li">{props.title}</div>
    </li>
  );
}

export default Card;
