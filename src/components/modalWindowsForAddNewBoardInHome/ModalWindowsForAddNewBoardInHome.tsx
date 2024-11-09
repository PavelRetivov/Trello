import React, { useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import styles from '../../styles/globalStyle.module.scss';
import { postBoardThunk } from '../../module/boards';
import { useAppDispatch } from '../../store';
import PicturesBackground from './picturesBackground/PicturesBackground';

interface modalProps {
  isOpenModal: boolean;
  closeModal: () => void;
}

function ModalWindowsForAddNewBoardInHome({ isOpenModal, closeModal }: modalProps): JSX.Element | null {
  const dispatch = useAppDispatch();
  const inputRefTitle = useRef<HTMLInputElement | null>(null);
  const inputRefColor = useRef<HTMLInputElement>(null);
  const [fonBoard, setFonBoard] = useState('#ffffff');
  const handleOverlayClick = (): void => {
    closeModal();
  };
  const handleContentClick = (event: React.MouseEvent): void => {
    event.stopPropagation();
  };

  const accept = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    if (inputRefTitle.current?.value && fonBoard) {
      dispatch(postBoardThunk({ title: inputRefTitle.current.value, custom: { background: fonBoard } }));
      closeModal();
    }
  };

  const checkTypeFon = (): boolean => {
    if (fonBoard && fonBoard.startsWith('url')) {
      return true;
    }
    return false;
  };

  const handleChangeColor = (): void => {
    if (inputRefColor.current?.value) setFonBoard(inputRefColor.current.value);
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
            <div className={styles.previewSetFon}>
              <p className={styles.descriptionByChoseFon}>here well be set you fon </p>
              <span
                className={styles.choseFon}
                style={checkTypeFon() ? { backgroundImage: fonBoard } : { background: fonBoard }}
              />
            </div>
            <label htmlFor="">
              {' '}
              color
              <input className={styles.inputColor} type="color" ref={inputRefColor} onChange={handleChangeColor} />
            </label>
            <PicturesBackground setFonBoard={setFonBoard} />
          </div>
          <button type="submit">Add BOARD</button>
        </form>
      </div>
    </div>,
    document.getElementById('root') as HTMLElement
  );
}

export default React.memo(ModalWindowsForAddNewBoardInHome);
