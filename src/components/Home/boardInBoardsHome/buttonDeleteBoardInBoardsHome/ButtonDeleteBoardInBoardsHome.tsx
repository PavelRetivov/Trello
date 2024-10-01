import React from 'react';
import { useAppDispatch } from '../../../../store';
import { deleteBoardThunk } from '../../../../module/boards';

interface CustomButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  idBoard: number;
}

function ButtonDeleteBoardInBoardsHome({ idBoard }: CustomButtonProps): JSX.Element {
  const dispatch = useAppDispatch();

  const deleteBoardInBoards = (event: React.MouseEvent<HTMLButtonElement>): void => {
    event.stopPropagation();
    event.preventDefault();
    dispatch(deleteBoardThunk(idBoard));
  };

  return <button onClick={deleteBoardInBoards}>X</button>;
}

export default ButtonDeleteBoardInBoardsHome;
