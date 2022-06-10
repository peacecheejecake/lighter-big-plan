import { useRecoilValue } from 'recoil';

import type { PropsWithChildren } from 'react';

import { darkModeState } from 'store/states/themeState';
import GNB from './GNB';
import SNB from './SNB';
import styles from './layouts.module.scss';

export default function Layout({ children }: LayoutRouteProps) {
  const darkMode = useRecoilValue(darkModeState);

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
