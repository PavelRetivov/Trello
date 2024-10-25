import React, { useEffect, useRef, useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import { useParams } from 'react-router-dom';
import styles from '../../../styles/globalStyle.module.scss';
import { putDescriptionCard } from '../../../services/Services';
import { useAppDispatch } from '../../../store';
import { getListsBoardByIdServiceThunk } from '../../../module/board';
import { updateDescription } from '../../../module/modalEditCardSlice/modalEditCardSlice';
import useCloseModalWindowsClick from '../../../hooks/useCloseModalWindowsClick';

interface descriptionCardProps {
  description: string | null;
  listId: number | null;
}

function DescriptionCard({ description, listId }: descriptionCardProps): JSX.Element {
  const [isEditText, setIsEditText] = useState(!description?.trim());
  const { boardId, cardId } = useParams();
  const [textDescription, setTextDescription] = useState(description || '');
  const areaTextRef = useRef<HTMLTextAreaElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const dispatch = useAppDispatch();
  console.log('textDescription', textDescription);

  const handleSubmit = async (): Promise<void> => {
    console.log('lalala');
  };
  const addDescription = async (): Promise<void> => {
    if (boardId && cardId && listId && textDescription !== description) {
      const result = await putDescriptionCard(boardId, cardId, textDescription, listId);
      if (result && result === 'Updated') {
        dispatch(updateDescription({ description: textDescription }));
        await dispatch(getListsBoardByIdServiceThunk(Number(boardId)));
        if (textDescription.trim() === '') {
          setIsEditText(true);
        } else {
          setIsEditText(false);
        }
      }
    } else if (textDescription.trim() === '') {
      setIsEditText(true);
    } else {
      setIsEditText(false);
      console.log('its Ok');
    }
  };

  useEffect(() => {
    if (isEditText && areaTextRef.current && areaTextRef.current.value.length > 0) {
      const lengthAreaText = areaTextRef.current.value.trimEnd().length;
      areaTextRef.current.focus();
      areaTextRef.current.setSelectionRange(lengthAreaText, lengthAreaText);
    }
  }, [isEditText, areaTextRef]);

  /* not working how need */
  // const acceptEditDescription = async (event: React.KeyboardEvent): Promise<void> => {
  //   event.stopPropagation();
  //   if (event.key === 'Enter') {
  //     await addDescription();
  //   }
  // };

  const setText = (event: React.FormEvent<HTMLTextAreaElement>): void => {
    event.stopPropagation();
    setTextDescription(event.currentTarget.value);
  };
  const closeEditTextClick = async (event: MouseEvent): Promise<void> => {
    if (areaTextRef.current && areaTextRef.current.value.length > 0) {
      if (!(areaTextRef.current?.contains(event.target as Node) || buttonRef.current?.contains(event.target as Node))) {
        await addDescription();
      }
    }
  };

  const buttonAcceptDescription = async (): Promise<void> => {
    await addDescription();
  };

  useCloseModalWindowsClick({ isOpen: isEditText, closeListsBoardName: closeEditTextClick });

  return (
    <>
      <div className={styles.descriptionName}>
        <img src={`${process.env.PUBLIC_URL}/iconDescription.png`} alt="description" />
        <h3>Description</h3>
      </div>
      <form className={styles.textDescription} onSubmit={handleSubmit}>
        {!isEditText ? (
          <pre onClick={() => setIsEditText(true)}>{description}</pre>
        ) : (
          <>
            <TextareaAutosize ref={areaTextRef} minRows={5} maxRows={10} value={textDescription} onInput={setText} />
            <button onClick={buttonAcceptDescription} ref={buttonRef}>
              Saved
            </button>
          </>
        )}
      </form>
    </>
  );
}

export default DescriptionCard;
