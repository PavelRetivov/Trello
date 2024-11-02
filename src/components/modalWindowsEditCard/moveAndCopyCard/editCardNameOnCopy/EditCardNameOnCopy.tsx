import React, { useEffect, useRef, useState } from 'react';
import styles from '../../../../styles/globalStyle.module.scss';
import { checkValidationText } from '../../../../utils/textValidation/isValidationText';

interface editCardNameOnCopyProps {
  titleCard: string;
  setNameCard: (nameCard: string) => void;
}

function EditCardNameOnCopy({ titleCard, setNameCard }: editCardNameOnCopyProps): JSX.Element {
  const [textAreaValue, setTextAreaValue] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const setNewNameCard = (): void => {
    if (textareaRef.current && checkValidationText(textareaRef.current.value)) {
      setNameCard(textareaRef.current.value);
    } else {
      setTextAreaValue(titleCard);
    }
  };

  const handleOnChange = (): void => {
    if (textareaRef.current) setTextAreaValue(textareaRef.current.value);
  };

  useEffect(() => {
    setTextAreaValue(titleCard);
  }, [titleCard]);

  return (
    <div className={styles.editCardNameOnCopy}>
      <h3>name card</h3>
      <textarea ref={textareaRef} rows={3} onBlur={setNewNameCard} value={textAreaValue} onChange={handleOnChange} />
    </div>
  );
}

export default EditCardNameOnCopy;
