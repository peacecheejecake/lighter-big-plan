import { useRef } from 'react';
import cx from 'classnames';

import type { KeyboardEvent, Dispatch, SetStateAction } from 'react';

import { AddIcon } from 'assets/svgs';
import { categoryListState } from 'components/TodoBoard/_states';
import { useEditingItem } from 'components/TodoBoard/_hooks/useEditingItem';
import { useInputChange, useDarkMode, useRecoil } from 'hooks';
import { useExpandDirection } from 'components/TodoBoard/_components/TodoItem/_hooks/useExpandDirection';
import ColorIndicator from './ColorIndicator';
import styles from './categoryMenu.module.scss';

export default function CategoryMenu({ setIsOpen }: CategoryMenuProps) {
  const [, themeClassName] = useDarkMode();
  const [categories, setCategories] = useRecoil(categoryListState);

  const [inputValue, setInputValue, handleInputChange] = useInputChange<HTMLInputElement>();
  const { containerRef, expandToUp } = useExpandDirection<HTMLUListElement>();
  const [, setItem] = useEditingItem();

  const inputRef = useRef<HTMLInputElement>(null);

  const handleClickItem = (event: React.MouseEvent<HTMLElement>) => {
    const { dropIdx } = event.currentTarget.dataset;
    if (dropIdx === undefined) return;

    setItem((prev) => ({ ...prev, categoryId: Number(dropIdx) }));

    setTimeout(() => {
      setIsOpen(false);
    }, 0);
  };

  const handleClickAddMenu = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!inputRef.current || event.currentTarget.contains(document.activeElement)) return;
    inputRef.current.focus();
  };

  const handleEnterKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    switch (event.key) {
      case 'Enter':
        event.preventDefault();
        addItem();
        break;
    }
  };

  const addItem = () => {
    if (!inputRef.current || !inputValue) return;

    const { value } = inputRef.current;
    const id = categories.length;
    setCategories((prev) => [...prev, { id, name: value, color: colors.blue }]);

    inputRef.current.blur();
    setInputValue('');
  };

  return (
    <ul className={cx(styles.dropMenu, styles[themeClassName], { [styles.expandToUp]: expandToUp })} ref={containerRef}>
      {categories.map(({ color, name }, idx) => {
        const key = `className-${name}-${idx}`;

        return (
          <li
            className={cx(styles.menu, {
              [styles.roundTop]: idx === 0,
            })}
            key={key}
          >
            <div
              className={styles.itemWrapper}
              data-drop-idx={idx}
              onClick={handleClickItem}
              role="menuitem"
              tabIndex={-1}
            >
              <div className={styles.item}>
                {color && <ColorIndicator color={color} />}
                <p className={styles.title}>{name}</p>
              </div>
            </div>
          </li>
        );
      })}
      <li
        className={cx(styles.menu, styles.addMenu, styles.roundBottom, {
          [styles.roundTop]: categories.length === 1,
        })}
      >
        <div className={styles.itemWrapper} role="menuitem" tabIndex={-1} onClick={handleClickAddMenu}>
          <div className={cx(styles.item, styles.addItem)}>
            <AddIcon className={styles.addIcon} onClick={addItem} />
            <input
              type="text"
              className={styles.addTitle}
              ref={inputRef}
              value={inputValue}
              onChange={handleInputChange}
              onKeyUp={handleEnterKeyPress}
              placeholder="항목 추가"
            />
          </div>
        </div>
      </li>
    </ul>
  );
}

interface CategoryMenuProps {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}
