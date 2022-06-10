import { Link } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import cx from 'classnames';

import logoInvert from 'assets/images/logo_invert.jpg';
import logo from 'assets/images/logo.jpg';
import { darkModeState } from 'store/states/themeState';
import { DarkModeIcon, LightModeIcon } from 'assets/svgs';
import styles from './gnb.module.scss';

export default function GNB() {
  const [darkMode, setDarkMode] = useRecoilState(darkModeState);
  const ThemeIcon = darkMode ? DarkModeIcon : LightModeIcon;
  const logoSrc = darkMode ? logoInvert : logo;

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  return (
    <header className={cx(styles.wrapper, darkMode ? styles.darkMode : styles.lightMode)}>
      <div className={styles.leftWing}>
        <Link to="/">
          <img src={logoSrc} alt="LBP logo" />
        </Link>
      </div>
      <div className={styles.rightWing}>
        <button type="button" onClick={toggleDarkMode} className={styles.themeButton}>
          <ThemeIcon className={styles.themeIcon} />
        </button>
        <p className={styles.hello}>Hi Jiwon!</p>
      </div>
    </header>
  );
}
