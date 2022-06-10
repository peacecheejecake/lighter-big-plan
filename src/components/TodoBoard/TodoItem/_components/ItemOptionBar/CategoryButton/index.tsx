// import { useState } from 'react';
// import { useRecoilValue } from 'recoil';
import cx from 'classnames';

import type { MouseEvent } from 'react';

import { CategoryIcon } from 'assets/svgs';
import { useClickOuter } from 'hooks/useClickOuter';
// import { boundingRectState } from 'components/TodoBoard/_states/boundingRectState';
import CategoryMenu from './CategoryMenu';
import styles from './categoryButton.module.scss';

export default function CategoryButton() {
  const [isOpen, setIsOpen, continerRef] = useClickOuter<HTMLDivElement>();
  // const globalBoundingRect = useRecoilValue(boundingRectState);
  // const [expandToUp, setExpandToUp] = useState(false);

  // const toUpper = useMemo(() => {
  //   const { y, height } = globalBoundingRect as DOMRect;

  // }, [globalBoundingRect]);

  const handleClickButton = (event: MouseEvent<HTMLButtonElement>) => {
    setIsOpen((prev) => !prev);

    // if (!continerRef.current || !globalBoundingRect) return;

    // const { y: globalY, height: globalHeight } = globalBoundingRect;
    // const { y, height } = continerRef.current.getBoundingClientRect();

    // console.log(globalY + globalHeight, continerRef.current.getBoundingClientRect());

    // if (globalY + globalHeight < y + height) setExpandToUp(true);
  };

  return (
    <div ref={continerRef}>
      <button type="button" className={styles.category} onClick={handleClickButton}>
        <CategoryIcon className={cx({ [styles.iconOpen]: isOpen })} />
      </button>
      {isOpen && <CategoryMenu setIsOpen={setIsOpen} />}
    </div>
  );
}
