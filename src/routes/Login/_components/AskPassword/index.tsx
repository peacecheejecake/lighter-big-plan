import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { FormEvent } from 'react';

import { useFocusOnMount, useInputChange, useRecoil } from 'hooks';
import { userState } from 'store/states/userState';
import SubmitButtons from 'components/_common/SubmitButtons';
import Description from '../_common/Description';
import styles from './askPassword.module.scss';

export default function AskPassword({ user }: AskPasswordProps) {
  const [, setUser] = useRecoil(userState);

  const [warning, setWarning] = useState('');

  const navigate = useNavigate();
  const inputRef = useFocusOnMount<HTMLInputElement>();

  const resetWarning = useCallback(() => {
    setWarning('');
  }, []);

  const [password, , handleChangePassword] = useInputChange<HTMLInputElement>('', resetWarning);

  useEffect(() => {
    if (!user.password) {
      setUser(user);
      navigate('..');
    }
  }, [user, setUser, navigate]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (password === user.password) {
      setUser(user);
      navigate('..');
    } else {
      setWarning('비밀번호가 일치하지 않습니다.');
    }
  };

  const handleFocusPassword = () => {
    setWarning('');
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <Description title="비밀번호를 입력하세요." />
        <form action="" onSubmit={handleSubmit}>
          <input
            type="password"
            onChange={handleChangePassword}
            onFocus={handleFocusPassword}
            value={password}
            placeholder="입력 후 엔터 혹은 아래 버튼을 누르세요."
            ref={inputRef}
          />
          <p className={styles.warning}>{warning}</p>
          <SubmitButtons />
        </form>
      </div>
    </div>
  );
}

interface AskPasswordProps {
  user: User;
}
