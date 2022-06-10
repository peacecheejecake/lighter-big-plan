import { useState, useEffect, useRef, useCallback } from 'react';
import { useRecoilState } from 'recoil';

import TodoItem from 'components/TodoBoard/TodoItem';
import { itemListState, editingItemIdxState, selectedItemIdxState } from 'store/atoms';
import { AddIcon } from 'assets/svgs';
import { createNewItem } from './TodoItem/_services';
import styles from './todoBoard.module.scss';

export default function TodoBoard() {
  const [itemList, setItemList] = useRecoilState(itemListState);
  const [editingItemIdx, setEditingItemIdx] = useRecoilState(editingItemIdxState);
  const [selectedItemIdx, setSelectedItemIdx] = useRecoilState(selectedItemIdxState);
  const [newItemIdx, setNewItemIdx] = useState(-1);

  const ref = useRef<HTMLDivElement>(null);
  const addRef = useRef<SVGSVGElement>(null);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      switch (event.key) {
        case 'Enter':
          event.preventDefault();
          setNewItemIdx(selectedItemIdx + 1);
          break;
      }
    },
    [selectedItemIdx]
  );

  const handleClickAdd = () => {
    setNewItemIdx(selectedItemIdx + 1);
  };

  useEffect(() => {
    if (newItemIdx === -1) return;
    setItemList((prev) => [
      ...prev.slice(0, newItemIdx).map((item) => ({ ...item })),
      createNewItem(newItemIdx),
      ...prev.slice(newItemIdx).map((item) => ({ ...item, id: item.id + 1 })),
    ]);
    setSelectedItemIdx(newItemIdx);
    setEditingItemIdx(newItemIdx);
  }, [newItemIdx, setItemList, setSelectedItemIdx, setEditingItemIdx]);

  useEffect(() => {
    const handleClickBounded = (event: MouseEvent) => {
      if (!ref.current) return;

      const { target } = event;
      const { boardIdx } = (target as HTMLElement).dataset;

      if (boardIdx) {
        setSelectedItemIdx(Number(boardIdx));
      } else if ((!ref.current.contains(target as Node) || target === ref.current) && target !== addRef.current) {
        setSelectedItemIdx(-1);
        setEditingItemIdx(-1);
        setNewItemIdx(-1);
      }
    };

    document.addEventListener('click', handleClickBounded);

    return () => document.removeEventListener('click', handleClickBounded);
  }, [setSelectedItemIdx, setEditingItemIdx]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  useEffect(() => {
    setSelectedItemIdx(editingItemIdx);
  }, [editingItemIdx, setSelectedItemIdx]);

  useEffect(() => {
    if (selectedItemIdx !== editingItemIdx) {
      setEditingItemIdx(-1);
    }
  }, [selectedItemIdx, editingItemIdx, setEditingItemIdx]);

  return (
    <>
      <p className={styles.title}>
        Quick Todo
        <AddIcon className={styles.addIcon} onClick={handleClickAdd} ref={addRef} />
      </p>
      <div className={styles.todos} role="menu" tabIndex={-1} ref={ref}>
        {itemList.map((item) => (
          <TodoItem key={item.id} item={item} />
        ))}
      </div>
    </>
  );
}
