import React, { useEffect, useState } from 'react';
import putData from '../../Backend/PUT/Put';

interface modalProps {
  configBoard:
    | undefined
    | {
        titleNew: string;
        boardIdNew: string;
        id: number;
      };
  setIsOpenModalEdit: (isOpen: boolean) => void;
  getList: (request: string) => void;
}

function ModalWindowsEdit({ setIsOpenModalEdit, configBoard, getList }: modalProps): JSX.Element {
  const [text, setText] = useState('');
  console.log('edit');

  const handClick = (event: React.MouseEvent): void => {
    event.stopPropagation();
  };
  useEffect(() => {
    if (configBoard) setText(configBoard.titleNew);
  }, [configBoard]);

  const inputText = (event: React.ChangeEvent<HTMLInputElement>): void => {
    console.log('text');
    setText(event.target.value);
  };
  const enter = async (): Promise<void> => {
    if (configBoard) {
      await putData(configBoard.boardIdNew, configBoard.id, text);
      getList('setList');
    }
    setIsOpenModalEdit(false);
  };

  return (
    <div className="modal-windows" onClick={handClick} style={{ pointerEvents: 'auto' }}>
      <input type="text" name="" id="" value={text} onChange={inputText} />
      <button onClick={enter}>Enter</button>
    </div>
  );
}

export default ModalWindowsEdit;
