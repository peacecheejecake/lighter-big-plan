import { useEffect, useRef, useState, useCallback } from 'react';

export const useClickOuter = <T extends HTMLElement>(onClose?: () => void) => {
  const containerRef = useRef<T>(null);
  const [openState, setOpenState] = useState(false);

  const handleOuterClick = useCallback(
    (event: MouseEvent) => {
      if (!containerRef.current) return;

      if (openState && !containerRef.current.contains(event.target as Node)) {
        setOpenState(false);
        if (onClose) onClose();
      }
    },
    [onClose, setOpenState, openState]
  );

  useEffect(() => {
    document.addEventListener('click', handleOuterClick);

    return () => {
      document.removeEventListener('click', handleOuterClick);
    };
  }, [openState, onClose, handleOuterClick]);

  return [openState, setOpenState, containerRef] as const;
};
