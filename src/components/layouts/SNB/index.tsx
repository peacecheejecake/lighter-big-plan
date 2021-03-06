import { useReducer } from 'react';
import cx from 'classnames';

import { ArrowBackIcon, ArrowForwardIcon, ChecklistIcon, DashboardIcon, NoteIcon } from 'assets/svgs';
import { useDarkMode } from 'hooks';
import Button from './_components/Button';
import styles from './snb.module.scss';

export default function SNB() {
  const [isOpen, toggleIsOpen] = useReducer((prev) => !prev, true);
  const [, themeClassName] = useDarkMode();

  const Icon = isOpen ? ArrowBackIcon : ArrowForwardIcon;

  const openClassName = isOpen ? styles.open : styles.closed;

  return (
    <nav className={cx(styles.wrapper, openClassName, styles[themeClassName])}>
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
