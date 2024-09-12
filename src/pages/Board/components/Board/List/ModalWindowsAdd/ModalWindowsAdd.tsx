import React, { useEffect, useRef, useState } from 'react';
import './ModalWindowsAdd.scss';
import { checkTitle } from '../../checkValidTitle/CheckValidTitle';

interface modalProps {
  setData: (data: { title: string; id: number; position: number }) => void;
  listId: number;
  cardLength: number;
  setIsModalWindows: (isTrue: boolean) => void;
  setIsOpenModalWindowsAddCards: (isTrue: boolean) => void;
}

function ModalWindowsAdd({
  setData,
  listId,
  setIsModalWindows,
  cardLength,
  setIsOpenModalWindowsAddCards,
}: modalProps): JSX.Element {
  const [title, setTitle] = useState('');
  const addDivRef = useRef<HTMLDivElement | null>(null);
  const [checkIsError, setCheckIsError] = useState(false);

  // enter add new board
  const enter = (): void => {
    if (checkTitle(title)) {
      setData({ title, id: listId, position: cardLength });
      setIsModalWindows(false);
      setIsOpenModalWindowsAddCards(false);
    } else {
      setCheckIsError(true);
    }
  };

  const stopPropagation = (event: React.MouseEvent): void => {
    event.stopPropagation();
  };

  // set title text
  const titleText = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setTitle(event.target.value);
  };

  const closeModalWindows = (): void => {
    setIsModalWindows(false);
    setIsOpenModalWindowsAddCards(false);
  };

  // add animation when open modal windows
  useEffect(() => {
    if (addDivRef.current) {
      addDivRef.current.style.animation = 'expandHeightCards 0.3s forwards';
    }
  }, []);

  return (
    <div onClick={stopPropagation} ref={addDivRef} className="modalPositionCardsAdd" style={{ pointerEvents: 'auto' }}>
      <input type="text" value={title} onChange={titleText} placeholder="Введіть назву картки" />
      {checkIsError ? (
        <div>
          <p style={{ color: 'black', fontSize: '10px', padding: 0, margin: 0 }}>ви ввели не коректні данні</p>
        </div>
      ) : null}
      <div className="positionButtonCardsAdd ">
        <button onClick={enter} className="enterCards">
          Enter
        </button>
        <button className="deleteCards" onClick={closeModalWindows}>
          X
        </button>
      </div>
    </div>
  );
}

export default ModalWindowsAdd;
