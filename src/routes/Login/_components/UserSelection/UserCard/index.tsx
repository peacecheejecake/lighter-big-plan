import { Dispatch, SetStateAction } from 'react';
import { useNavigate } from 'react-router-dom';
import cx from 'classnames';
import { EditIcon, PersonIcon } from 'assets/svgs';
import styles from './userCard.module.scss';

export default function UserCard({ user, setSelectedUser, editable }: UserCardProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (editable) {
      navigate(`/user-management/${user.id}`);
    } else {
      setSelectedUser(user);
    }
  };

  return (
    <div className={cx(styles.wrapper)} onClick={handleClick} role="menuitem" tabIndex={0}>
      <div className={styles.image}>
        <PersonIcon />
      </div>
      <p className={styles.name}>{user.name}</p>
      {editable && (
        <button className={styles.edit} type="button">
          <EditIcon />
        </button>
      )}
    </div>
  );
}

interface UserCardProps {
  user: User;
  setSelectedUser: Dispatch<SetStateAction<null | User>>;
  editable: boolean;
}
