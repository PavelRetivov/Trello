import React, { useEffect, useRef, useState } from 'react';
import List from './List/List';
import ICard from '../interfaces/ICard';
import './border.scss';
import { Link, useParams } from 'react-router-dom';
import getData from '../Backend/Get/Get';
import interfaceList from '../interfaces/IList';
import ModalWindowsAdd from './modalWindowsIsAdd/ModalWindowsAdd';
import ModalWindowEdit from './ModalWindowsEdit/ModalWindowsEdit';
import Delete from '../Backend/Delete/Delete';
import putData from '../Backend/PUT/Put';

function Board() {
  const { board_id } = useParams();
  const [title, setTitle] = useState('');
  const [isInputTitle, setIsInputTitle] = useState(false);
  const [list, setList] = useState<interfaceList[]>();
  const [boardConfig, setBoardConfig] = useState<
    | {
        title: string;
        board_id: string;
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

  //resize position modalWindows when change size windows
  useEffect(() => {
    const resize = () => {
      setPosition({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener('resize', resize);
    return () => {
      window.removeEventListener('resize', resize);
    };
  }, [position]);

  //take data Title and List if they have
  const getList = async () => {
    const data = board_id ? await getData(board_id) : undefined;
    if (
      data &&
      'lists' in data &&
      data.lists &&
      Array.isArray(data.lists) &&
      'title' in data &&
      typeof data.title === 'string'
    ) {
      setList(data.lists);
      setTitle(data.title);
    }
  };

  //function for update information when update data
  useEffect(() => {
    getList();
  }, [board_id]);

  const openModalWindows = () => {
    setIsOpenModalWindowsAdd(true);
  };

  //controls open and close modal windows
  useEffect(() => {
    const closeModal = () => {
      if (isOpenModalWindowsAdd || isOpenModalWindowsEdit) {
        setIsOpenModalWindowsAdd(false);
        setIsOpenModalWindowsEdit(false);
      }
    };
    setTimeout(() => {
      document.addEventListener('click', closeModal);
    }, 100);

    return () => {
      document.removeEventListener('click', closeModal);
    };
  }, [isOpenModalWindowsAdd, isOpenModalWindowsEdit]);

  const openModalWindowsEdit = (title: string, board_id: string | undefined, id: number) => {
    if (board_id) setBoardConfig({ title, board_id, id });
    setIsOpenModalWindowsEdit(true);
  };

  const deleteListById = async (boar_id: string | undefined, id_list: number) => {
    if (boar_id) {
      await Delete(boar_id, id_list);
      getList();
    }
  };

  /*setting title edit, when you edit title(name head board) you can edit this method enter 
  and click mouse, this is regulated two function enterInputTitle and offPointerEvents
  */

  //control edit by click mouse
  const offPointerEvents = async () => {
    if (enterPresent) {
      enterPresent = false;
      return;
    }
    if (board_id) await putData(board_id, undefined, title);
    if (inputRef.current) inputRef.current.blur();
    setIsInputTitle(false);
  };

  //control edit by press enter
  const enterInputTitle = async (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      enterPresent = true;
      if (board_id) await putData(board_id, undefined, title);
      if (inputRef.current) inputRef.current.blur();
      setIsInputTitle(false);
    }
  };

  const changeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
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
          <Link to={'/'}>
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
                .map((card, index) => {
                  return (
                    <div>
                      <div className="list">
                        <div className="head-position">
                          <h1>{card.title}</h1>
                          <div className="button-position">
                            <button onClick={() => deleteListById(board_id, card.id)}>X</button>
                            <button onClick={() => openModalWindowsEdit(card.title, board_id, card.id)}>Edit</button>
                          </div>
                        </div>
                        <List
                          board_id={board_id}
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
            id_border={board_id ? board_id : 'error'}
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
