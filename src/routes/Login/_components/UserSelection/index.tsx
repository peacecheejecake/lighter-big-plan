import { useReducer, useState } from 'react';
import { Link } from 'react-router-dom';
import cx from 'classnames';

import { AddIcon, CloseIcon, EditIcon } from 'assets/svgs';
import { useRecoil } from 'hooks';
import { userListState } from 'store/states/userListState';
import Description from '../_common/Description';
import UserCard from './UserCard';
import AskPassword from '../AskPassword';
import styles from './userSelection.module.scss';

export default function UserSelection() {
  const [userList] = useRecoil(userListState);
  const [editable, toggleEditable] = useReducer((prev) => !prev, false);
  const [selectedUser, setSelectedUser] = useState<null | User>(null);

  const IconForEdit = editable ? CloseIcon : EditIcon;

  return (
    <>
      <div className={styles.wrapper}>
        <Description title={`${editable ? '수정할 ' : ''}사용자를 선택해주세요.`} />
        <div className={styles.users}>
          {userList.map((user) => (
            <UserCard user={user} setSelectedUser={setSelectedUser} editable={editable} key={`user-card-${user.id}`} />
          ))}
          <Link className={styles.add} to="/new-user">
            <AddIcon />
          </Link>
        </div>
        <button
          type="button"
          className={cx(styles.manage, { [styles.manageCancel]: editable })}
          onClick={toggleEditable}
        >
          <IconForEdit />
          <span>{editable ? '취소' : '수정하기'}</span>
        </button>
      </div>
      {selectedUser && <AskPassword user={selectedUser} setSelectedUser={setSelectedUser} />}
    </>
  );
}
