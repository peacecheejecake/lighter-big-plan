import { Routes as RouterRoutes, Route, BrowserRouter } from 'react-router-dom';

import Layout from 'components/layouts';
import Dashboard from './Dashboard';
import Todo from './Todo';
import styles from './routes.module.scss';

export default function Routes() {
  return (
    <div className={styles.appWrapper}>
      <div className={styles.app}>
        <BrowserRouter>
          <RouterRoutes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/todo" element={<Todo />} />
          </RouterRoutes>
        </BrowserRouter>
      </div>
    </div>
  );
}
