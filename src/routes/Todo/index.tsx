import Layout from 'components/layouts';
import TodoBoard from 'components/TodoBoard';
// import Card from 'components/_common/Card';
// import styles from './todo.module.scss';

export default function Todo() {
  return (
    <Layout>
      {/* <Card className={styles.quickTodo}> */}
      <TodoBoard />
      {/* </Card> */}
    </Layout>
  );
}
