import { useReducer, useState } from 'react';
import { CategoryIcon, CalendarIcon } from 'assets/svgs';
import DatePicker from '../DatePicker';
import CategoryMenu from '../CategoryMenu';
import styles from './itemOptionBar.module.scss';

export default function ItemOptionBar() {
  const [isCalendarOpen, toggleIsCalendarOpen] = useReducer((prev) => !prev, false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);

  const handleClickCategory = () => {
    setIsCategoryOpen(true);
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
        {isCategoryOpen && <CategoryMenu setIsOpen={setIsCategoryOpen} />}
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
