import { useEffect, useRef, useState } from 'react';

export const useClickOuter = <T extends HTMLElement>() => {
  const containerRef = useRef<T>(null);
  const [openState, setOpenState] = useState(false);

  useEffect(() => {
    const handleOuterClick = (event: MouseEvent) => {
      if (!openState || !containerRef.current) return;

      if (!containerRef.current.contains(event.target as Node)) {
        console.log(containerRef.current, event.target);
        setOpenState(false);
      }
    };

    document.addEventListener('click', handleOuterClick);

    return () => {
      document.removeEventListener('click', handleOuterClick);
    };
  }, [openState]);

  return [openState, setOpenState, containerRef] as const;
};
