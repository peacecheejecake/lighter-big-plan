import cx from 'classnames';

import { useDarkMode, useRecoil } from 'hooks';
import { userState } from 'store/states/userState';
import styles from './userDropdown.module.scss';

export default function UserDropdown() {
  const [, themeName] = useDarkMode();
  const [, setUser] = useRecoil(userState);

  const handleClickLogout = () => {
    setUser(null);
  };

  return (
    <ul className={cx(styles.wrapper, styles[themeName])}>
      <li className={styles.item}>
        <button type="button" onClick={handleClickLogout}>
          ๋ก๊ทธ์์
        </button>
      </li>
    </ul>
  );
}
