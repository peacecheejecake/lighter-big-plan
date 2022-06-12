import { FormEvent, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import type { Dispatch, SetStateAction } from 'react';

import { useInputChange, useRecoil } from 'hooks';
import { userState } from 'store/states/userState';
import { ArrowBackIcon } from 'assets/svgs';
import styles from './askPassword.module.scss';
import Description from '../_common/Description';

export default function AskPassword({ user, setSelectedUser }: AskPasswordProps) {
  const [password, , handleChangePassword] = useInputChange<HTMLInputElement>();
  const [, setUser] = useRecoil(userState);
  const navigate = useNavigate();

  if (!user.password) {
    setUser(user);
    navigate('..');
  }

  const handleClickBack = () => {
    setSelectedUser(null);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (password === user.password) {
      setUser(user);
      navigate('..');
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <Description title="비밀번호를 입력하세요." />
        <form action="" onSubmit={handleSubmit}>
          <input type="password" onChange={handleChangePassword} value={password} placeholder="비밀번호" />
        </form>
        <button type="button" onClick={handleClickBack} className={styles.back}>
          <ArrowBackIcon />
          <span> 뒤로</span>
        </button>
      </div>
    </div>
  );
}

interface AskPasswordProps {
  user: User;
  setSelectedUser: Dispatch<SetStateAction<null | User>>;
}
