import type { PropsWithChildren } from 'react';
import GNB from './GNB';
import SNB from './SNB';
import styles from './layouts.module.scss';

export default function Layout({ children }: LayoutRouteProps) {
  return (
    <>
      <GNB />
      <div className={styles.mainWrapper}>
        <SNB />
        <main>{children}</main>
      </div>
    </>
  );
}

type LayoutRouteProps = PropsWithChildren<{}>;
