import { ReactElement, useEffect, useState } from 'react';
import putData from '../../Backend/PUT/Put';

interface modalProps {
  configBoard:
    | undefined
    | {
        title: string;
        board_id: string;
        id: number;
      };
  setIsOpenModalEdit: Function;
  getList: Function;
}

const ModalWindowsEdit = ({ setIsOpenModalEdit, configBoard, getList }: modalProps) => {
  const [text, setText] = useState('');

  const handClick = (event: React.MouseEvent) => {
    event.stopPropagation();
  };
  useEffect(() => {
    if (configBoard) setText(configBoard.title);
  }, []);

  const inputText = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log('text');
    setText(event.target.value);
  };
  const enter = async () => {
    if (configBoard) {
      await putData(configBoard.board_id, configBoard.id, text);
      getList();
    }
    setIsOpenModalEdit(false);
  };

  return (
    <div className="modal-windows" onClick={handClick} style={{ pointerEvents: 'auto' }}>
      <input type="text" name="" id="" value={text} onChange={inputText} />
      <button onClick={enter}>Enter</button>
    </div>
  );
};

export default ModalWindowsEdit;
