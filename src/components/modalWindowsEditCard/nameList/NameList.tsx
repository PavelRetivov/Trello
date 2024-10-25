import React from 'react';
import styles from '../../../styles/globalStyle.module.scss';

interface nameListProps {
  title: string | null;
  openModalWindowsMoveCard: (e: React.MouseEvent) => void;
}

function NameList({ title, openModalWindowsMoveCard }: nameListProps): JSX.Element {
  return (
    <div className={styles.nameListCard}>
      <p>in list:</p>
      <h3 onClick={openModalWindowsMoveCard}>{title}</h3>
    </div>
  );
}

export default NameList;
