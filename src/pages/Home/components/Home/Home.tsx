import React, { useEffect, useState } from 'react';
import Board from './Board/Board';
import './home.scss';
import IDate from '../interface/IData';
import ModalWindowsAdd from './ModalWindows/ModalWindowAdd';
import getData from '../Backend/Get/Get';
import Delete from '../Backend/Delet/Delete';
import ModalWindowEdit from './ModalWindows/ModalWindowEdit';

function Home(): JSX.Element {
  const [boards, setBoards] = useState<IDate[]>([]);
  const [modalWindowsAdd, setModalWindowsAdd] = useState(false);
  const [modalWindowsEdition, setModalWindowsEdition] = useState(false);
  const [boardId, setBoardId] = useState<number | undefined>(undefined);
  const [boardTitle, setBoardTitle] = useState<string | undefined>(undefined);
  const [boardCustom, setBoardCustom] = useState<object | undefined>(undefined);
  const [positionModal, setPositionModal] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const modalPosition = {
    width: positionModal.width / 2 - 100,
    height: positionModal.height / 2 - 150,
  };

  // resize position modalWindows when change size windows
  useEffect(() => {
    const resize = (): void => {
      setPositionModal({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener('resize', resize);
    return (): void => {
      window.removeEventListener('resize', resize);
    };
  }, [positionModal]);

  // working in dataBase and establishes set data Boards
  const getDataBoard = async (): Promise<void> => {
    const data = (await getData()) as IDate[];
    if (data) {
      setBoards(data);
    }
  };

  // start getDataBoards the first time
  useEffect(() => {
    getDataBoard();
  }, []);
  // close modal windows add
  useEffect(() => {
    const clickWindow = (): void => {
      if (modalWindowsAdd) {
        setModalWindowsAdd(false);
      }
    };
    setTimeout(() => {
      window.addEventListener('click', clickWindow);
    }, 100);
    return (): void => {
      window.removeEventListener('click', clickWindow);
    };
  }, [modalWindowsAdd]);

  // close modal windows Edition
  useEffect(() => {
    const clickWindow = (): void => {
      if (modalWindowsEdition) {
        setModalWindowsEdition(false);
      }
    };
    setTimeout(() => {
      window.addEventListener('click', clickWindow);
    }, 100);
    return (): void => {
      window.removeEventListener('click', clickWindow);
    };
  }, [modalWindowsEdition]);

  // open modal windows add
  const OnModal = (): void => {
    setModalWindowsAdd(true);
  };

  // Delete board by id
  const DeleteClick = async (id: number): Promise<void> => {
    setBoards(boards.filter((board) => board.id !== id));
    await Delete(id);
  };

  // open modal windows Edition
  const EditClick = async (id: number, title: string, custom: object): Promise<void> => {
    setBoardId(id);
    setBoardTitle(title);
    setBoardCustom(custom);
    setModalWindowsEdition(true);
  };

  return (
    <div>
      <div style={{ pointerEvents: modalWindowsAdd || modalWindowsEdition ? 'none' : 'auto' }} className="home">
        <div className="text-head">Мої Доски</div>
        <div className="home-Boards">
          {boards.map((board) => {
            return (
              <div className="board" key={board.id}>
                <Board board={board} />
                <div className="edit">
                  <button onClick={() => EditClick(board.id, board.title, board.custom)}>Edit</button>
                </div>
                <div className="delete" onClick={() => DeleteClick(board.id)}>
                  <button>X</button>
                </div>
              </div>
            );
          })}
          <button className="home-button-add" onClick={OnModal}>
            + Створити дошку
          </button>
        </div>
      </div>
      {modalWindowsAdd ? (
        <div className="modal-fon">
          <div className="modal-window" style={{ top: modalPosition.height, left: modalPosition.width }}>
            <ModalWindowsAdd fetchData={getDataBoard} setModalWindowsAdd={setModalWindowsAdd} />
          </div>
        </div>
      ) : null}
      {modalWindowsEdition ? (
        <div className="modal-fon">
          <div className="modal-window" style={{ top: modalPosition.height, left: modalPosition.width }}>
            <ModalWindowEdit
              id={boardId}
              updateData={getDataBoard}
              titleProps={boardTitle}
              customProps={boardCustom}
              setModalWindowsEdition={setModalWindowsEdition}
            />
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default Home;
