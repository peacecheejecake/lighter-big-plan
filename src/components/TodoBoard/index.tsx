import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { itemList } from 'store/atoms/itemList';
import TodoItem from 'components/TodoBoard/TodoItem';
import { AddIcon } from 'assets/svgs';
import { createNewItem } from './TodoItem/_utils';
import styles from './todoBoard.module.scss';

export default function TodoBoard() {
  const [items, setItems] = useRecoilState(itemList);
  const [selectedId, setSelectedId] = useState(-1);

  const handleClickAdd = () => {
    const newItem = createNewItem(items.length);
    setItems((prev) => [...prev, newItem]);
  };

  return (
    <>
      <p className={styles.title}>
        Quick Todo
        <AddIcon className={styles.addIcon} onClick={handleClickAdd} />
      </p>
      <div className={styles.todos}>
        {items.map((item) => (
          <TodoItem key={item.id} item={item} />
        ))}
      </div>
    </>
  );
}
