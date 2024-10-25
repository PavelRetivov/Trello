import React from 'react';
import styles from '../../../../../styles/globalStyle.module.scss';

interface listsChosePositionProps {
  maxPos: number | null;
  filter: string;
  handleItemPosition: (position: string) => void;
}

function ListsChosePosition({ maxPos, filter, handleItemPosition }: listsChosePositionProps): JSX.Element {
  console.log('maxPos', maxPos);

  return (
    <ul className={styles.chosePosition}>
      {maxPos ? (
        Array.from({ length: maxPos }, (_, index) => (index + 1).toString())
          .filter((position) => position.toLowerCase().includes(filter.toLowerCase()))
          .map((position) => (
            <li key={position} onClick={() => handleItemPosition(position)}>
              {position}
            </li>
          ))
      ) : (
        <h3>not variants</h3>
      )}
    </ul>
  );
}

export default ListsChosePosition;
