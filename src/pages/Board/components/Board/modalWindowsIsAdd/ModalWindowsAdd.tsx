import React, { useEffect, useRef, useState } from 'react';
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
  const addDivRef = useRef<HTMLDivElement | null>(null);

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
  const closeModalWindows = (): void => {
    setIsOpenModalWindows(false);
  };
  useEffect(() => {
    if (addDivRef.current) {
      addDivRef.current.style.animation = 'expandHeight 0.15s forwards';
    }
  }, []);

  return (
    <div className="modalWindowsAdd" ref={addDivRef} onClick={handleClick}>
      <input type="text" value={title} onChange={changeTitleText} placeholder="Введіть назву дошки" />
      <div className="positionButton">
        <button onClick={enter}>Додати дошку</button>
        <button onClick={closeModalWindows}>X</button>
      </div>
    </div>
  );
}

export default ModalWindowsAdd;
