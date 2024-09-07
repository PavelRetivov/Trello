import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './board.scss';
import IData from '../../interface/IData';

interface BoardProps {
  board: IData;
}

function Board({ board }: BoardProps): JSX.Element {
  const [backgroundColor, setBackground] = useState<string>('#ffffff');
  const boardElement = useRef<HTMLDivElement | null>(null);

  const textColor = (): void => {
    if (boardElement.current) {
      const style = window.getComputedStyle(boardElement.current);
      setBackground(style.background);
      const rgbMatch = style.backgroundColor.match(/\d+/g);
      if (rgbMatch?.length === 3) {
        const rgbNumber = rgbMatch.map(Number);
        const isBlack = rgbNumber.map((value) => value > 40);
        if (isBlack.filter(Boolean).length < 2) {
          setBackground('#ffffff');
        } else {
          setBackground('#000000');
        }
      }
    }
  };

  useEffect(() => {
    textColor();
  }, []);

  return (
    <div className="board-style">
      <Link to={`/board/${board.id.toString()}`}>
        <div
          ref={boardElement}
          className="board-button"
          style={{ background: board?.custom?.background ? board.custom.background : '#ffffff' }}
        >
          <h1 style={{ color: backgroundColor }}>{board.title}</h1>
        </div>
      </Link>
    </div>
  );
}

export default Board;
