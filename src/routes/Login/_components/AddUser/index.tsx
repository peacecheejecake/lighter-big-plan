import { useInputChange } from 'hooks';
import styles from './addUser.module.scss';

export default function AddUser() {
  const [name, setName, handleChangeName] = useInputChange<HTMLInputElement>();
  const [password, setPassword, handleChangePassword] = useInputChange<HTMLInputElement>();

  return (
    <form className={styles.wrapper}>
      <label htmlFor="name">사용자 이름</label>
      <input id="name" type="text" value={name} onChange={handleChangeName} className={styles.nameInput} />
    </form>
  );
}
