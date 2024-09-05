import React, { useEffect, useState } from 'react';

import './modalWindowsAdd.scss';
import postData from '../../Backend/Post/Post';

interface modalProps {
  id_border: string;
  setIsOpenModalWindows: Function;
  getList: Function;
}

const ModalWindowsAdd = ({ id_border, setIsOpenModalWindows, getList }: modalProps) => {
  const [title, setTitle] = useState('');
  const [count, setCount] = useState<number>();

  const changeTitleText = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleClick = (event: React.MouseEvent) => {
    event.stopPropagation();
  };

  const changePriceText = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCount(+event.target.value);
  };

  const enter = async () => {
    setIsOpenModalWindows(false);
    if (id_border !== 'error' && count) {
      console.log(id_border, title);
      await postData(id_border, title, count);
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
};

export default ModalWindowsAdd;
