import { useRecoilValue } from 'recoil';
import cx from 'classnames';

import { CalendarIcon } from 'assets/svgs';
import { editingItemIdxState, itemListState } from 'components/TodoBoard/_states';
import DatePicker from 'components/_common/DatePicker';
import { darkModeState } from 'store/states/themeState';
import CategoryButton from './CategoryButton';
import styles from './itemOptionBar.module.scss';

export default function ItemOptionBar() {
  const editingItemIdx = useRecoilValue(editingItemIdxState);
  const itemList = useRecoilValue(itemListState);
  const darkMode = useRecoilValue(darkModeState);

  const { start, end } = itemList[editingItemIdx];

  const duration = `${start ? start.format('YYYY-MM-DD') : ''}${end ? ` ~ ${end.format('YYYY-MM-DD')}` : ''}`;

  return (
    <div className={cx(styles.itemOptionBar, darkMode ? styles.darkMode : styles.lightMode)}>
      <div className={styles.buttons}>
        <CategoryButton />
        {!duration && <DatePicker Icon={CalendarIcon} className={styles.rightDatePicker} />}
      </div>
      {duration && <DatePicker title={duration} className={styles.leftDatePicker} />}
    </div>
  );
}
