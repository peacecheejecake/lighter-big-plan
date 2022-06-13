import { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';

import type { Dispatch, SetStateAction } from 'react';

import { useFocusOnMount, useInputChange, useRecoil } from 'hooks';
import { userState } from 'store/states/userState';
import SubmitButtons from 'components/_common/SubmitButtons';
import Description from '../_common/Description';
import styles from './askPassword.module.scss';

export default function AskPassword({ user, setSelectedUser }: AskPasswordProps) {
  const [password, , handleChangePassword] = useInputChange<HTMLInputElement>();
  const [, setUser] = useRecoil(userState);
  const navigate = useNavigate();

  const inputRef = useFocusOnMount<HTMLInputElement>();

  if (!user.password) {
    setUser(user);
    navigate('..');
  }

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
          <input
            type="password"
            onChange={handleChangePassword}
            value={password}
            placeholder="입력 후 엔터 혹은 아래 버튼을 누르세요."
            ref={inputRef}
          />
        </form>
        <SubmitButtons />
      </div>
    </div>
  );
}

interface AskPasswordProps {
  user: User;
  setSelectedUser: Dispatch<SetStateAction<null | User>>;
}
