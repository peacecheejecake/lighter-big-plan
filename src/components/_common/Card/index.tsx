import type { PropsWithChildren } from 'react';
import cx from 'classnames';
import styles from './card.module.scss';

export default function Card({ className, children }: CardProps) {
  return <article className={cx(styles.card, className)}>{children}</article>;
}

type CardProps = PropsWithChildren<{
  className?: string;
}>;
