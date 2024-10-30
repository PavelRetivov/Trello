export const getActiveBlockPositionOnCurrentList = (
  topBlock: boolean,
  botBlock: boolean,
  listPseudoBlock: boolean,
  cardDropPosition: number | null,
  cardDragPosition: string,
  cardsLength: number
): number | null => {
  let newPositionCard = null;

  if (topBlock && cardDropPosition) {
    newPositionCard = cardDropPosition > Number(cardDragPosition) ? cardDropPosition - 1 : cardDropPosition;
  } else if (botBlock && cardDropPosition) {
    newPositionCard = cardDropPosition > Number(cardDragPosition) ? cardDropPosition : cardDropPosition + 1;
  } else if (listPseudoBlock && cardsLength) {
    newPositionCard = cardsLength;
  }

  if (newPositionCard === Number(cardDragPosition)) {
    return null;
  }

  return newPositionCard;
};

export const getActiveBlockPositionOnAnotherList = (
  topBlock: boolean,
  botBlock: boolean,
  listPseudoBlock: boolean,
  cardDropPosition: number | null,
  cardsLength: number
): number | null => {
  if (topBlock && cardDropPosition) {
    return cardDropPosition;
  }
  if (botBlock && cardDropPosition) {
    return cardDropPosition + 1;
  }
  if (listPseudoBlock) {
    return cardsLength + 1;
  }

  return null;
};
