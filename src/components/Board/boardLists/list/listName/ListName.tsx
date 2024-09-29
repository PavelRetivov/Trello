import React, { useEffect, useRef, useState } from 'react';
import { useAppDispatch } from '../../../../../store';
import { getListsBoardByIdServiceThunk } from '../../../../../module/board';
import { putListNameInBoard } from '../../../../../services/Services';

interface listNameProps {
  title: string;
  idList: number;
  idBoard: string | undefined;
}

function ListName({ title, idList, idBoard }: listNameProps): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();

  const openEditText = (): void => {
    setIsOpen(true);
  };

  useEffect(() => {
    const handleClick = async (event: MouseEvent): Promise<void> => {
      if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        if (inputRef.current && inputRef.current.value.length > 1 && idBoard) {
          await putListNameInBoard(idBoard, idList, inputRef.current.value);
          dispatch(getListsBoardByIdServiceThunk(Number(idBoard)));
        }
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClick);
      inputRef.current?.focus();
    } else {
      document.removeEventListener('mousedown', handleClick);
    }

    return (): void => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, [isOpen, idBoard, idList, dispatch]);

  return (
    <div>
      {!isOpen ? <h1 onClick={openEditText}>{title}</h1> : <input type="text" ref={inputRef} defaultValue={title} />}
    </div>
  );
}

export default ListName;
