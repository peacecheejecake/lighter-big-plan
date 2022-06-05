import { useReducer, useState } from 'react';
import { useSetRecoilState } from 'recoil';

import { itemList } from 'store/atoms/itemList';
import { CategoryIcon, CalendarIcon } from 'assets/svgs';
import DatePicker from '../DatePicker';
import CategoryMenu from '../CategoryMenu';
import { useOpenDropdown } from '../../_hooks/useOpenDropdown';
import styles from './itemOptionBar.module.scss';

export default function ItemOptionBar() {
  const setItems = useSetRecoilState(itemList);
  const [isCalendarOpen, toggleIsCalendarOpen] = useReducer((prev) => !prev, false);
  const {
    isOpen: isCategoryOpen,
    setIsOpen: setIsCategoryOpen,
    toggleIsOpen: toggleIsCategoryOpen,
    containerRef,
  } = useOpenDropdown<HTMLUListElement>();

  const handleClickCategory = () => {
    toggleIsCategoryOpen();
  };

  const handleClickCalendarButton = () => {
    toggleIsCalendarOpen();
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.category}>
        <button type="button" className={styles.icon} onClick={handleClickCategory}>
          <CategoryIcon />
        </button>
        {isCategoryOpen && <CategoryMenu setIsOpen={setIsCategoryOpen} containerRef={containerRef} />}
      </div>
      <div className={styles.calendar}>
        <button type="button" className={styles.icon} onClick={handleClickCalendarButton}>
          <CalendarIcon />
        </button>
        {isCalendarOpen && <DatePicker />}
      </div>
    </div>
  );
}
