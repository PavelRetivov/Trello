import React, { useState } from 'react';
import './modalWindowsAdd.scss';
import postData from '../../Backend/Post/Post';

interface modalProps {
  idBorder: string;
  setIsOpenModalWindows: (isOpen: boolean) => void;
  getList: () => void;
}

function ModalWindowsAdd({ idBorder, setIsOpenModalWindows, getList }: modalProps): JSX.Element {
  const [title, setTitle] = useState('');
  const [count, setCount] = useState<number>();

  const changeTitleText = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setTitle(event.target.value);
  };

  const handleClick = (event: React.MouseEvent): void => {
    event.stopPropagation();
  };

  const changePriceText = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setCount(+event.target.value);
  };

  const enter = async (): Promise<void> => {
    setIsOpenModalWindows(false);
    if (idBorder !== 'error' && count) {
      console.log(idBorder, title);
      await postData(idBorder, title, count);
    }
    getList();
  };

  return (
    <div className="modalWindowsAdd" onClick={handleClick}>
      <input type="text" value={title} onChange={changeTitleText} />
      <input type="number" name="" value={count} id="" onChange={changePriceText} />
      <button onClick={enter}>Enter</button>
    </div>
  );
}

export default ModalWindowsAdd;
