import React, { useState } from 'react';
import List from '../List/Lsit';
import ICard from '../interfaces/ICard';
import './border.scss';


function Board() {
  const [title] = useState('Моя тестова дошка');
  const[list] = useState([
    {
      id: 1,
      title: "Плани",
      cards: [
        {id: 1, title: "помити кота"},
        {id: 2, title: "приготувати суп"},
        {id: 3, title: "сходити в магазин"}
      ]
    },
    {
      id: 2,
      title: "В процесі",
      cards: [
        {id: 4, title: "подивитися серіал"}
      ]
    },
    {
      id: 3,
      title: "Зроблено",
      cards: [
        {id: 5, title: "зробити домашку"},
        {id: 6, title: "погуляти з собакой"} 
      ]
    }
]);
  return <div className='container'><div className='headers'><button className='buttonHome'>Домой</button><div className='text'>{title}</div></div>
    <div className='border'>{list.map((card, index, arr) => {
       return <div className='list'><List title={card.title} cards={card.cards as ICard[]} /></div>
    })}<button className='buttonAdd'>Додати дошку</button></div>
    </div>;
    
}

export default Board;
