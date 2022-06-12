import { useReducer } from 'react';
import { Link } from 'react-router-dom';
import cx from 'classnames';

import { useRecoil } from 'hooks';
import { darkModeState } from 'store/states/themeState';
import { userState } from 'store/states/userState';
import logoInvert from 'assets/images/logo_invert.png';
import logo from 'assets/images/logo.png';
import { DarkModeIcon, LightModeIcon } from 'assets/svgs';
import styles from './gnb.module.scss';
import UserDropdown from './_components/UserDropdown';

export default function GNB() {
  const [darkMode, setDarkMode] = useRecoil(darkModeState);
  const [user] = useRecoil(userState);
  const [isUserOpen, toggleIsUserOpen] = useReducer((prev) => !prev, false);

  const ThemeIcon = darkMode ? DarkModeIcon : LightModeIcon;
  const logoSrc = darkMode ? logoInvert : logo;

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  return (
    <header className={cx(styles.wrapper, darkMode ? styles.darkMode : styles.lightMode)}>
      <div className={styles.leftWing}>
        <Link to="/" className={styles.logo}>
          <img src={logoSrc} alt="LBP logo" />
        </Link>
      </div>
      <div className={styles.rightWing}>
        <button type="button" onClick={toggleDarkMode} className={styles.themeButton}>
          <ThemeIcon className={styles.themeIcon} />
        </button>
        <div className={styles.user}>
          <button type="button" className={styles.username} onClick={toggleIsUserOpen}>
            {(user as User).name}
          </button>
          {isUserOpen && <UserDropdown />}
        </div>
      </div>
    </header>
  );
}
