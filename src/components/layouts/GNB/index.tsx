import { Link } from 'react-router-dom';
import logoInvert from 'assets/images/logo_invert.jpg';
import logo from 'assets/images/logo.jpg';
import styles from './gnb.module.scss';

export default function GNB() {
  return (
    <header className={styles.gnbWrapper}>
      <div className={styles.leftWing}>
        <Link to="/">
          <img src={logo} alt="LBP logo" />
        </Link>
      </div>
      <div className={styles.rightWing}>
        <p className={styles.hello}>Hi Jiwon!</p>
      </div>
    </header>
  );
}
