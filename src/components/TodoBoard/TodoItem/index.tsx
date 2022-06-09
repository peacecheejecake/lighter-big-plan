import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useRecoilValue, useRecoilState, useSetRecoilState } from 'recoil';
import cx from 'classnames';
import { CheckIcon } from 'assets/svgs';
import { editingItemIdxState, itemListState, selectedItemIdxState } from 'store/atoms';
import { useClickOuter } from 'hooks/useClickOuter';
import { useInputChange } from 'hooks/useInputChange';
import ItemOptionBar from './_components/ItemOptionBar';
import styles from './todoItem.module.scss';

export default function TodoItem({ item, idx }: TodoItemProps) {
  const setItemList = useSetRecoilState(itemListState);
  const [editingItemIdx, setEditingItemIdx] = useRecoilState(editingItemIdxState);
  const [selectedItemIdx, setSelectedItemIdx] = useRecoilState(selectedItemIdxState);

  // const [isSelected, setIsSelected] = useState(false);
  const [title, , handleChangeTitle] = useInputChange<HTMLInputElement>(item.title);
  const [notes, , handleChangeNotes] = useInputChange<HTMLTextAreaElement>(item.notes);

  const titleRef = useRef<HTMLInputElement>(null);

  // const onClose = () => {
  //   setIsSelected(false);
  // };

  // const [isEditing, setIsEditing, liRef] = useClickOuter<HTMLLIElement>();

  const isEditing = editingItemIdx === idx;
  const isSelected = selectedItemIdx === idx;

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
    // setIsSelected(true);
    setSelectedItemIdx(idx);
  };

  const handleDoubleClickTitle = () => {
    // setIsEditing(true);
    // setEditingItem({ ...item });
    setEditingItemIdx(idx);
  };

  // const handleChangeTitle = (event: ChangeEvent<HTMLInputElement>) => {
  //   setTitle(event.currentTarget.value);
  // };

  // const handleChangeNotes = (event: ChangeEvent<HTMLTextAreaElement>) => {
  //   setNotes(event.currentTarget.value);
  // };

  return (
    <li
      className={cx(styles.todoItem, {
        [styles.selectedItem]: !isEditing && isSelected,
        [styles.editor]: isEditing,
      })}
      // ref={liRef}
      // data-idx={idx}
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
  // selectedId: number;
  // setSelectedId: React.Dispatch<React.SetStateAction<number>>;
  // add?: boolean;
  idx: number;
}
