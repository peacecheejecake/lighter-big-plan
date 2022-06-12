import styles from './login.module.scss';
import UserSelection from './_components/UserSelection';

export default function Login() {
  return (
    <div className={styles.wrapper}>
      <UserSelection />
    </div>
  );
}
