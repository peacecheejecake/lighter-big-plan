import { useState, useEffect, useRef, useCallback } from 'react';
import { useRecoilValue, useRecoilState, useSetRecoilState } from 'recoil';
import cx from 'classnames';

import TodoItem from 'components/TodoBoard/_components/TodoItem';
import { itemListState, editingItemIdxState, selectedItemIdxState } from 'components/TodoBoard/_states';
import { darkModeState } from 'store/states/themeState';
import { AddIcon } from 'assets/svgs';
import { createNewItem } from './_components/TodoItem/_services';
import styles from './todoBoard.module.scss';
import { boundingRectState } from './_states/boundingRectState';

export default function TodoBoard() {
  const [itemList, setItemList] = useRecoilState(itemListState);
  const [editingItemIdx, setEditingItemIdx] = useRecoilState(editingItemIdxState);
  const [selectedItemIdx, setSelectedItemIdx] = useRecoilState(selectedItemIdxState);
  const setBoundingRect = useSetRecoilState(boundingRectState);
  const darkMode = useRecoilValue(darkModeState);

  const [newItemIdx, setNewItemIdx] = useState(-1);

  const ref = useRef<HTMLDivElement>(null);
  const addRef = useRef<SVGSVGElement>(null);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      switch (event.key) {
        case 'Enter':
          if ((event.target as HTMLElement).tagName === 'TEXTAREA') {
            break;
          }

          setNewItemIdx(selectedItemIdx + 1);
          event.preventDefault();
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

  useEffect(() => {
    if (!ref.current) return;
    setBoundingRect(ref.current.getBoundingClientRect());
  }, [ref, setBoundingRect, itemList]);

  return (
    <article className={cx(styles.card, darkMode ? styles.darkMode : styles.lightMode)}>
      <p className={styles.title}>
        Quick Todo
        <AddIcon className={styles.addIcon} onClick={handleClickAdd} ref={addRef} />
      </p>
      <div className={styles.todos} role="menu" tabIndex={-1} ref={ref}>
        {itemList.map((item) => (
          <TodoItem key={item.id} item={item} />
        ))}
      </div>
    </article>
  );
}
