import { useState } from 'react';
import { useRecoilState } from 'recoil';
import Layout from 'components/layouts';
import Card from 'components/_common/Card';
import { itemList } from 'store/atoms/itemList';
import TodoItem from 'routes/Todo/TodoItem';
import { AddIcon } from 'assets/svgs';
import styles from './todo.module.scss';
import { createNewItem } from './TodoItem/_utils';

export default function Todo() {
  const [items, setItems] = useRecoilState(itemList);
  const [selectedId, setSelectedId] = useState(-1);

  const handleClickAdd = () => {
    const newItem = createNewItem(items.length);
    setItems((prev) => [...prev, newItem]);
  };

  return (
    <Layout>
      <Card className={styles.quickTodo}>
        <p className={styles.title}>
          Quick Todo
          <AddIcon className={styles.addIcon} onClick={handleClickAdd} />
        </p>
        <div className={styles.todos}>
          {items.map((item) => (
            <TodoItem key={item.id} item={item} selectedId={selectedId} setSelectedId={setSelectedId} />
          ))}
        </div>
      </Card>
    </Layout>
  );
}
