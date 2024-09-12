import React, { useEffect, useRef, useState } from 'react';
import './modalWindowsAdd.scss';
import postData from '../../Backend/Post/Post';
import { checkTitle } from '../checkValidTitle/CheckValidTitle';

interface modalProps {
  idBorder: string;
  setIsOpenModalWindows: (isOpen: boolean) => void;
  getList: (request: string) => void;
  listLength: number;
}

function ModalWindowsAdd({ idBorder, setIsOpenModalWindows, getList, listLength }: modalProps): JSX.Element {
  const [title, setTitle] = useState('');
  const addDivRef = useRef<HTMLDivElement | null>(null);
  const [isError, setIsError] = useState(false);

  // set title text
  const changeTitleText = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setTitle(event.target.value);
  };

  // stop propagation
  const handleClick = (event: React.MouseEvent): void => {
    event.stopPropagation();
  };

  // add data on database
  const enter = async (): Promise<void> => {
    if (checkTitle(title)) {
      setIsOpenModalWindows(false);
      if (idBorder !== 'error') {
        await postData(idBorder, title, listLength);
      }
      setIsError(false);
      getList('setList');
    } else {
      setIsError(true);
    }
  };

  // close modal windows
  const closeModalWindows = (): void => {
    setIsOpenModalWindows(false);
  };

  // on animation when open modal windows
  useEffect(() => {
    if (addDivRef.current) {
      addDivRef.current.style.animation = 'expandHeight 0.15s forwards';
    }
  }, []);

  return (
    <div className="modalWindowsAdd" ref={addDivRef} onClick={handleClick}>
      <input type="text" value={title} onChange={changeTitleText} placeholder="Введіть назву дошки" />
      {isError ? (
        <p style={{ color: 'red', fontSize: '10px', padding: 0, margin: 0 }}>Ви ввели не коректні дані</p>
      ) : null}
      <div className="positionButton">
        <button onClick={enter}>Додати дошку</button>
        <button onClick={closeModalWindows}>X</button>
      </div>
    </div>
  );
}

export default ModalWindowsAdd;
