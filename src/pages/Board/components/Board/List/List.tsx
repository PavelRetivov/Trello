import './list.scss';
import IList from '../../interfaces/IList';
import { useEffect, useState } from 'react';
import postDataCards from './PostDataCard/PostDataCards';
import ICard from '../../interfaces/ICard';
import ModalWindowsAdd from './ModalWindowsAdd/ModalWindowsAdd';
import './ModalWindowsAdd/ModalWindowsAdd.scss';
import Card from './Card/Card';

const List: React.FC<IList> = ({ title, cards, id, board_id, getList, setIsOpenModalWindowsAddCards }) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [lastIsOpen, setLastIsOpen] = useState(false);
  const [dataCard, setDataCard] = useState<ICard | undefined>();
  const [card, setCard] = useState<ICard[]>();

  //////////////////////

  /*How this working?
  1. When we get cards from props, set their setCard which are responsible for displaying on the page.
  2. When we get dataCards from modalWindowsADd, start function upload cards which 
  star function postList which add new data in data base.
  3.whet data update call function getList which update data in board, and we get new cards.
  */

  const postList = async () => {
    if (board_id && dataCard !== undefined) {
      const data = await postDataCards(board_id, dataCard);
    }
  };

  useEffect(() => {
    if (Array.isArray(cards)) {
      setCard(cards);
    }
  }, [cards]);

  useEffect(() => {
    uploadCards();
  }, [dataCard]);

  const uploadCards = async () => {
    await postList();
    getList();
  };
  /////////////////////////

  useEffect(() => {
    const closeModal = () => {
      if (isOpenModal && lastIsOpen) {
        setIsOpenModal(false);
        setIsOpenModalWindowsAddCards(false);
      }
    };

    document.addEventListener('click', closeModal);
    setLastIsOpen(isOpenModal);
    return () => {
      document.removeEventListener('click', closeModal);
    };
  }, [isOpenModal, lastIsOpen]);
  const openModalWindows = () => {
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
                      <div>
                        <Card
                          board_id={board_id}
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
          <ModalWindowsAdd card_id={id} setData={setDataCard} setIsModalWindows={setIsOpenModal} />
        </div>
      ) : null}
    </div>
  );
};

export default List;
