import React, { useState } from 'react';
import './ModalWindow.scss';
import postData from '../../Backend/Post/post';
import { checkTitle } from './FunctionForModalWindows/FunctionForModalWindows';
import { Cat, list, greatFon } from '../ImageFon/Image';

interface ModalProps {
  fetchData: () => void;
  setModalWindowsAdd: (isOpen: boolean) => void;
}

function ModalWindows({ fetchData, setModalWindowsAdd }: ModalProps): JSX.Element {
  const [title, setTitle] = useState('');
  const [color, setColor] = useState('#ffffff');
  const [isError, setIsError] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState('#ffffff');
  const [image] = useState([Cat, list, greatFon]);

  const setBoardName = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setTitle(event.target.value);
  };

  const setBoardColor = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setColor(event.target.value);
    setBackgroundColor(event.target.value);
  };

  const setImage = (event: React.MouseEvent<HTMLElement>): void => {
    const target = event.target as HTMLElement;
    setBackgroundColor(target.style.backgroundImage);
  };

  const stopPropagation = (event: React.MouseEvent): void => {
    event.stopPropagation();
  };

  const enter = async (): Promise<void> => {
    if (checkTitle(title)) {
      setIsError(false);
      await postData(title, { background: backgroundColor });
      await fetchData();
      setModalWindowsAdd(false);
    } else {
      setIsError(true);
    }
  };

  const isImageUrl = (url: string): boolean => {
    return url.startsWith('url');
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
      <div className="setFon">
        <div className="setFonColor">
          <input type="color" value={color} name="input2" id="colorName" onChange={setBoardColor} />
          <figure
            style={{
              backgroundColor: !isImageUrl(backgroundColor) ? backgroundColor : 'none',
              backgroundImage: isImageUrl(backgroundColor) ? backgroundColor : 'none',
              backgroundSize: '100% 100%',
            }}
          />
        </div>
        <div className="setFonImage">
          <figure style={{ backgroundImage: image[0], backgroundSize: '100% 100%' }} onClick={setImage} />
          <figure style={{ backgroundImage: image[1], backgroundSize: '100% 100%' }} onClick={setImage} />
          <figure style={{ backgroundImage: image[2], backgroundSize: '100% 100%' }} onClick={setImage} />
        </div>
      </div>
      <button onClick={enter}>Створити дошку</button>
    </div>
  );
}
export default ModalWindows;
