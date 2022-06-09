import { useRecoilValue } from 'recoil';
import { CalendarIcon } from 'assets/svgs';
import { editingItemIdxState, itemListState } from 'store/atoms';
import DatePicker from 'components/_common/DatePicker';
import { CategoryButton } from './_components';
import styles from './itemOptionBar.module.scss';

export default function ItemOptionBar() {
  const editingItemIdx = useRecoilValue(editingItemIdxState);
  const itemList = useRecoilValue(itemListState);

  const { start, end } = itemList[editingItemIdx];

  const duration = `${start ? start.format('YYYY-MM-DD') : ''}${end ? ` ~ ${end.format('YYYY-MM-DD')}` : ''}`;

  return (
    <div className={styles.itemOptionBar}>
      <div className={styles.buttons}>
        <CategoryButton />
        {!duration && <DatePicker Icon={CalendarIcon} />}
      </div>
      {duration && <DatePicker title={duration} />}
    </div>
  );
}
