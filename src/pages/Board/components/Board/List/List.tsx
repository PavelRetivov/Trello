import React, { useEffect, useState } from 'react';
import './list.scss';
import IList from '../../interfaces/IList';
import postDataCards from './PostDataCard/PostDataCards';
import ICard from '../../interfaces/ICard';
import ModalWindowsAdd from './ModalWindowsAdd/ModalWindowsAdd';
import './ModalWindowsAdd/ModalWindowsAdd.scss';
import Card from './Card/Card';

function List({ cards, id, boardId, getList, setIsOpenModalWindowsAddCards }: IList): JSX.Element {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [lastIsOpen, setLastIsOpen] = useState(false);
  const [dataCard, setDataCard] = useState<ICard | undefined>();
  const [card, setCard] = useState<ICard[]>();

  /// ///////////////////

  /* How this working?
  1. When we get cards from props, set their setCard which are responsible for displaying on the page.
  2. When we get dataCards from modalWindowsADd, start function upload cards which 
  star function postList which add new data in data base.
  3.whet data update call function getList which update data in board, and we get new cards.
  */

  useEffect(() => {
    console.log('sdsd');
  }, []);

  const postList = async (): Promise<void> => {
    if (boardId && dataCard !== undefined) {
      await postDataCards(boardId, dataCard);
    }
  };

  useEffect(() => {
    if (Array.isArray(cards)) {
      setCard(cards);
    }
  }, [cards]);
  const uploadCards = async (): Promise<void> => {
    await postList();
    getList();
  };

  useEffect(() => {
    uploadCards();
  }, [dataCard]);

  /// //////////////////////

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

  const openModalWindows = (): void => {
    setIsOpenModal(true);
    setIsOpenModalWindowsAddCards(true);
  };

  return (
    <div>
      <div>
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
                            position: a.position,
                            description: a.description,
                            custom: a.custom,
                          }}
                          getList={getList}
                        />
                      </div>
                    );
                  })
                : null}
            </ul>
            <button className="add-card" onClick={openModalWindows}>
              Додати карточку
            </button>
          </div>
        </div>
      </div>
      {isOpenModal ? (
        <div className="ModalWindowsAdd">
          <ModalWindowsAdd cardIdBoard={id} setData={setDataCard} setIsModalWindows={setIsOpenModal} />
        </div>
      ) : null}
    </div>
  );
}

export default List;
