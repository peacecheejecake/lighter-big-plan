import { Routes as RouterRoutes, Route, BrowserRouter } from 'react-router-dom';
import Dashboard from './Dashboard';
import Todo from './Todo';
import styles from './routes.module.scss';

export default function Routes() {
  return (
    <div className={styles.appWrapper}>
      <div className={styles.app}>
        <BrowserRouter>
          <RouterRoutes>
            <Route path="/" element={<Todo />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </RouterRoutes>
        </BrowserRouter>
      </div>
    </div>
  );
}