import React, { memo, useEffect, useRef, useState } from 'react';
import styles from '../../../../styles/pageBoardStyle.module.scss';
import { useAppDispatch } from '../../../../store';
import { putBoardNameThunk } from '../../../../module/board';

function NameBoard(data: { nameBoard: string; boardId: number | null }): JSX.Element {
  const [isFocus, setIsFocus] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const { nameBoard, boardId } = data;
  const inputRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setInputValue(nameBoard);
    setIsFocus(false);
  }, [nameBoard]);

  const calculatorWithInput = (text: string): string => {
    return `${Number(text.length * 1.25)}em`;
  };

  useEffect(() => {
    const handleClick = (event: MouseEvent): void => {
      if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
        setIsFocus(false);
        if (inputRef.current && inputRef.current.value.length > 1 && boardId) {
          dispatch(putBoardNameThunk({ idBoard: boardId, newTitle: inputRef.current.value }));
        }
      }
    };

    if (isFocus) {
      document.addEventListener('mousedown', handleClick);
      inputRef.current?.focus();
    } else {
      document.removeEventListener('mousedown', handleClick);
    }

    return (): void => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, [isFocus, boardId, dispatch]);

  return (
    <form className={styles.titleNameBoard}>
      {!isFocus ? (
        <h3
          onClick={() => {
            setIsFocus(true);
          }}
        >
          {nameBoard}
        </h3>
      ) : (
        <label htmlFor="">
          <input
            type="text"
            ref={inputRef}
            value={inputValue}
            onChange={(event) => setInputValue(event.target.value)}
            style={{ width: calculatorWithInput(inputValue) }}
          />
        </label>
      )}
    </form>
  );
}

export default memo(NameBoard);
