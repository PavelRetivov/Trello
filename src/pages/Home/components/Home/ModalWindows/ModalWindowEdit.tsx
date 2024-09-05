import React, { useEffect, useState } from 'react';
import './ModalWindow.scss';
import putData from '../../Backend/PUT/Put';
import { checkTitle } from './FunctionForModalWindows/FunctionForModalWindows';

interface ModalProps {
  id: number | undefined;
  updateData: Function;
  setModalWindowsEdition: Function;
  titleProps: string | undefined;
  customProps: any;
}

const ModalWindowEdit = ({ id, updateData, setModalWindowsEdition, titleProps, customProps }: ModalProps) => {
  const [valueText, setValueText] = useState('');
  const [color, setColor] = useState('');
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (titleProps) setValueText(titleProps);
    if (
      customProps &&
      typeof customProps === 'object' &&
      'background' in customProps &&
      typeof customProps.background === 'string'
    )
      setColor(customProps.background);
  }, []);

  const stopPropagation = (event: React.MouseEvent) => {
    event.stopPropagation();
  };
  const setBoardName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValueText(event.target.value);
  };
  const setBoardColor = (event: React.ChangeEvent<HTMLInputElement>) => {
    setColor(event.target.value);
  };

  const enter = async () => {
    console.log(valueText);
    if (id && checkTitle(valueText)) {
      setIsError(false);
      await putData(id, valueText, color);
      await updateData();
      setModalWindowsEdition(false);
    } else {
      setIsError(true);
    }
  };

  return (
    <div className="modal-windows" onClick={stopPropagation}>
      <label htmlFor="boardName">Назва дошки</label>

      <div>
        <input type="text" id="boardName" name="text1" value={valueText} onChange={setBoardName} />
        {isError ? <p style={{ color: 'red' }}>Ви ввели не коректні дані</p> : null}
      </div>

      <label htmlFor="colorName">Фон дошки</label>
      <input type="color" id="colorName" name="tex2" value={color} onChange={setBoardColor} />
      <button onClick={enter}>Редагувати</button>
    </div>
  );
};

export default React.memo(ModalWindowEdit);
