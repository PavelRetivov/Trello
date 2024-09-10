import React, { useState } from 'react';
import './modalWindowsAdd.scss';
import postData from '../../Backend/Post/Post';

interface modalProps {
  idBorder: string;
  setIsOpenModalWindows: (isOpen: boolean) => void;
  getList: (request: string) => void;
  listLength: number;
}

function ModalWindowsAdd({ idBorder, setIsOpenModalWindows, getList, listLength }: modalProps): JSX.Element {
  const [title, setTitle] = useState('');

  const changeTitleText = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setTitle(event.target.value);
  };

  const handleClick = (event: React.MouseEvent): void => {
    event.stopPropagation();
  };

  const enter = async (): Promise<void> => {
    setIsOpenModalWindows(false);
    if (idBorder !== 'error') {
      console.log(idBorder, title);
      await postData(idBorder, title, listLength);
    }
    getList('setList');
  };

  return (
    <div className="modalWindowsAdd" onClick={handleClick}>
      <input type="text" value={title} onChange={changeTitleText} />
      <button onClick={enter}>Enter</button>
    </div>
  );
}

export default ModalWindowsAdd;
