import { useEffect, useRef } from 'react';
import { useRecoilState } from 'recoil';

import TodoItem from 'components/TodoBoard/TodoItem';
import { itemListState, editingItemIdxState, selectedItemIdxState } from 'store/atoms';
import { AddIcon } from 'assets/svgs';
import { createNewItem } from './TodoItem/_utils';
import styles from './todoBoard.module.scss';

export default function TodoBoard() {
  const [itemList, setItemList] = useRecoilState(itemListState);
  const [editingItemIdx, setEditingItemIdx] = useRecoilState(editingItemIdxState);
  const [selectedItemIdx, setSelectedItemIdx] = useRecoilState(selectedItemIdxState);
  const ref = useRef<HTMLDivElement>(null);

  const handleClickAdd = () => {
    const newItem = createNewItem(itemList.length);
    setItemList((prev) => [...prev, newItem]);
  };

  useEffect(() => {
    const handleClickBounded = (event: MouseEvent) => {
      if (!ref.current) return;
      const { idx } = (event.target as HTMLElement).dataset;

      if (idx) {
        setSelectedItemIdx(Number(idx));
      } else if (!ref.current.contains(event.target as Node | null) || ref.current === event.target) {
        setSelectedItemIdx(-1);
        setEditingItemIdx(-1);
      }
      setSelectedItemIdx(idx ? Number(idx) : -1);
    };

    document.addEventListener('click', handleClickBounded);
    return () => document.removeEventListener('click', handleClickBounded);
  }, [setSelectedItemIdx, setEditingItemIdx]);

  useEffect(() => {
    setSelectedItemIdx(editingItemIdx);
  }, [editingItemIdx, setSelectedItemIdx]);

  return (
    <>
      <p className={styles.title}>
        Quick Todo
        <AddIcon className={styles.addIcon} onClick={handleClickAdd} />
      </p>
      <div className={styles.todos} role="menuitem" tabIndex={-1} ref={ref}>
        {itemList.map((item, idx) => (
          <TodoItem key={item.id} item={item} idx={idx} />
        ))}
      </div>
    </>
  );
}
