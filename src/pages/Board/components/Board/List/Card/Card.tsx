import React, { useEffect, useRef, useState } from 'react';
import TextareaAutoSize from 'react-textarea-autosize';
import './cards.scss';
import ICard from '../../../interfaces/ICard';
import api from '../../../../../../api/request';
import PutNewTitleCards from './putNewTitle/PutNewTitle';

interface CardProps {
  props: ICard;
  boardId: string | undefined;
  getList: (request: string) => void;
  // updatePosition: (id: number) => Promise<void>;
  setIsInputTitle: (isTrue: boolean) => void;
}

function Card({ props, boardId, getList, setIsInputTitle }: CardProps): JSX.Element {
  const { id, title, listId } = props;
  const [textAreaValue, setTextAreaValue] = useState('');
  const testAreaRef = useRef<HTMLTextAreaElement>(null);
  let enterPresent = false;

  useEffect(() => {
    setTextAreaValue(title);
  }, [title]);

  const deleteCard = async (): Promise<void> => {
    const url = `/board/${boardId}/card/${id}`;
    await api.delete(url);

    // await updatePosition(id);

    getList('setList');
  };

  const editTitleBoard = (event: React.ChangeEvent<HTMLTextAreaElement>): void => {
    setTextAreaValue(event.target.value);
  };

  const onEditTitle = (): void => {
    setIsInputTitle(true);
  };

  const offPointerEvents = async (): Promise<void> => {
    if (enterPresent) {
      enterPresent = false;
      return;
    }
    if (boardId) await PutNewTitleCards({ idBoard: boardId, cardId: id, listId, title: textAreaValue });
    if (testAreaRef.current) testAreaRef.current.blur();
    setIsInputTitle(false);
  };

  const enterInputTitle = async (event: React.KeyboardEvent): Promise<void> => {
    if (event.key === 'Enter') {
      event.preventDefault();
      enterPresent = true;
      if (boardId) await PutNewTitleCards({ idBoard: boardId, cardId: id, listId, title: textAreaValue });
      if (testAreaRef.current) testAreaRef.current.blur();
      setIsInputTitle(false);
    }
  };

  return (
    <li className="list-li">
      <div className="div-li">
        <TextareaAutoSize
          className="textAreaTitleCards"
          value={textAreaValue}
          minRows={1}
          ref={testAreaRef}
          onChange={editTitleBoard}
          onClick={onEditTitle}
          onBlur={offPointerEvents}
          onKeyDown={enterInputTitle}
          id="titleAreaText"
        />
      </div>
      <button className="" onClick={deleteCard}>
        X
      </button>
    </li>
  );
}

export default Card;
