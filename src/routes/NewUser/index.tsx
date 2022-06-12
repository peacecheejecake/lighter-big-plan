import { useNavigate } from 'react-router-dom';
import type { FormEvent, MouseEvent } from 'react';

import { useInputChange, useRecoil } from 'hooks';
import { userListState } from 'store/states/userListState';
import { ArrowBackIcon, CheckIcon } from 'assets/svgs';
import styles from './newUser.module.scss';

export default function NewUser() {
  const [name, , handleChangeName] = useInputChange<HTMLInputElement>();
  const [password, , handleChangePassword] = useInputChange<HTMLInputElement>();
  const [passwordCheck, , handleChangePasswordCheck] = useInputChange<HTMLInputElement>();

  const [, setUserList] = useRecoil(userListState);

  const navigate = useNavigate();

  const handleClickBack = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    navigate('..', { replace: true });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (password !== passwordCheck) return;

    setUserList((prev) => [...prev, { id: prev.length + 1, name, password }]);
    navigate('..', { replace: true });
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name" className={styles.nameDesc}>
            사용자 이름을 입력하세요.
            <input
              id="name"
              type="text"
              value={name}
              onChange={handleChangeName}
              className={styles.nameInput}
              autoComplete="off"
            />
          </label>
          {name && (
            <label htmlFor="password" className={styles.passwordDesc}>
              비밀번호를 입력하세요.
              <input
                id="name"
                type="password"
                value={password}
                onChange={handleChangePassword}
                className={styles.nameInput}
                placeholder="입력하지 않으면 비밀번호 없이 로그인"
              />
            </label>
          )}
          {password && (
            <label htmlFor="passwordCheck" className={styles.passwordCheckDesc}>
              비밀번호 확인을 입력하세요.
              <input
                id="name"
                type="password"
                value={passwordCheck}
                onChange={handleChangePasswordCheck}
                className={styles.nameInput}
              />
            </label>
          )}
          <div className={styles.submitButtons}>
            <button type="button" onClick={handleClickBack} className={styles.back}>
              <ArrowBackIcon />
            </button>
            <button type="submit" className={styles.submit}>
              <CheckIcon />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
