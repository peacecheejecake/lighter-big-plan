import { useState } from 'react';
import { Link } from 'react-router-dom';
import cx from 'classnames';
import { useInputChange } from 'hooks';
import { PersonIcon } from 'assets/svgs';
import styles from './userCard.module.scss';

export default function UserCard({ user, editable }: UserCardProps) {
  const [text, setText, handleChangeText] = useInputChange(user.name);
  const [authorized, setAuthorized] = useState(!!user.password);

  return (
    <div className={cx(styles.wrapper)}>
      <div className={styles.image}>
        <PersonIcon />
      </div>
      <input type="text" className={styles.name} value={text} onChange={handleChangeText} readOnly={!editable} />
    </div>
  );
}

interface UserCardProps {
  user: User;
  editable: boolean;
}
