import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import cx from 'classnames';
import { CheckIcon } from 'assets/svgs';
import { itemList } from 'store/atoms/itemList';
import { editingItem } from 'store/atoms/editingItem';
import { useClickOuter } from 'hooks/useClickOuter';
import ItemOptionBar from './_components/ItemOptionBar';
import styles from './todoItem.module.scss';

export default function TodoItem({ item }: TodoItemProps) {
  const setItems = useSetRecoilState(itemList);
  const setEditingItem = useSetRecoilState(editingItem);

  const [isSelected, setIsSelected] = useState(false);
  const [title, setTitle] = useState(item.title);
  const [notes, setNotes] = useState(item.notes);

  const titleRef = useRef<HTMLInputElement>(null);

  const onClose = () => {
    setIsSelected(false);
  };

  const [isEditing, setIsEditing, liRef] = useClickOuter<HTMLLIElement>(onClose);

  useEffect(() => {
    if (isEditing && titleRef.current) {
      titleRef.current.focus();
      titleRef.current.setSelectionRange(-1, -1);
    }
  }, [isEditing]);

  const handleClickDone = (event: ChangeEvent<HTMLInputElement>) => {
    setItems((prev) =>
      prev.map((listItem) => {
        if (item.id === listItem.id) {
          return { ...listItem, done: event.currentTarget.checked };
        }
        return listItem;
      })
    );
  };

  const handleClickTitle = () => {
    setIsSelected(true);
  };

  const handleDoubleClickTitle = () => {
    setIsEditing(true);
    setEditingItem({ ...item });
  };

  const handleChangeTitle = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.currentTarget.value);
  };

  const handleChangeNotes = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setNotes(event.currentTarget.value);
  };

  return (
    <li
      className={cx(styles.todoItem, {
        [styles.selectedItem]: !isEditing && isSelected,
        [styles.editor]: isEditing,
      })}
      ref={liRef}
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
            ref={titleRef}
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
  // selectedId: number;
  // setSelectedId: React.Dispatch<React.SetStateAction<number>>;
  // add?: boolean;
}
