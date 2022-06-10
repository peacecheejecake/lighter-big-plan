import cx from 'classnames';

import type { MouseEvent } from 'react';

import { CategoryIcon } from 'assets/svgs';
import { useClickOuter } from 'hooks/useClickOuter';
import CategoryMenu from './CategoryMenu';
import styles from './categoryButton.module.scss';

export default function CategoryButton() {
  const [isOpen, setIsOpen, continerRef] = useClickOuter<HTMLDivElement>();

  const handleClickButton = (event: MouseEvent<HTMLButtonElement>) => {
    setIsOpen((prev) => !prev);
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
