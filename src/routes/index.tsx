import { Routes as RouterRoutes, Route, Navigate } from 'react-router-dom';
import { useEffect } from 'react';

import { useRecoil } from 'hooks';
import { itemListState } from 'components/TodoBoard/_states';
import { prepareDummy } from 'services/dummy';
import Login from 'routes/Login';
import { userState } from 'store/states/userState';
import Dashboard from './Dashboard';
import Todos from './Todos';
import Notes from './Notes';
import styles from './routes.module.scss';

export default function Routes() {
  const [, setItemList] = useRecoil(itemListState);
  const [user] = useRecoil(userState);

  useEffect(() => {
    prepareDummy().then((data) => {
      setItemList(data);
    });
  }, [setItemList]);

  const routes = user ? (
    <>
      <Route index element={<Navigate replace to="/todos" />} />
      <Route path="login" element={<Login />} />
      <Route path="todos" element={<Todos />} />
      <Route path="notes" element={<Notes />} />
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="*" element={<Navigate replace to="/" />} />
    </>
  ) : (
    <>
      <Route path="login" element={<Login />} />
      <Route path="*" element={<Navigate replace to="/login" />} />
    </>
  );

  return (
    <div className={styles.appWrapper}>
      <div className={styles.app}>
        <RouterRoutes>{routes}</RouterRoutes>
      </div>
    </div>
  );
}
