import React, { FormEvent, useEffect, useRef, useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import { useParams } from 'react-router-dom';
import styles from '../../../styles/globalStyle.module.scss';
import { putDescriptionCard } from '../../../services/Services';
import { useAppDispatch } from '../../../store';
import { getListsBoardByIdServiceThunk } from '../../../module/board';
import { updateDescription } from '../../../module/modalEditCardSlice/modalEditCardSlice';

interface descriptionCardProps {
  description: string | null;
  listId: number | null;
}

function DescriptionCard({ description, listId }: descriptionCardProps): JSX.Element {
  const [isEditText, setIsEditText] = useState(false);
  const { boardId, cardId } = useParams();
  const [textDescription, setTextDescription] = useState(description || '');
  const areaTextRef = useRef<HTMLTextAreaElement>(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (description) {
      setIsEditText(true);
    }
  }, [description]);

  const handleSubmit = async (event: FormEvent): Promise<void> => {
    event.stopPropagation();
    // if(boardId && cardId && listId && areaTextRef.current && areaTextRef.current.value.length > 2) {
    //     const result = await putDescriptionCard(boardId, cardId, areaTextRef.current.value, Number(listId));
    //     console.log(result);
    //     if(result && result === 'Updated'){
    //         dispatch(updateDescription({description: areaTextRef.current.value}));
    //         console.log('update');
    //     }
    //     await dispatch(getListsBoardByIdServiceThunk(Number(boardId)));
    // }
  };

  const addDescription = async (event: React.KeyboardEvent): Promise<void> => {
    if (event.key === 'Enter') {
      event.stopPropagation();
      if (boardId && cardId && listId && textDescription && textDescription.length > 2) {
        const result = await putDescriptionCard(boardId, cardId, textDescription, listId);
        if (result && result === 'Updated') {
          dispatch(updateDescription({ description: textDescription }));
          console.log('update');
        }
      }
      await dispatch(getListsBoardByIdServiceThunk(Number(boardId)));
    }
  };
  const setText = (event: React.FormEvent<HTMLTextAreaElement>): void => {
    event.stopPropagation();
    event.preventDefault();
    setTextDescription(event.currentTarget.value);
  };

  return (
    <>
      <div className={styles.descriptionName}>
        <img src={`${process.env.PUBLIC_URL}/iconDescription.png`} alt="description" />
        <h3>Description</h3>
      </div>
      <form className={styles.textDescription} onSubmit={handleSubmit}>
        {!isEditText ? (
          <TextareaAutosize
            onKeyDown={addDescription}
            ref={areaTextRef}
            minRows={5}
            maxRows={10}
            value={textDescription}
            onInput={setText}
          />
        ) : (
          <pre onClick={() => setIsEditText(false)}>{description}</pre>
        )}
      </form>
    </>
  );
}

export default DescriptionCard;
