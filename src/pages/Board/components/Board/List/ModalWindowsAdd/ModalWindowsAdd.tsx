import { title } from 'process';
import './ModalWindowsAdd.scss';
import { ReactElement, useEffect, useState } from 'react';

interface modalProps {
  setData: Function;
  card_id: number;
  setIsModalWindows: Function;
}

const ModalWindowsAdd = ({ setData, card_id, setIsModalWindows }: modalProps) => {
  const [title, setTitle] = useState('');
  const [cardId, setCardId] = useState<number>();
  const [position, setPosition] = useState<number>();
  const [description, setDescription] = useState('');
  const [custom, setCustom] = useState('');

  const enter = () => {
    setData({
      title: title,
      id: cardId,
      position: position,
      description: description,
      custom: custom,
    });
    setIsModalWindows(false);
  };
  useEffect(() => {
    setCardId(card_id);
  }, []);
  const stopPropagation = (event: React.MouseEvent) => {
    event.stopPropagation();
  };

  const titleText = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };
  const positionNumber = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPosition(Number(event.target.value));
  };
  const descriptionText = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(event.target.value);
  };
  const customAny = (event: React.ChangeEvent<HTMLInputElement>) => {
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
};

export default ModalWindowsAdd;
