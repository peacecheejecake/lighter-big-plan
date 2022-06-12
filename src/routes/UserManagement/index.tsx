import { useNavigate, useParams } from 'react-router-dom';
import { useInputChange, useRecoil } from 'hooks';
import { userListState } from 'store/states/userListState';
import { ArrowBackIcon } from 'assets/svgs';
import styles from './userManagement.module.scss';

export default function UserManagement() {
  const { userId } = useParams();
  const [userList, setUserList] = useRecoil(userListState);

  const navigate = useNavigate();

  const user = userList.find(({ id }) => id === Number(userId));

  if (!user) {
    navigate('/', { replace: true });
  }

  const [name, , handleChangeName] = useInputChange<HTMLInputElement>((user as User).name);
  const [password, , handleChangePassword] = useInputChange<HTMLInputElement>((user as User).password);
  const [passwordCheck, , handleChangePasswordCheck] = useInputChange<HTMLInputElement>((user as User).password);

  const handleClickBack = () => {
    navigate('..');
  };

  const handleSubmit = () => {
    setUserList((prev) =>
      prev.map((listUser) =>
        listUser.id === Number(userId) && password === passwordCheck ? { id: Number(userId), name, password } : listUser
      )
    );
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <button type="button" onClick={handleClickBack} className={styles.back}>
          <ArrowBackIcon />
          <span> 뒤로</span>
        </button>
        <form action="" method="POST" onSubmit={handleSubmit}>
          <div className={styles.formRow}>
            <label htmlFor="name">사용자 이름</label>
            <input id="name" type="text" onChange={handleChangeName} value={name} placeholder="사용자 이름" />
          </div>
          <div className={styles.formRow}>
            <label htmlFor="password">비밀번호</label>
            <input
              id="password"
              type="password"
              onChange={handleChangePassword}
              value={password}
              placeholder="비밀번호"
            />
          </div>
          <div className={styles.formRow}>
            <label htmlFor="passwordCheck">비밀번호 확인</label>
            <input
              id="passwordCheck"
              type="password"
              onChange={handleChangePasswordCheck}
              value={passwordCheck}
              placeholder="비밀번호"
            />
          </div>
          <button type="submit" className={styles.submit}>
            확인
          </button>
        </form>
      </div>
    </div>
  );
}
