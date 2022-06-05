import { useState } from 'react';
import cx from 'classnames';
import styles from './todoItem.module.scss';

export default function TodoItem({ item }: TodoItemProps) {
  const [isSelected, setIsSelected] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  return (
    <li className={cx(styles.todoItem, { [styles.selectedItem]: isSelected })}>
      <form action="" method="get">
        <input name="checkbox" type="checkbox" className={styles.checkbox} />
        <label htmlFor="checkbox">{item.title}</label>
      </form>
    </li>
  );
}

interface TodoItemProps {
  item: Item;
}
