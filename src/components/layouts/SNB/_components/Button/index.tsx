import { useLocation, Link } from 'react-router-dom';
import cx from 'classnames';

import type { FunctionComponent, SVGProps } from 'react';
import styles from './button.module.scss';

export default function Button({ Icon, title, path }: ButtonProps) {
  const location = useLocation();
  const isCurrent = location.pathname.substring(1) === path;

  return (
    <button type="button" className={cx(styles.button, { [styles.current]: isCurrent })}>
      <Link to={`/${path}`} className={styles.inner}>
        <Icon className={styles.icon} />
        <span className={styles.title}>{title}</span>
      </Link>
    </button>
  );
}

interface ButtonProps {
  Icon: FunctionComponent<SVGProps<SVGSVGElement>>;
  title: string;
  path: string;
}
