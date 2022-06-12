import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import type { Dispatch, SetStateAction, KeyboardEvent } from 'react';

import { useInputChange, useRecoil } from 'hooks';
import { userState } from 'store/states/userState';
import { ArrowBackIcon } from 'assets/svgs';
import styles from './askPassword.module.scss';
import Description from '../_common/Description';

export default function AskPassword({ user, setSelectedUser }: AskPasswordProps) {
  const [password, , handleChangePassword] = useInputChange<HTMLInputElement>();
  const [, setUser] = useRecoil(userState);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user.password) {
      setUser(user);
      navigate('/');
    }
  }, [user, setUser, navigate]);

  const handleClickBack = () => {
    setSelectedUser(null);
  };

  const handleKeydown = (event: KeyboardEvent<HTMLInputElement>) => {
    switch (event.key) {
      case 'Enter':
        if (password === user.password) {
          setUser(user);
          navigate('/');
        }
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <Description title="비밀번호를 입력하세요." />
        <input
          type="password"
          onChange={handleChangePassword}
          onKeyDown={handleKeydown}
          value={password}
          placeholder="비밀번호"
        />
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
