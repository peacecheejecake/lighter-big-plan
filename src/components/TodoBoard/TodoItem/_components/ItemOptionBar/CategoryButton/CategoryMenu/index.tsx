import { useState, useEffect, useRef } from 'react';
import { useRecoilState } from 'recoil';
import cx from 'classnames';

import type { KeyboardEvent, Dispatch, SetStateAction } from 'react';

import { AddIcon } from 'assets/svgs';
import { colors } from 'store/constants';
import { categoryListState } from 'components/TodoBoard/_states';
import { useEditingItem } from 'components/TodoBoard/_hooks/useEditingItem';
import { useInputChange } from 'hooks/useInputChange';
import { useExpandDirection } from 'components/TodoBoard/TodoItem/_hooks/useExpandDirection';
import ColorIndicator from './ColorIndicator';
import styles from './categoryMenu.module.scss';

export default function CategoryMenu({ setIsOpen }: CategoryMenuProps) {
  const [, setItem] = useEditingItem();
  const [categories, setCategories] = useRecoilState(categoryListState);

  const [topIdx, setTopIdx] = useState(0);
  const [inputValue, setInputValue, handleInputChange] = useInputChange<HTMLInputElement>();
  const inputRef = useRef<HTMLInputElement>(null);

  const { containerRef, expandToUp } = useExpandDirection<HTMLUListElement>();

  useEffect(() => {
    setItem((prev) => ({ ...prev, categoryId: topIdx }));
  }, [topIdx, setItem, setIsOpen]);

  const handleClickItem = (event: React.MouseEvent<HTMLElement>) => {
    const { dropIdx } = event.currentTarget.dataset;
    if (dropIdx === undefined) return;
    setTopIdx(Number(dropIdx));
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
    <ul className={cx(styles.dropMenu, { [styles.expandToUp]: expandToUp })} ref={containerRef}>
      {categories.map(({ color, name }, idx) => {
        const key = `className-${name}-${idx}`;

        return (
          <li
            className={cx(styles.menu, {
              [styles.roundTop]: idx === 0,
              // [styles.roundBottom]: idx === categories.length - 2,
            })}
            key={key}
          >
            <div
              className={styles.itemWrapper}
              data-drop-idx={idx >= topIdx ? idx + 1 : idx}
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
