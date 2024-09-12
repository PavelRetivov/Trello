import React, { useEffect, useState } from 'react';
import './ModalWindow.scss';
import putData from '../../Backend/PUT/Put';
import { checkTitle } from './FunctionForModalWindows/FunctionForModalWindows';
import { Cat, list, greatFon } from '../ImageFon/Image';

interface ModalProps {
  id: number | undefined;
  updateData: () => void;
  setModalWindowsEdition: (isOpen: boolean) => void;
  titleProps: string | undefined;
  customProps: object | undefined;
}

function ModalWindowEdit({ id, updateData, setModalWindowsEdition, titleProps, customProps }: ModalProps): JSX.Element {
  const [valueText, setValueText] = useState('');
  const [color, setColor] = useState('');
  const [isError, setIsError] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState('#ffffff');
  const [image] = useState([Cat, list, greatFon]);

  useEffect(() => {
    if (titleProps) setValueText(titleProps);
    if (
      customProps &&
      typeof customProps === 'object' &&
      'background' in customProps &&
      typeof customProps.background === 'string'
    )
      setBackgroundColor(customProps.background);
  }, [titleProps, customProps]);

  const stopPropagation = (event: React.MouseEvent): void => {
    event.stopPropagation();
  };
  const setBoardName = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setValueText(event.target.value);
  };
  const setBoardColor = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setColor(event.target.value);
    setBackgroundColor(event.target.value);
  };

  const enter = async (): Promise<void> => {
    if (id && checkTitle(valueText)) {
      setIsError(false);
      await putData(id, valueText, backgroundColor);
      await updateData();
      setModalWindowsEdition(false);
    } else {
      setIsError(true);
    }
  };

  const setImage = (event: React.MouseEvent<HTMLElement>): void => {
    const target = event.target as HTMLElement;
    setBackgroundColor(target.style.backgroundImage);
  };

  const isImageUrl = (url: string): boolean => {
    return url.startsWith('url');
  };

  return (
    <div className="modal-windows" onClick={stopPropagation}>
      <label htmlFor="boardName">Назва дошки</label>

      <div>
        <input type="text" id="boardName" name="text1" value={valueText} onChange={setBoardName} />
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

      <button onClick={enter}>Редагувати</button>
    </div>
  );
}

export default React.memo(ModalWindowEdit);
