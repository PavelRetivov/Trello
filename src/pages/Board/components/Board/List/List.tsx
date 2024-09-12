import React, { useCallback, useEffect, useRef, useState } from 'react';
import TextareaAutoSize from 'react-textarea-autosize';
import PutNewTitle from './PutNewTitle/PutNewTitle';
import './list.scss';
import IList from '../../interfaces/IList';
import postDataCards from './PostDataCard/PostDataCards';
import ICard from '../../interfaces/ICard';
import ModalWindowsAdd from './ModalWindowsAdd/ModalWindowsAdd';
import './ModalWindowsAdd/ModalWindowsAdd.scss';
import Card from './Card/Card';
import { checkTitle } from '../checkValidTitle/CheckValidTitle';

function List({
  cards,
  id,
  boardId,
  getList,
  setIsOpenModalWindowsAddCards,
  title,
  deleteBoardById,
  setIsInputTitle,
}: IList): JSX.Element {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [lastIsOpen, setLastIsOpen] = useState(false);
  const [dataCard, setDataCard] = useState<{ title: string; id: number; position: number } | undefined>();
  const [card, setCard] = useState<ICard[]>();
  const [textAreaValue, setTextAreaValue] = useState('');
  const [previousTitle, setPreviousTitle] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const isFirstRender = useRef(true);
  const [listId] = useState<number>(id);
  const [enterPresent, setEnterPresent] = useState(false);
  const [isError, setIsError] = useState(false);

  /// ///////////////////

  /* How this working?
  1. When we get cards from props, set their setCard which are responsible for displaying on the page.
  2. When we get dataCards from modalWindowsADd, start function upload cards which 
  star function postList which add new data in data base.
  3.whet data update call function getList which update data in board, and we get new cards.
  */
  const postList = useCallback(async (): Promise<void> => {
    if (boardId && dataCard !== undefined) {
      await postDataCards(boardId, dataCard);
    }
  }, [dataCard, boardId]);
  useEffect(() => {
    setTextAreaValue(title);
    setPreviousTitle(title);
  }, [title]);
  useEffect(() => {
    if (Array.isArray(cards)) {
      setCard(cards);
    }
  }, [cards]);

  const uploadCards = useCallback(async (): Promise<void> => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    await postList();
    getList('setList');
  }, [getList, postList]);

  useEffect(() => {
    uploadCards();
  }, [uploadCards]);

  /// //////////////////////

  // close modal windows when click mouse another place
  useEffect(() => {
    const closeModal = (): void => {
      if (isOpenModal && lastIsOpen) {
        setIsOpenModal(false);
        setIsOpenModalWindowsAddCards(false);
      }
    };

    document.addEventListener('click', closeModal);
    setLastIsOpen(isOpenModal);
    return (): void => {
      document.removeEventListener('click', closeModal);
    };
  }, [isOpenModal, lastIsOpen, setIsOpenModalWindowsAddCards]);

  // open modal windows
  const openModalWindows = (): void => {
    setIsOpenModal(true);
    setIsOpenModalWindowsAddCards(true);
  };

  // edit title board
  const editTitleBoard = (event: React.ChangeEvent<HTMLTextAreaElement>): void => {
    setTextAreaValue(event.target.value);
  };

  // focus textarea when  click edit
  const textAreaFocus = (): void => {
    if (textareaRef.current) {
      setIsInputTitle(true);
      textareaRef.current.focus();
    }
  };

  // no comment ^) becaus name all say
  const onEditTitle = (): void => {
    setIsInputTitle(true);
  };

  // edit title when click keyboard enter
  const enterInputTitle = async (event: React.KeyboardEvent): Promise<void> => {
    if (event.key === 'Enter') {
      event.preventDefault();
      if (checkTitle(textAreaValue)) {
        setEnterPresent(true);
        if (boardId) await PutNewTitle(boardId, listId, textAreaValue);
        if (textareaRef.current) textareaRef.current.blur();
        setIsInputTitle(false);
        setIsError(false);
        setPreviousTitle(textAreaValue);
      } else {
        setTextAreaValue(previousTitle);
        setIsInputTitle(false);
        setIsError(true);
      }
    }
  };

  // when edit by keyboard enter this set enterPresent false and return, but
  // if edit by click mouse another place edit data and off edit title
  const offPointerEvents = async (): Promise<void> => {
    if (enterPresent) {
      setEnterPresent(false);
      return;
    }
    if (checkTitle(textAreaValue)) {
      if (boardId) {
        await PutNewTitle(boardId, listId, textAreaValue);
      }
      if (textareaRef.current) {
        textareaRef.current.blur();
      }
      setIsInputTitle(false);
      setIsError(false);
      setPreviousTitle(textAreaValue);
    } else {
      setTextAreaValue(previousTitle);
      setIsInputTitle(false);
      setIsError(true);
    }
  };

  // logic update position board
  // const updatePosition = async (cardId: number): Promise<void> => {
  //   const updateList = cards?.filter((card: ICard) => card.id !== id);
  //   // const deleteListPosition = cards?.filter((value: ICard) => value.id === id)[0].position;
  //   console.log(updateList);
  //   // console.log('pos: ' + deleteListPosition);
  //   if (updateList && boardId) {
  //     await Promise.all(
  //       updateList.map(async (value: ICard, index) => {
  //         await UpdatePositionCards({ idBoard: boardId, cardId: value.id, list_id: id });
  //       })
  //     );
  //     // console.log(newList);
  //     // console.log('ok');
  //     // if (deleteListPosition !== undefined) {
  //     //   const nedUpdateList = newList.slice(deleteListPosition);
  //     //   console.log(nedUpdateList)
  //     //   // if (nedUpdateList.length > 0) {
  //     //     console.log(deleteListPosition);

  //     //   // }
  //     // }
  //   }
  // };

  return (
    <div>
      <div>
        <div className="head-position">
          <div>
            <TextareaAutoSize
              ref={textareaRef}
              className="textTitleBoard"
              value={textAreaValue}
              onChange={editTitleBoard}
              onClick={onEditTitle}
              onBlur={offPointerEvents}
              onKeyDown={enterInputTitle}
              minRows={1}
              id="titleAreaText"
            />
            {isError ? (
              <div>
                <p style={{ color: 'red', fontSize: '10px', padding: 0, margin: 0 }}>ці вікно не можн бути пустим</p>
              </div>
            ) : null}
          </div>
          <div className="button-position">
            <button onClick={() => deleteBoardById(listId)}>X</button>
            <label htmlFor="titleAreaText">
              <button onClick={textAreaFocus}>Edit</button>
            </label>
          </div>
        </div>
        <div>
          <div className="list-ul">
            <ul>
              {card
                ? card.map((a) => {
                    return (
                      <div key={a.id}>
                        <Card
                          boardId={boardId}
                          props={{
                            title: a.title,
                            id: a.id,
                            listId,
                            position: a.position,
                            description: a.description,
                            custom: a.custom,
                          }}
                          setIsInputTitle={setIsInputTitle}
                          getList={getList}
                        />
                      </div>
                    );
                  })
                : null}
            </ul>
            {!isOpenModal ? (
              <button className="add-card" onClick={openModalWindows}>
                Додати карточку
              </button>
            ) : (
              <div className="ModalWindowsTitleCards">
                <ModalWindowsAdd
                  cardLength={cards ? cards.length : 0}
                  listId={listId}
                  setData={setDataCard}
                  setIsModalWindows={setIsOpenModal}
                  setIsOpenModalWindowsAddCards={setIsOpenModalWindowsAddCards}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default List;
