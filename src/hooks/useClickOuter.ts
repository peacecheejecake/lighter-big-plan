import { useEffect, useRef, useState } from 'react';

export const useClickOuter = <T extends HTMLElement>(onClose?: () => void) => {
  const containerRef = useRef<T>(null);
  const [openState, setOpenState] = useState(false);

  useEffect(() => {
    const handleOuterClick = (event: MouseEvent) => {
      if (!containerRef.current) return;

      if (!containerRef.current.contains(event.target as Node)) {
        setOpenState(false);
        if (onClose) onClose();
      }
    };

    document.addEventListener('click', handleOuterClick);

    return () => {
      document.removeEventListener('click', handleOuterClick);
    };
  }, [openState, onClose]);

  return [openState, setOpenState, containerRef] as const;
};
