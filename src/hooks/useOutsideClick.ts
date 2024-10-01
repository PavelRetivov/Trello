import { RefObject, useEffect } from 'react';

interface useOutsideClickProps {
  inputRef: RefObject<HTMLInputElement> | RefObject<HTMLFormElement>;
  isOpen: boolean;
  setIsOpen: (focus: boolean) => void;
}

const useOutsideClick = ({ inputRef, isOpen, setIsOpen }: useOutsideClickProps): void => {
  useEffect(() => {
    const handleClick = (event: MouseEvent): void => {
      if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClick);
    } else {
      document.removeEventListener('mousedown', handleClick);
    }

    return (): void => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, [inputRef, isOpen, setIsOpen]);
};

export default useOutsideClick;
