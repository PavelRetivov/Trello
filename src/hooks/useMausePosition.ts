import { useState, useEffect } from 'react';

interface MousePosition {
  mousePositionX: number;
  mousePositionY: number;
}

const useMousePosition = (): MousePosition => {
  const [position, setPosition] = useState({
    mousePositionX: 0,
    mousePositionY: 0,
  });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent): void => {
      setPosition({ mousePositionX: event.clientX, mousePositionY: event.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return (): void => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return position;
};

export default useMousePosition;
