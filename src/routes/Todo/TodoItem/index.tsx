import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import cx from 'classnames';
import { CheckIcon } from 'assets/svgs';
import { itemList } from 'store/atoms/itemList';
import ItemOptionBar from './_components/ItemOptionBar';
import styles from './todoItem.module.scss';

export default function TodoItem({ item, selectedId, setSelectedId, add = false }: TodoItemProps) {
  const setItems = useSetRecoilState(itemList);

  const [isSelected, setIsSelected] = useState(false);
  const [isEditing, setIsEditing] = useState(add);
  const [title, setTitle] = useState(item.title);
  const [notes, setNotes] = useState(item.notes);

  const liRef = useRef<HTMLLIElement>(null);
  const titleRef = useRef<HTMLInputElement>(null);

  // const updateItem = useCallback((keys: (keyof Item)[]) => {
  //   setItems((prev) =>
  //     prev.map((listItem) => {
  //       if (item.id === listItem.id) {
  //         return { ...listItem, done: event.currentTarget.checked };
  //       }
  //       return listItem;
  //     })
  //   );
  // }, [])

  useEffect(() => {
    const handleClickOuter = (event: MouseEvent) => {
      if (!liRef.current || !event.target || liRef.current.contains(event.target as Node)) return;

      setIsSelected(false);
      setIsEditing(false);

      if (selectedId === item.id) {
        setSelectedId(-1);
      }
    };

    document.addEventListener('click', handleClickOuter);
    return () => document.removeEventListener('click', handleClickOuter);
  }, [item.id, selectedId, setSelectedId]);

  // useEffect(() => {
  //   if (!isEditing) {
  //     setItems((prev) => prev.map((listItem) => {
  //       prev.map((listItem) => {
  //         if (item.id === listItem.id) {
  //           return { ...listItem, done: event.currentTarget.checked };
  //         }
  //         return listItem;
  //       })
  //     })
  //   }
  // }, [isEditing])

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
    setSelectedId(item.id);
  };

  const handleDoubleClickTitle = () => {
    setIsEditing(true);
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
        <div className={cx(styles.detail, { [styles.open]: isEditing })} ref={titleRef}>
          <input
            type="text"
            className={styles.title}
            readOnly={!isEditing}
            onClick={handleClickTitle}
            onDoubleClick={handleDoubleClickTitle}
            onChange={handleChangeTitle}
            value={title}
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
  selectedId: number;
  setSelectedId: React.Dispatch<React.SetStateAction<number>>;
  add?: boolean;
}
