import React, { useCallback, useEffect, useRef, useState } from 'react';
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
import UpdatePositionBoard from './UpdatePositionBoard';

function Board(): JSX.Element {
  const { boardId } = useParams();
  const [title, setTitle] = useState('');
  const [isInputTitle, setIsInputTitle] = useState(false);
  const [list, setList] = useState<interfaceList[]>();
  const [backgroundColor, setBackgroundColor] = useState('');
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
  const getList = useCallback(
    async (request: string): Promise<void> => {
      const data = boardId ? await getData(boardId) : undefined;
      console.log(`request: ${request}`);
      if (data) {
        switch (request) {
          case 'setList':
            if ('lists' in data && data.lists && Array.isArray(data.lists)) {
              setList(data.lists);
              console.log(data.lists);
              console.log('setList');
            }
            break;
          case 'setTitle':
            if ('title' in data && typeof data.title === 'string') {
              setTitle(data.title);
              console.log('setTitle');
            }
            break;
          case 'onlyData':
            if (
              'lists' in data &&
              data.lists &&
              Array.isArray(data.lists) &&
              'title' in data &&
              typeof data.title === 'string' &&
              'custom' in data &&
              typeof data.custom === 'object' &&
              data.custom &&
              'background' in data.custom &&
              typeof data.custom.background === 'string'
            ) {
              setList(data.lists);
              setTitle(data.title);
              setBackgroundColor(data.custom.background);
              console.log(data.lists);
            }
            break;
          default:
            console.log('Error 404');
        }
      }
    },
    [boardId]
  );

  // function for update information when update data
  useEffect(() => {
    console.log('start');
    getList('onlyData');
  }, [getList]);

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

  // logic update position board
  const updatePosition = async (id: number): Promise<void> => {
    const updateList = list?.filter((value) => value.id !== id);
    const deleteListPosition = list?.filter((value) => value.id === id)[0].position;

    if (updateList && boardId) {
      const newList = await Promise.all(
        updateList.map(async (value, index) => ({
          id: value.id,
          position: index,
        }))
      );
      console.log('ok');
      if (deleteListPosition !== undefined) {
        const nedUpdateList = newList.slice(deleteListPosition);
        if (nedUpdateList.length > 0) {
          await UpdatePositionBoard({ idBoard: boardId, data: nedUpdateList });
        }
      }
    }
  };
  // delete board by id and update position board
  const deleteListById = async (boarId: string | undefined, idlList: number): Promise<void> => {
    if (boarId) {
      await Delete(boarId, idlList);
      await updatePosition(idlList);
      await getList('setList');
    }
  };

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
        <div className="border" style={{ background: backgroundColor }}>
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
        <div className="modalWindowsBoardList" style={{ top: modalPosition.height, left: modalPosition.width }}>
          <ModalWindowsAdd
            idBorder={boardId || 'error'}
            setIsOpenModalWindows={setIsOpenModalWindowsAdd}
            getList={getList}
            listLength={list ? list.length : 0}
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
