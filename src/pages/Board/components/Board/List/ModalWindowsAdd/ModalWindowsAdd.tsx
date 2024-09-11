import React, { useEffect, useRef, useState } from 'react';
import './ModalWindowsAdd.scss';

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
  const [cardId, setCardId] = useState<number>();
  const addDivRef = useRef<HTMLDivElement | null>(null);

  const enter = (): void => {
    if (cardId) {
      setData({ title, id: cardId, position: cardLength });
      setIsModalWindows(false);
      setIsOpenModalWindowsAddCards(false);
    }
  };
  useEffect(() => {
    setCardId(listId);
  }, [listId]);
  const stopPropagation = (event: React.MouseEvent): void => {
    event.stopPropagation();
  };

  const titleText = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setTitle(event.target.value);
  };
  const closeModalWindows = (): void => {
    setIsModalWindows(false);
    setIsOpenModalWindowsAddCards(false);
  };

  useEffect(() => {
    if (addDivRef.current) {
      addDivRef.current.style.animation = 'expandHeightCards 0.3s forwards';
    }
  }, []);

  return (
    <div onClick={stopPropagation} ref={addDivRef} className="modalPositionCardsAdd" style={{ pointerEvents: 'auto' }}>
      <input type="text" value={title} onChange={titleText} placeholder="Введіть назву картки" />
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
