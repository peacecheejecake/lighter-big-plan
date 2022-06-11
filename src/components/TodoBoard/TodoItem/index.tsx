import { useEffect, useRef, useMemo } from 'react';
import { useRecoilValue, useRecoilState, useSetRecoilState } from 'recoil';
import cx from 'classnames';

import type { ChangeEvent, KeyboardEvent } from 'react';

import { CheckIcon } from 'assets/svgs';
import { editingItemIdxState, itemListState, selectedItemIdxState } from 'components/TodoBoard/_states';
import { useInputChange } from 'hooks/useInputChange';
import { darkModeState } from 'store/states/themeState';
import ItemOptionBar from './_components/ItemOptionBar';
import styles from './todoItem.module.scss';

export default function TodoItem({ item }: TodoItemProps) {
  const [editingItemIdx, setEditingItemIdx] = useRecoilState(editingItemIdxState);
  const [selectedItemIdx, setSelectedItemIdx] = useRecoilState(selectedItemIdxState);
  const setItemList = useSetRecoilState(itemListState);
  const darkMode = useRecoilValue(darkModeState);

  const [title, setTitle, handleChangeTitle] = useInputChange<HTMLInputElement>(item.title);
  const [notes, setNotes, handleChangeNotes] = useInputChange<HTMLTextAreaElement>(item.notes);

  const titleRef = useRef<HTMLInputElement>(null);
  const checkRef = useRef<HTMLLabelElement>(null);

  const isEditing = useMemo(() => editingItemIdx === item.id, [editingItemIdx, item]);
  const isSelected = useMemo(() => selectedItemIdx === item.id, [selectedItemIdx, item]);

  useEffect(() => {
    if (!checkRef.current) return;

    if (item.done && !checkRef.current.classList.contains(styles.animatedUnset)) {
      checkRef.current.classList.add(styles.animatedUnset);
    }
  }, [item.done]);

  useEffect(() => {
    setTitle(item.title);
    setNotes(item.notes);
  }, [item.title, item.notes, setTitle, setNotes]);

  useEffect(() => {
    if (isEditing && titleRef.current) {
      titleRef.current.focus();
      titleRef.current.setSelectionRange(-1, -1);
    }
  }, [isEditing]);

  const handleClickDone = (event: ChangeEvent<HTMLInputElement>) => {
    setItemList((prev) =>
      prev.map((listItem) => {
        if (item.id === listItem.id) {
          return { ...listItem, done: event.currentTarget.checked };
        }
        return listItem;
      })
    );
  };

  const handleClickTitle = () => {
    setSelectedItemIdx(item.id);
  };

  const handleDoubleClickTitle = () => {
    setEditingItemIdx(item.id);
  };

  const handleKeydown = (event: KeyboardEvent) => {
    switch (event.key) {
      case 'Escape':
        setEditingItemIdx(-1);
        break;
      case 'Enter':
        break;
    }
  };

  const themeClassName = darkMode ? styles.darkMode : styles.lightMode;

  return (
    <li
      className={cx(styles.todoItem, themeClassName, {
        [styles.selectedItem]: !isEditing && isSelected,
        [styles.editor]: isEditing,
      })}
    >
      <form action="" method="get" className={styles.form}>
        <input id={`checkbox-${item.id}`} type="checkbox" onChange={handleClickDone} />
        <label htmlFor={`checkbox-${item.id}`} className={styles.checkmark} ref={checkRef}>
          <CheckIcon className={styles.icon} />
        </label>
        <div
          className={cx(styles.detail, { [styles.open]: isEditing })}
          onKeyDown={handleKeydown}
          role="menuitem"
          tabIndex={-1}
        >
          <input
            type="text"
            className={styles.title}
            readOnly={!isEditing}
            onClick={handleClickTitle}
            onDoubleClick={handleDoubleClickTitle}
            onChange={handleChangeTitle}
            value={title}
            placeholder="Empty Title"
            ref={titleRef}
            data-board-idx={item.id}
          />
          {isEditing && (
            <>
              <textarea className={styles.notes} placeholder="Notes" value={notes} onChange={handleChangeNotes} />
              <ItemOptionBar />
            </>
          )}
        </div>
      </form>
    </li>
  );
}

interface TodoItemProps {
  item: Item;
}
