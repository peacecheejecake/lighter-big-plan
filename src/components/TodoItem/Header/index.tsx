import { useMemo } from 'react';
import type { MouseEventHandler } from 'react';
import cx from 'classnames';
import { ArrowDropDownIcon, ArrowDropUpIcon } from 'assets/svgs';
import styles from './header.module.scss';

export default function Header({ title, dataKey, sortKey, sortDir, onClick }: HeaderProps) {
  const sortDirIcon = useMemo(() => {
    if (sortKey !== dataKey) return null;
    if (sortDir === 1) return <ArrowDropDownIcon className={styles.sortDirIcon} />;
    return <ArrowDropUpIcon className={styles.sortDirIcon} />;
  }, [sortKey, sortDir, dataKey]);

  return (
    <div
      className={cx(styles.header, styles[dataKey], {
        [styles.sortKey]: sortKey === dataKey,
      })}
      role="columnheader"
      tabIndex={-1}
      onClick={onClick}
      data-key={dataKey}
    >
      {title} {sortDirIcon}
    </div>
  );
}

interface HeaderProps {
  title: string;
  dataKey: keyof Item;
  sortKey: keyof Item | null;
  sortDir: number;
  onClick: MouseEventHandler<HTMLElement>;
}
