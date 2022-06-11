import { useReducer } from 'react';
import { useRecoilValue } from 'recoil';
import cx from 'classnames';

import { ArrowBackIcon, ArrowForwardIcon, ChecklistIcon, DashboardIcon, NoteIcon } from 'assets/svgs';
import { darkModeState } from 'store/states/themeState';
import Button from './_components/Button';
import styles from './snb.module.scss';

export default function SNB() {
  const [isOpen, toggleIsOpen] = useReducer((prev) => !prev, true);
  const darkMode = useRecoilValue(darkModeState);

  const Icon = isOpen ? ArrowBackIcon : ArrowForwardIcon;

  const openClassName = isOpen ? styles.open : styles.closed;
  const themeClassName = darkMode ? styles.darkMode : styles.lightMode;

  return (
    <nav className={cx(styles.wrapper, openClassName, themeClassName)}>
      <div className={styles.snbMenu}>
        <Button Icon={DashboardIcon} title="Dashboard" path="dashboard" />
        <Button Icon={ChecklistIcon} title="Todos" path="todos" />
        <Button Icon={NoteIcon} title="Notes" path="notes" />
      </div>
      <div className={styles.rightEdge} onClick={toggleIsOpen} role="button" tabIndex={-1}>
        <div className={styles.folder}>
          <Icon className={styles.arrowIcon} />
        </div>
      </div>
    </nav>
  );
}
