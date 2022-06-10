import { useReducer } from 'react';
import cx from 'classnames';

import { ArrowBackIcon, ArrowForwardIcon } from 'assets/svgs';
import styles from './snb.module.scss';

export default function SNB() {
  const [isOpen, toggleIsOpen] = useReducer((prev) => !prev, true);
  const Icon = isOpen ? ArrowBackIcon : ArrowForwardIcon;

  return (
    <nav className={cx(styles.wrapper, isOpen ? styles.open : styles.closed)}>
      <div className={styles.rightEdge} onClick={toggleIsOpen} role="button" tabIndex={-1}>
        <div className={styles.folder}>
          <Icon />
        </div>
      </div>
    </nav>
  );
}
