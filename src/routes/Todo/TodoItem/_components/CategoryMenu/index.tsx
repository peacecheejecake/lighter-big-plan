import { useState, useEffect, useRef, RefObject } from 'react';
import type { KeyboardEvent, MouseEvent, FormEvent, Dispatch, SetStateAction } from 'react';
import { useRecoilState } from 'recoil';
import cx from 'classnames';

import { AddIcon } from 'assets/svgs';
import { categoryList } from 'store/atoms/categoryList';
import { editingItem } from 'store/atoms/editingItem';
import ColorIndicator from './ColorIndicator';
import styles from './categoryMenu.module.scss';

export default function CategoryMenu({ setIsOpen, containerRef }: CategoryMenuProps) {
  const [item, setItem] = useRecoilState(editingItem);
  const [categories, setCategories] = useRecoilState(categoryList);
  const [topIdx, setTopIdx] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setItem((prev) => ({ ...(prev as Item), categoryId: topIdx }));
  }, [topIdx, setItem, setIsOpen]);

  const handleClickItem = (e: React.MouseEvent<HTMLElement>) => {
    const { idx } = e.currentTarget.dataset;
    if (idx === undefined) return;
    setTopIdx(Number(idx));
    setIsOpen(false);
  };

  const handleClickAddMenu = (e: MouseEvent<HTMLDivElement>) => {
    if (!inputRef.current || e.currentTarget.contains(document.activeElement)) return;
    inputRef.current.focus();
  };

  const handleInputChange = (e: FormEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value);
  };

  const handleEnterKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') addItem();
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
    <ul className={styles.dropMenu} ref={containerRef}>
      {[...categories.slice(0, topIdx), ...categories.slice(topIdx + 1)].map(({ color, name }, idx) => {
        const key = `className-${name}-${idx}`;
        return (
          <li
            className={cx(styles.menu, {
              [styles.roundTop]: idx === 0,
              [styles.roundBottom]: idx === categories.length - 2,
            })}
            key={key}
          >
            <div
              className={styles.itemWrapper}
              data-idx={idx >= topIdx ? idx + 1 : idx}
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

  // return (
  //   <div className={cx(styles.wrapper, className, { [styles.largerWrapper]: larger })} ref={outerRef}>
  //     <div
  //       className={cx(styles.currentItemWrapper, {
  //         [styles.highlightHover]: !isOpen,
  //       })}
  //       onClick={toggleIsOpen}
  //       role="button"
  //       tabIndex={-1}
  //     >
  //       <div className={styles.item}>
  //         {dropItemsToRender[topIdx].color && <ColorIndicator color={dropItemsToRender[topIdx].color as string} />}
  //         <p className={styles.title}>{dropItemsToRender[topIdx].title}</p>
  //       </div>
  //       <ShowMoreIcon isOpen={isOpen} className={styles.dropIcon} />
  //     </div>
  //     {isOpen && dropMenu}
  //   </div>
  // );
}

interface CategoryMenuProps {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  containerRef: RefObject<HTMLUListElement>;
}