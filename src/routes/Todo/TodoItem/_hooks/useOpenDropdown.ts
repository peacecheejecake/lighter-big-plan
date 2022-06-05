import { useEffect, useRef, useState } from 'react';

export const useOpenDropdown = <T extends HTMLElement>() => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<T>(null);

  useEffect(() => {
    const handleClickOuterBound = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    const handleBlurWindow = () => {
      setIsOpen(false);
    };

    document.addEventListener('click', handleClickOuterBound);
    window.addEventListener('blur', handleBlurWindow);

    return () => {
      document.removeEventListener('click', handleClickOuterBound);
      window.removeEventListener('blue', handleBlurWindow);
    };
  }, []);

  const toggleIsOpen = () => {
    setIsOpen((prev) => !prev);
  };

  return { isOpen, setIsOpen, toggleIsOpen, containerRef };
};
