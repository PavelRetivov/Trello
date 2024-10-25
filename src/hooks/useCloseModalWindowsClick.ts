import { useEffect } from 'react';

interface useCloseModalWindowsClickProps {
  isOpen: boolean;
  closeListsBoardName: (event: MouseEvent) => void;
}

const useCloseModalWindowsClick = ({ isOpen, closeListsBoardName }: useCloseModalWindowsClickProps): void => {
  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', closeListsBoardName);
    } else {
      document.removeEventListener('mousedown', closeListsBoardName);
    }
    return (): void => {
      document.removeEventListener('mousedown', closeListsBoardName);
    };
  }, [isOpen, closeListsBoardName]);
};

export default useCloseModalWindowsClick;
