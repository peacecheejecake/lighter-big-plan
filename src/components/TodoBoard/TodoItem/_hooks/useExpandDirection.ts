import { useState, useEffect, useRef } from 'react';
import { useRecoilValue } from 'recoil';

import { boundingRectState } from 'components/TodoBoard/_states/boundingRectState';

export const useExpandDirection = <T extends HTMLElement>() => {
  const [expandToUp, setExpandToUp] = useState(false);
  const containerRef = useRef<T>(null);
  const globalBoundingRect = useRecoilValue(boundingRectState);

  useEffect(() => {
    if (!containerRef.current || !globalBoundingRect) return;

    const { height: globalHeight } = globalBoundingRect;
    const { y, height } = containerRef.current.getBoundingClientRect();

    setExpandToUp(globalHeight < y + height + 30);
  }, [setExpandToUp, containerRef, globalBoundingRect]);

  return { expandToUp, containerRef };
};
