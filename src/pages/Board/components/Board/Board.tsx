import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useParams } from 'react-router-dom';
import List from './List/List';
import ICard from '../interfaces/ICard';
import './border.scss';
import getData from '../Backend/Get/Get';
import interfaceList from '../interfaces/IList';
import ModalWindowsAdd from './modalWindowsIsAdd/ModalWindowsAdd';
import Delete from '../Backend/Delete/Delete';
import putData from '../Backend/PUT/Put';
import UpdatePositionBoard from './UpdatePositionBoard/UpdatePositionBoard';
import { checkTitle } from './checkValidTitle/CheckValidTitle';

function Board(): JSX.Element {
  const { boardId } = useParams();
  const [title, setTitle] = useState('');
  const [isInputTitle, setIsInputTitle] = useState(false);
  const [list, setList] = useState<interfaceList[]>();
  const [backgroundColor, setBackgroundColor] = useState('');
  const [isOpenModalWindowsAdd, setIsOpenModalWindowsAdd] = useState(false);
  const [isOpenModalWindowsEdit, setIsOpenModalWindowsEdit] = useState(false);
  const [position, setPosition] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const [isOpenModalWindowsAddCards, setIsOpenModalWindowsAddCards] = useState(false);
  const [enterPresent, setEnterPresent] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [isError, setIsError] = useState(false);

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

      if (data) {
        switch (request) {
          case 'setList':
            if ('lists' in data && data.lists && Array.isArray(data.lists)) {
              setList(data.lists);
            }
            break;
          case 'setTitle':
            if ('title' in data && typeof data.title === 'string') {
              setTitle(data.title);
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
      if (deleteListPosition !== undefined) {
        const nedUpdateList = newList.slice(deleteListPosition);
        if (nedUpdateList.length > 0) {
          await UpdatePositionBoard({ idBoard: boardId, data: nedUpdateList });
        }
      }
    }
  };
  // delete board by id and update position board
  const deleteListById = async (idlList: number): Promise<void> => {
    if (boardId) {
      await Delete(boardId, idlList);
      await updatePosition(idlList);
      await getList('setList');
    }
  };

  // control edit by click mouse
  const offPointerEvents = async (): Promise<void> => {
    if (enterPresent) {
      setEnterPresent(false);
      return;
    }
    if (checkTitle(title)) {
      if (boardId) await putData(boardId, undefined, title);
      if (inputRef.current) inputRef.current.blur();
      setIsInputTitle(false);
      setIsError(false);
    } else {
      setIsError(true);
      setIsInputTitle(false);
      await getList('setTitle');
    }
  };

  // control edit by press enter
  const enterInputTitle = async (event: React.KeyboardEvent): Promise<void> => {
    if (event.key === 'Enter') {
      setEnterPresent(true);
      if (checkTitle(title)) {
        if (boardId) await putData(boardId, undefined, title);
        if (inputRef.current) inputRef.current.blur();
        setIsInputTitle(false);
        setIsError(false);
      } else {
        setIsError(true);
        setIsInputTitle(false);
        await getList('setTitle');
      }
    }
  };

  const changeTitle = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setTitle(event.target.value);
    setIsInputTitle(true);
  };

  const isImageUrl = (url: string): boolean => {
    return url.startsWith('url');
  };

  return (
    <div className="container">
      <Helmet>
        <title>{title} | TrelloClone</title>
      </Helmet>
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
          <div style={{ height: '75px' }}>
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
            {isError ? (
              <p style={{ color: 'red', fontSize: '10px', padding: 0, margin: 0 }}>ці вікно не можн бути пустим</p>
            ) : null}
          </div>
        </div>
        <div
          className="border"
          style={{
            backgroundImage: isImageUrl(backgroundColor) ? backgroundColor : 'none',
            backgroundColor: !isImageUrl(backgroundColor) ? backgroundColor : 'none',
            backgroundSize: '100% 100%',
          }}
        >
          {list
            ? list
                .sort((a, b) => a.position - b.position)
                .map((listData) => {
                  return (
                    <div key={listData.id}>
                      <div className="list">
                        <List
                          boardId={boardId}
                          title={listData.title}
                          cards={listData.cards as ICard[]}
                          id={listData.id}
                          position={listData.position}
                          setIsInputTitle={setIsInputTitle}
                          getList={getList}
                          setIsOpenModalWindowsAddCards={setIsOpenModalWindowsAddCards}
                          deleteBoardById={deleteListById}
                        />
                      </div>
                    </div>
                  );
                })
            : null}
          {!isOpenModalWindowsAdd ? (
            <button className="buttonAdd" onClick={openModalWindows}>
              Додати дошку
            </button>
          ) : (
            <div className="" style={{ pointerEvents: 'auto' }}>
              <ModalWindowsAdd
                idBorder={boardId || 'error'}
                setIsOpenModalWindows={setIsOpenModalWindowsAdd}
                getList={getList}
                listLength={list ? list.length : 0}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Board;
