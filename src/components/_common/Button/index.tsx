import cx from 'classnames';

import type { MouseEventHandler } from 'react';
import styles from './button.module.scss';

export default function Button({ title, className, onClick, props }: ButtonProps) {
  return (
    <button className={cx(styles.button, className)} type="button" onClick={onClick} {...props}>
      {title}
    </button>
  );
}

interface ButtonProps {
  title: string;
  className?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  props: ButtonProps;
}
