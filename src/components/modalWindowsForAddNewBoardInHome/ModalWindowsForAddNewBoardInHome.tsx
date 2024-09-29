import React, { useRef } from 'react';
import ReactDOM from 'react-dom';
import styles from '../../styles/globalStyle.module.scss';
import { postBoardThunk } from '../../module/boards';
import { useAppDispatch } from '../../store';

interface modalProps {
  isOpenModal: boolean;
  closeModal: () => void;
}

function ModalWindowsForAddNewBoardInHome({ isOpenModal, closeModal }: modalProps): JSX.Element | null {
  const dispatch = useAppDispatch();
  const inputRefTitle = useRef<HTMLInputElement | null>(null);
  const inputRefColor = useRef<HTMLInputElement>(null);
  const handleOverlayClick = (): void => {
    closeModal();
  };
  const handleContentClick = (event: React.MouseEvent): void => {
    event.stopPropagation();
  };

  const accept = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    if (inputRefTitle.current?.value && inputRefColor.current?.value) {
      dispatch(
        postBoardThunk({ title: inputRefTitle.current.value, custom: { background: inputRefColor.current.value } })
      );
      closeModal();
    }
  };

  if (!isOpenModal) return null;
  return ReactDOM.createPortal(
    <div className={styles.modalWindowsForAddNewBoardInHome} onClick={handleOverlayClick}>
      <div className={styles.activeElement} onClick={handleContentClick}>
        <form onSubmit={accept}>
          <div className={styles.form}>
            <label htmlFor="">
              <p>Text</p>
              <input className={styles.inputText} type="text" ref={inputRefTitle} />
            </label>
            <label htmlFor="">
              {' '}
              color
              <input className={styles.inputColor} type="color" ref={inputRefColor} />
            </label>
          </div>
          <button type="submit">Add BOARD</button>
        </form>
      </div>
    </div>,
    document.getElementById('root') as HTMLElement
  );
}

export default React.memo(ModalWindowsForAddNewBoardInHome);
