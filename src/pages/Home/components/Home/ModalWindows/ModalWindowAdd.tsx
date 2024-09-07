import React, { useState } from 'react';
import './ModalWindow.scss';
import postData from '../../Backend/Post/post';
import { checkTitle } from './FunctionForModalWindows/FunctionForModalWindows';

interface ModalProps {
  fetchData: () => void;
  setModalWindowsAdd: (isOpen: boolean) => void;
}

function ModalWindows({ fetchData, setModalWindowsAdd }: ModalProps): JSX.Element {
  const [title, setTitle] = useState('');
  const [color, setColor] = useState('#ffffff');
  const [isError, setIsError] = useState(false);

  const setBoardName = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setTitle(event.target.value);
  };

  const setBoardColor = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setColor(event.target.value);
  };

  const stopPropagation = (event: React.MouseEvent): void => {
    event.stopPropagation();
  };

  const enter = async (): Promise<void> => {
    if (checkTitle(title)) {
      setIsError(false);
      await postData(title, { background: color });
      await fetchData();
      setModalWindowsAdd(false);
    } else {
      setIsError(true);
    }
  };

  return (
    <div className="modal-windows" onClick={stopPropagation}>
      <label htmlFor="boardName">Назва дошки</label>
      <div>
        <input
          type="text"
          value={title}
          name="input1"
          id="boardName"
          onChange={setBoardName}
          style={{ borderColor: isError ? 'red' : 'blueviolet' }}
        />
        {isError ? <p style={{ color: 'red' }}>Ви ввели не коректні дані</p> : null}
      </div>
      <label htmlFor="colorName">Фон дошки</label>
      <input type="color" value={color} name="input2" id="colorName" onChange={setBoardColor} />

      <button onClick={enter}>Створити дошку</button>
    </div>
  );
}
export default ModalWindows;
