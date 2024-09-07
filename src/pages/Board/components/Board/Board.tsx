import React, { useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import List from './List/List';
import ICard from '../interfaces/ICard';
import './border.scss';
import getData from '../Backend/Get/Get';
import interfaceList from '../interfaces/IList';
import ModalWindowsAdd from './modalWindowsIsAdd/ModalWindowsAdd';
import ModalWindowEdit from './ModalWindowsEdit/ModalWindowsEdit';
import Delete from '../Backend/Delete/Delete';
import putData from '../Backend/PUT/Put';

function Board(): JSX.Element {
  const { boardId } = useParams();
  const [title, setTitle] = useState('');
  const [isInputTitle, setIsInputTitle] = useState(false);
  const [list, setList] = useState<interfaceList[]>();
  const [boardConfig, setBoardConfig] = useState<
    | {
        titleNew: string;
        boardIdNew: string;
        id: number;
      }
    | undefined
  >(undefined);

  const [isOpenModalWindowsAdd, setIsOpenModalWindowsAdd] = useState(false);
  const [isOpenModalWindowsEdit, setIsOpenModalWindowsEdit] = useState(false);
  const [position, setPosition] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const [isOpenModalWindowsAddCards, setIsOpenModalWindowsAddCards] = useState(false);

  const modalPosition = {
    width: position.width / 2 - 100,
    height: position.height / 2 - 150,
  };
  let enterPresent = false;
  const inputRef = useRef<HTMLInputElement | null>(null);

  // resize position modalWindows when change size windows
  useEffect(() => {
    const resize = (): void => {
      setPosition({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener('resize', resize);
    return (): void => {
      window.removeEventListener('resize', resize);
    };
  }, [position]);

  // take data Title and List if they have
  const getList = async (): Promise<void> => {
    const data = boardId ? await getData(boardId) : undefined;
    console.log(boardId);
    if (
      data &&
      'lists' in data &&
      data.lists &&
      Array.isArray(data.lists) &&
      'title' in data &&
      typeof data.title === 'string'
    ) {
      console.log(data);
      setList(data.lists);
      setTitle(data.title);
    }
  };

  // function for update information when update data
  useEffect(() => {
    getList();
  }, [boardId]);

  const openModalWindows = (): void => {
    setIsOpenModalWindowsAdd(true);
  };

  // controls open and close modal windows
  useEffect(() => {
    const closeModal = (): void => {
      if (isOpenModalWindowsAdd || isOpenModalWindowsEdit) {
        setIsOpenModalWindowsAdd(false);
        setIsOpenModalWindowsEdit(false);
      }
    };
    setTimeout(() => {
      document.addEventListener('click', closeModal);
    }, 100);

    return (): void => {
      document.removeEventListener('click', closeModal);
    };
  }, [isOpenModalWindowsAdd, isOpenModalWindowsEdit]);

  const openModalWindowsEdit = (titleNew: string, boardIdNew: string | undefined, id: number): void => {
    if (boardIdNew) setBoardConfig({ titleNew, boardIdNew, id });
    setIsOpenModalWindowsEdit(true);
  };

  const deleteListById = async (boarId: string | undefined, idlList: number): Promise<void> => {
    if (boarId) {
      await Delete(boarId, idlList);
      getList();
    }
  };

  /* setting title edit, when you edit title(name head board) you can edit this method enter 
  and click mouse, this is regulated two function enterInputTitle and offPointerEvents
  */

  // control edit by click mouse
  const offPointerEvents = async (): Promise<void> => {
    if (enterPresent) {
      enterPresent = false;
      return;
    }
    if (boardId) await putData(boardId, undefined, title);
    if (inputRef.current) inputRef.current.blur();
    setIsInputTitle(false);
  };

  // control edit by press enter
  const enterInputTitle = async (event: React.KeyboardEvent): Promise<void> => {
    if (event.key === 'Enter') {
      enterPresent = true;
      if (boardId) await putData(boardId, undefined, title);
      if (inputRef.current) inputRef.current.blur();
      setIsInputTitle(false);
    }
  };

  const changeTitle = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setTitle(event.target.value);
    setIsInputTitle(true);
  };

  return (
    <div className="container">
      <div
        className="styleDisplay"
        style={{
          pointerEvents:
            isOpenModalWindowsAdd || isOpenModalWindowsEdit || isInputTitle || isOpenModalWindowsAddCards
              ? 'none'
              : 'auto',
        }}
      >
        <div className="headers">
          <Link to="/">
            <button className="buttonHome">Домой</button>
          </Link>
          <div>
            <input
              className="textTitle"
              type="text"
              ref={inputRef}
              onChange={changeTitle}
              onKeyDown={enterInputTitle}
              onBlur={offPointerEvents}
              style={{ width: title.length * 37, maxWidth: window.innerWidth / 2 }}
              name=""
              id=""
              value={title}
            />
          </div>
        </div>
        <div className="border">
          {list
            ? list
                .sort((a, b) => a.position - b.position)
                .map((card) => {
                  return (
                    <div key={card.id}>
                      <div className="list">
                        <div className="head-position">
                          <h1>{card.title}</h1>
                          <div className="button-position">
                            <button onClick={() => deleteListById(boardId, card.id)}>X</button>
                            <button onClick={() => openModalWindowsEdit(card.title, boardId, card.id)}>Edit</button>
                          </div>
                        </div>
                        <List
                          boardId={boardId}
                          title={card.title}
                          cards={card.cards as ICard[]}
                          id={card.id}
                          position={card.position}
                          getList={getList}
                          setIsOpenModalWindowsAddCards={setIsOpenModalWindowsAddCards}
                        />
                      </div>
                    </div>
                  );
                })
            : null}
          <button className="buttonAdd" onClick={openModalWindows}>
            Додати дошку
          </button>
        </div>
      </div>
      {isOpenModalWindowsAdd ? (
        <div className="modalWindows" style={{ top: modalPosition.height, left: modalPosition.width }}>
          <ModalWindowsAdd
            idBorder={boardId || 'error'}
            setIsOpenModalWindows={setIsOpenModalWindowsAdd}
            getList={getList}
          />
        </div>
      ) : null}
      {isOpenModalWindowsEdit ? (
        <div className="modalWindows" style={{ top: modalPosition.height, left: modalPosition.width }}>
          <ModalWindowEdit configBoard={boardConfig} setIsOpenModalEdit={setIsOpenModalWindowsEdit} getList={getList} />
        </div>
      ) : null}
    </div>
  );
}

export default Board;
