import type { PropsWithChildren } from 'react';

import { useRecoil } from 'hooks';
import { darkModeState } from 'store/states/themeState';
import GNB from './GNB';
import SNB from './SNB';
import styles from './layouts.module.scss';

export default function Layout({ children }: LayoutRouteProps) {
  const [darkMode] = useRecoil(darkModeState);

  return (
    <>
      <GNB />
      <div className={styles.mainWrapper}>
        <SNB />
        <main className={darkMode ? styles.darkMode : styles.lightMode}>{children}</main>
      </div>
    </>
  );
}

type LayoutRouteProps = PropsWithChildren<{}>;
