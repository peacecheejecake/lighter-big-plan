import { useRecoilState } from 'recoil';
import { CategoryIcon, CalendarIcon } from 'assets/svgs';
import { editingItem } from 'store/atoms/editingItem';
import { useClickOuter } from 'hooks/useClickOuter';
import DatePicker from 'components/_common/DatePicker';
import CategoryMenu from '../CategoryMenu';
import styles from './itemOptionBar.module.scss';
// import CalendarButton from './_components/CalendarButton';

export default function ItemOptionBar() {
  const [isCategoryOpen, setIsCategoryOpen, categoryRef] = useClickOuter<HTMLUListElement>();
  const [item, setItem] = useRecoilState(editingItem);

  if (item === null) return null;

  const handleClickCategory = () => {
    setIsCategoryOpen((prev) => !prev);
    console.log(isCategoryOpen);
  };

  const duration = `${item.start ? item.start.format('YYYY-MM-DD') : ''}${
    item.end ? ` ~ ${item.end.format('YYYY-MM-DD')}` : ''
  }`;

  return (
    <div className={styles.wrapper}>
      {duration && <DatePicker title={duration} />}
      <div className={styles.buttons}>
        <div className={styles.category}>
          <button type="button" className={styles.icon} onClick={handleClickCategory}>
            <CategoryIcon />
          </button>
          {isCategoryOpen && <CategoryMenu setIsOpen={setIsCategoryOpen} containerRef={categoryRef} />}
        </div>
        <DatePicker Icon={CalendarIcon} />
      </div>
    </div>
  );
}
