import { useRecoilState } from 'recoil';
import { CalendarIcon } from 'assets/svgs';
import { editingItemState } from 'store/atoms';
import DatePicker from 'components/_common/DatePicker';
import { CategoryButton } from './_components';
import styles from './itemOptionBar.module.scss';

export default function ItemOptionBar() {
  const [item, setItem] = useRecoilState(editingItemState);

  if (item === null) return null;

  const duration = `${item.start ? item.start.format('YYYY-MM-DD') : ''}${
    item.end ? ` ~ ${item.end.format('YYYY-MM-DD')}` : ''
  }`;

  return (
    <div className={styles.itemOptionBar}>
      {duration && <DatePicker title={duration} />}
      <div className={styles.buttons}>
        <CategoryButton />
        <DatePicker Icon={CalendarIcon} />
      </div>
    </div>
  );
}
