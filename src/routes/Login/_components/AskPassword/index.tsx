import { Dispatch, SetStateAction, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

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
    if (!user.password || password === user.password) {
      setUser(user);
      navigate('/');
    }
  }, [password, navigate, user, setUser]);

  const handleClickBack = () => {
    setSelectedUser(null);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <button type="button" onClick={handleClickBack} className={styles.back}>
          <ArrowBackIcon />
          <span> 뒤로</span>
        </button>
        <Description title="비밀번호를 입력하세요." />
        <input type="password" onChange={handleChangePassword} value={password} placeholder="비밀번호" />
      </div>
    </div>
  );
}

interface AskPasswordProps {
  user: User;
  setSelectedUser: Dispatch<SetStateAction<null | User>>;
}
