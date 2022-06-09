import { useEffect, useRef, useMemo } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import cx from 'classnames';
import type { ChangeEvent } from 'react';

import { CheckIcon } from 'assets/svgs';
import { editingItemIdxState, itemListState, selectedItemIdxState } from 'store/atoms';
import { useInputChange } from 'hooks/useInputChange';
import ItemOptionBar from './_components/ItemOptionBar';
import styles from './todoItem.module.scss';

export default function TodoItem({ item, idx }: TodoItemProps) {
  const [editingItemIdx, setEditingItemIdx] = useRecoilState(editingItemIdxState);
  const [selectedItemIdx, setSelectedItemIdx] = useRecoilState(selectedItemIdxState);
  const setItemList = useSetRecoilState(itemListState);

  const [title, , handleChangeTitle] = useInputChange<HTMLInputElement>(item.title);
  const [notes, , handleChangeNotes] = useInputChange<HTMLTextAreaElement>(item.notes);

  const titleRef = useRef<HTMLInputElement>(null);

  const isEditing = useMemo(() => editingItemIdx === idx, [editingItemIdx, idx]);
  const isSelected = useMemo(() => selectedItemIdx === idx, [selectedItemIdx, idx]);

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
    setSelectedItemIdx(idx);
  };

  const handleDoubleClickTitle = () => {
    setEditingItemIdx(idx);
  };

  return (
    <li
      className={cx(styles.todoItem, {
        [styles.selectedItem]: !isEditing && isSelected,
        [styles.editor]: isEditing,
      })}
    >
      <form action="" method="get" className={styles.form}>
        <input id={`checkbox-${item.id}`} type="checkbox" onChange={handleClickDone} />
        <label htmlFor={`checkbox-${item.id}`} className={styles.checkmark}>
          <CheckIcon className={styles.icon} />
        </label>
        <div className={cx(styles.detail, { [styles.open]: isEditing })}>
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
            data-idx={idx}
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
  idx: number;
}
