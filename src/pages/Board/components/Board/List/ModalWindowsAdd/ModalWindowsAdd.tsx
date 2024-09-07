import React, { useEffect, useState } from 'react';
import ICard from '../../../interfaces/ICard';
import './ModalWindowsAdd.scss';

interface modalProps {
  setData: (data: ICard) => void;
  cardIdBoard: number;
  setIsModalWindows: (isTrue: boolean) => void;
}

function ModalWindowsAdd({ setData, cardIdBoard, setIsModalWindows }: modalProps): JSX.Element {
  const [title, setTitle] = useState('');
  const [cardId, setCardId] = useState<number>();
  const [position, setPosition] = useState<number>();
  const [description, setDescription] = useState('');
  const [custom, setCustom] = useState('');

  const enter = (): void => {
    if (cardId && position) {
      setData({
        title,
        id: cardId,
        position,
        description,
        custom,
      });
      setIsModalWindows(false);
    }
  };
  useEffect(() => {
    setCardId(cardIdBoard);
  }, [cardIdBoard]);
  const stopPropagation = (event: React.MouseEvent): void => {
    event.stopPropagation();
  };

  const titleText = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setTitle(event.target.value);
  };
  const positionNumber = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setPosition(Number(event.target.value));
  };
  const descriptionText = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setDescription(event.target.value);
  };
  const customAny = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setCustom(event.target.value);
  };

  return (
    <div onClick={stopPropagation} className="modal-style" style={{ pointerEvents: 'auto' }}>
      <input type="text" value={title} onChange={titleText} />
      <input type="number" name="" id="" value={position} onChange={positionNumber} />
      <input type="text" name="" id="" value={description} onChange={descriptionText} />
      <input type="text" name="" id="" value={custom} onChange={customAny} />
      <button onClick={enter}>Enter</button>
    </div>
  );
}

export default ModalWindowsAdd;
