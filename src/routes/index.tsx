import { Routes as RouterRoutes, Route, BrowserRouter, Navigate } from 'react-router-dom';
import Dashboard from './Dashboard';
import Todos from './Todos';
import Notes from './Notes';
import styles from './routes.module.scss';

export default function Routes() {
  return (
    <div className={styles.appWrapper}>
      <div className={styles.app}>
        <BrowserRouter>
          <RouterRoutes>
            <Route path="todos" element={<Todos />} />
            <Route path="notes" element={<Notes />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route index element={<Navigate replace to="/todos" />} />
            <Route path="*" element={<Navigate replace to="/" />} />
          </RouterRoutes>
        </BrowserRouter>
      </div>
    </div>
  );
}
