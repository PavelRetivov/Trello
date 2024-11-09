import React, { useRef, useState } from 'react';
import styles from '../../../styles/globalStyle.module.scss';

function PicturesBackground({ setFonBoard }: { setFonBoard: (setFon: string) => void }): JSX.Element {
  const [preview, setPreview] = useState<string>('');

  const [fon1] = useState(`${process.env.PUBLIC_URL}/fon1.jpg`);
  const [fon2] = useState(`${process.env.PUBLIC_URL}/fon2.jpg`);
  const [fon3] = useState(`${process.env.PUBLIC_URL}/fon3.jpg`);
  const [fon4] = useState(`${process.env.PUBLIC_URL}/fon4.jpg`);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const photoEditor = (files: FileList): void => {
    if (files && files.length > 0) {
      const file = files[0];
      const fileRider = new FileReader();

      fileRider.onload = (event): void => {
        const fileContent = event.target?.result; // Вміст файлу
        if (typeof fileContent === 'string') {
          setPreview(`url(${fileContent})`);
          setFonBoard(`url(${fileContent})`);
        }
      };
      fileRider.readAsDataURL(file);
    }
  };

  const handleSetFonBoard = (event: React.MouseEvent<HTMLDivElement>): void => {
    if (event.currentTarget.style.backgroundImage !== 'initial') {
      setFonBoard(event.currentTarget.style.backgroundImage);
    }
  };

  const setFonInInput = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { files } = event.target;
    if (files) photoEditor(files);
  };

  const openInput = (): void => {
    if (fileInputRef.current) fileInputRef.current.click();
  };
  const onDrop = (event: React.DragEvent<HTMLLabelElement>): void => {
    event.preventDefault();
    const { files } = event.dataTransfer;
    photoEditor(files);
  };

  const handleDragOver = (event: React.DragEvent<HTMLLabelElement>): void => {
    event.preventDefault();
  };

  return (
    <div className={styles.picturesBackground}>
      <div className={styles.photoFon}>
        <div className={styles.picture} style={{ backgroundImage: `url(${fon1})` }} onClick={handleSetFonBoard} />
        <div className={styles.picture} style={{ backgroundImage: `url(${fon2})` }} onClick={handleSetFonBoard} />
        <div className={styles.picture} style={{ backgroundImage: `url(${fon3})` }} onClick={handleSetFonBoard} />
        <div className={styles.picture} style={{ backgroundImage: `url(${fon4})` }} onClick={handleSetFonBoard} />
      </div>
      <div className={styles.dropFon}>
        <label htmlFor="" className={styles.dropPhoto} onClick={openInput} onDrop={onDrop} onDragOver={handleDragOver}>
          <input type="file" onChange={setFonInInput} ref={fileInputRef} />
          <p>click for choose a background or drop a photo here</p>
        </label>
        <div
          className={styles.showPhoto}
          style={preview ? { backgroundImage: preview } : { background: '#ffffff' }}
          onClick={handleSetFonBoard}
        >
          {!preview && <p>here will be your photo</p>}
        </div>
      </div>
    </div>
  );
}

export default PicturesBackground;
