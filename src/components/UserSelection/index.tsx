import { useReducer } from 'react';

import { AddIcon } from 'assets/svgs';
import { useRecoil } from 'hooks';
import { userListState } from 'store/states/userListState';
import UserCard from './_components/UserSelection/UserCard';
import styles from './login.module.scss';

export default function Login() {
  const [userList] = useRecoil(userListState);
  const [editable, toggleEditable] = useReducer((prev) => !prev, false);

  return (
    <div className={styles.wrapper}>
      {/* <p className={styles.description}>사용자를 선택해주세요.</p>
      <div className={styles.users}>
        {userList.map((user) => (
          <UserCard user={user} editable={editable} key={`user-card-${user.id}`} />
        ))}
        <button className={styles.add} type="button">
          <AddIcon />
        </button>
      </div> */}
    </div>
  );
}
