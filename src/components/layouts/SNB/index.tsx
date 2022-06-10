import { useReducer } from 'react';
import { useRecoilValue } from 'recoil';
import cx from 'classnames';

import { ArrowBackIcon, ArrowForwardIcon } from 'assets/svgs';
import { darkModeState } from 'store/states/themeState';
import styles from './snb.module.scss';

export default function SNB() {
  const [isOpen, toggleIsOpen] = useReducer((prev) => !prev, true);
  const darkMode = useRecoilValue(darkModeState);

  const Icon = isOpen ? ArrowBackIcon : ArrowForwardIcon;

  const openClassName = isOpen ? styles.open : styles.closed;
  const themeClassName = darkMode ? styles.darkMode : styles.lightMode;

  return (
    <nav className={cx(styles.wrapper, openClassName, themeClassName)}>
      <div className={styles.rightEdge} onClick={toggleIsOpen} role="button" tabIndex={-1}>
        <div className={styles.folder}>
          <Icon />
        </div>
      </div>
    </nav>
  );
}
