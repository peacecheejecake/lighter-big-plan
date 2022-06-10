import { useRecoilValue } from 'recoil';
import cx from 'classnames';

import type { MouseEvent } from 'react';

import { CategoryIcon } from 'assets/svgs';
import { useClickOuter } from 'hooks/useClickOuter';
import { darkModeState } from 'store/states/themeState';
import CategoryMenu from './CategoryMenu';
import styles from './categoryButton.module.scss';

export default function CategoryButton() {
  const darkMode = useRecoilValue(darkModeState);
  const [isOpen, setIsOpen, continerRef] = useClickOuter<HTMLDivElement>();

  const handleClickButton = (event: MouseEvent<HTMLButtonElement>) => {
    setIsOpen((prev) => !prev);
  };

  const themeClassName = darkMode ? styles.darkMode : styles.lightMode;

  return (
    <div ref={continerRef} className={themeClassName}>
      <button type="button" className={styles.category} onClick={handleClickButton}>
        <CategoryIcon className={cx({ [styles.iconOpen]: isOpen })} />
      </button>
      {isOpen && <CategoryMenu setIsOpen={setIsOpen} />}
    </div>
  );
}
