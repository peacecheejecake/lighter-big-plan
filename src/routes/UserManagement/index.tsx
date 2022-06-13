import { useNavigate, useParams } from 'react-router-dom';
import type { FormEvent } from 'react';

import { useInputChange, useRecoil, useFocusOnMount } from 'hooks';
import { userListState } from 'store/states/userListState';
import SubmitButtons from 'components/_common/SubmitButtons';
import Description from 'routes/Login/_components/_common/Description';
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

  const inputRef = useFocusOnMount<HTMLInputElement>();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setUserList((prev) =>
      prev.map((listUser) =>
        listUser.id === Number(userId) && password === passwordCheck ? { id: Number(userId), name, password } : listUser
      )
    );
    navigate('..');
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <Description title="사용자 정보 수정" />
        <form action="" onSubmit={handleSubmit}>
          {/* <fieldset className={styles.formRow}> */}
          <label htmlFor="name">
            사용자 이름
            <input
              id="name"
              type="text"
              onChange={handleChangeName}
              value={name}
              placeholder="사용자 이름"
              ref={inputRef}
            />
          </label>
          {/* </fieldset> */}
          {/* <fieldset className={styles.formRow}> */}
          <label htmlFor="password">
            비밀번호
            <input
              id="password"
              type="password"
              onChange={handleChangePassword}
              value={password}
              placeholder="비밀번호"
            />
          </label>
          {/* </fieldset> */}
          {/* <fieldset className={styles.formRow}> */}
          <label htmlFor="passwordCheck">
            비밀번호 확인
            <input
              id="passwordCheck"
              type="password"
              onChange={handleChangePasswordCheck}
              value={passwordCheck}
              placeholder="비밀번호 확인"
            />
          </label>
          {/* </fieldset> */}
          <SubmitButtons />
        </form>
      </div>
    </div>
  );
}
