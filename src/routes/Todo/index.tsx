import { useRecoilState } from 'recoil';
import Layout from 'components/layouts';
import Card from 'components/_common/Card';
import { itemList } from 'store/atoms/itemList';
import TodoItem from 'components/TodoItem';
import styles from './todo.module.scss';

export default function Todo() {
  const [items, setItems] = useRecoilState(itemList);

  return (
    <Layout>
      <Card className={styles.quickTodo}>
        <p className={styles.title}>Quick Todo</p>
        <div className={styles.todos}>
          {items.map((item) => (
            <TodoItem key={item.id} item={item} />
          ))}
        </div>
      </Card>
    </Layout>
  );
}
