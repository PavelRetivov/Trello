import ICard from "../interfaces/ICard";
import Card from "../Card/Card";
import './list.scss'

interface ListProps {
    title: string,
    cards: ICard[]
}

const List: React.FC<ListProps> = ({title, cards}) => {
    return(
        <div className="list-ul">
        <h1>{title}</h1>
           <ul>{cards.map((a) => {
                return <Card title={a.title} />
            })}</ul>
            <button className="add-card">Додати карточку</button>
        </div>
    )
};

export default List;