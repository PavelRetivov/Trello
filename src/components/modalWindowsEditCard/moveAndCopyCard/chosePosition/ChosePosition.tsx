import React, { FormEvent, useEffect, useRef, useState } from 'react';
import ListsChosePosition from './listsChosePosition/ListChosePosition';
import useCloseModalWindowsClick from '../../../../hooks/useCloseModalWindowsClick';
import styles from '../../../../styles/globalStyle.module.scss';

interface choseBoardsProps {
  maxPosition: number | null;
  setPositionMovedCard: (position: number) => void;
  isThisList: boolean;
}

function ChosePosition({ maxPosition, setPositionMovedCard, isThisList }: choseBoardsProps): JSX.Element {
  const [position, setPosition] = useState('');
  const [isOpenToggleList, setIsToggleList] = useState(false);
  const [filter, setFilter] = useState('');
  const inputRef = useRef<HTMLInputElement | null>(null);
  useEffect(() => {
    if (!maxPosition) {
      setPosition('');
    }
  }, [maxPosition]);

  const onInputPosition = (event: FormEvent<HTMLInputElement>): void => {
    event.stopPropagation();
    if (inputRef.current) {
      setPosition(inputRef.current.value);
      setFilter(inputRef.current.value);
    }
  };

  const toggleDropDownLists = (): void => {
    setIsToggleList(!isOpenToggleList);
    setFilter('');
  };

  const handleItemPosition = (pos: string): void => {
    setPosition(pos);
    setPositionMovedCard(Number(pos));
    setIsToggleList(false);
    console.log('position:', pos);
  };

  const closeListsName = (event: MouseEvent): void => {
    const target = event.target as HTMLElement;

    if (target.closest(`.${styles.containerChosePosition}`)) {
      console.log('hz2');
    } else {
      setIsToggleList(false);
    }
  };

  const definitionMaxPosition = (): number => {
    if (maxPosition !== null) {
      if (isThisList) {
        return maxPosition;
      }
      return maxPosition + 1;
    }
    return 0;
  };

  useCloseModalWindowsClick({ isOpen: isOpenToggleList, closeListsBoardName: closeListsName });
  return (
    <form className={styles.containerChosePosition}>
      <label htmlFor="">
        {' '}
        position
        <input
          type="number"
          value={position}
          ref={inputRef}
          max={definitionMaxPosition()}
          min={1}
          onInput={onInputPosition}
          onClick={toggleDropDownLists}
          readOnly={!maxPosition}
        />
      </label>
      {isOpenToggleList ? (
        <ListsChosePosition maxPos={definitionMaxPosition()} filter={filter} handleItemPosition={handleItemPosition} />
      ) : null}
    </form>
  );
}

export default ChosePosition;
