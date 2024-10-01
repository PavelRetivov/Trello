import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import IDataBoard from '../../../interface/IDataBoard';
import homeStyle from '../../../styles/homeStyle.module.scss';
import ButtonDeleteBoardInBoardsHome from './buttonDeleteBoardInBoardsHome/ButtonDeleteBoardInBoardsHome';

function BoardInBoardHome({ board }: { board: IDataBoard }): JSX.Element {
  const { id, title, custom } = board;
  const [isOpenToolTip, setIsOpenToolTip] = useState(false);
  const [position, setPosition] = useState({
    mousePositionX: 0,
    mousePositionY: 0,
  });

  const openToolTip = (): void => {
    setIsOpenToolTip(true);
  };
  const closeToolTip = (): void => {
    setIsOpenToolTip(false);
  };
  const setPositionMouseCoordinates = (event: React.MouseEvent): void => {
    setPosition({ mousePositionX: event.clientX, mousePositionY: event.clientY });
  };

  return (
    <Link
      to={`/board/${board.id.toString()}`}
      className={homeStyle.BoardStyleInHome}
      style={{ background: custom.background }}
    >
      <ButtonDeleteBoardInBoardsHome idBoard={id} />
      <h1 onMouseMove={setPositionMouseCoordinates} onMouseEnter={openToolTip} onMouseLeave={closeToolTip}>
        {title}
      </h1>

      {isOpenToolTip && (
        <div
          className={homeStyle.tooltip}
          style={{ left: position.mousePositionX + 10, top: position.mousePositionY + 10 }}
        >
          <p>{title}</p>
        </div>
      )}
    </Link>
  );
}

export default BoardInBoardHome;
