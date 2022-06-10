import { useEffect, useState } from 'react';
import cx from 'classnames';
import dayjs from 'dayjs';

import type { KeyboardEvent, FormEvent, MouseEvent, Dispatch, SetStateAction } from 'react';
import type { Dayjs } from 'dayjs';

import { DropIcon } from 'assets/svgs';
import { toYearMonth } from 'services/date';
import { useCalendarBounds } from 'hooks/useCalendarBounds';
import { useEditingItem } from 'components/TodoBoard/_hooks/useEditingItem';
import { useExpandDirection } from 'components/TodoBoard/TodoItem/_hooks/useExpandDirection';
import styles from './calendar.module.scss';

export default function Calendar({ setIsOpen, className }: DatePickerProps) {
  const [item, setItem] = useEditingItem();

  const [value, setValue] = useState(toYearMonth((item as Item).start));
  const [selectedStart, setSelectedStart] = useState<Dayjs | null>(null);
  const [selectedEnd, setSelectedEnd] = useState<Dayjs | null>(null);
  const { firstDayInCalendar, firstDayOfCurrentMonth, setFirstDayOfCurrentMonth } = useCalendarBounds(
    (item as Item).start
  );

  const { containerRef, expandToUp } = useExpandDirection<HTMLDivElement>();

  useEffect(() => {
    setValue(toYearMonth(firstDayOfCurrentMonth));
  }, [firstDayOfCurrentMonth]);

  const handleESCKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      e.currentTarget.blur();
    }
  };

  const handleChangeTextInput = (e: FormEvent<HTMLInputElement>) => {
    let { value: inputValue } = e.currentTarget;

    if (inputValue.length > 6) {
      if (!inputValue.includes('-')) setValue(toYearMonth(firstDayOfCurrentMonth));
      else if (dayjs(inputValue).isValid()) setFirstDayOfCurrentMonth(dayjs(inputValue).set('date', 1));
      else if (dayjs(`${inputValue}-01`).isValid()) setFirstDayOfCurrentMonth(dayjs(`${inputValue}-01`));
      else setValue(toYearMonth(firstDayOfCurrentMonth));
      return;
    }

    if (!inputValue.includes('-') && inputValue.length === 4) inputValue += '-';

    setValue(inputValue);
  };

  const handleClickNextMonth = () => {
    setFirstDayOfCurrentMonth((prev) => prev.add(1, 'month'));
  };

  const handleClickPrevMonth = () => {
    setFirstDayOfCurrentMonth((prev) => prev.subtract(1, 'month'));
  };

  const handleClickDate = (e: MouseEvent<HTMLButtonElement>) => {
    const dayOnClick = firstDayInCalendar.add(Number(e.currentTarget.dataset.idx), 'day');

    if ((selectedStart === null && selectedEnd === null) || (selectedStart && selectedEnd)) {
      setSelectedStart(dayOnClick);
      setSelectedEnd(null);
    } else if (selectedStart && selectedEnd === null) {
      if (dayOnClick > selectedStart) {
        setSelectedEnd(dayOnClick);
        setItem((prev) => ({ ...prev, start: selectedStart, end: dayOnClick }));
      } else if (dayOnClick < selectedStart) {
        setSelectedEnd(selectedStart);
        setSelectedStart(dayOnClick);
        setItem((prev) => ({ ...prev, start: selectedStart, end: dayOnClick }));
      }

      setTimeout(() => {
        setIsOpen(false);
      }, 50);
    }
  };

  console.log(expandToUp);

  return (
    <div className={cx(styles.wrapper, { [styles.expandToUp]: expandToUp }, className)} ref={containerRef}>
      <div className={styles.month}>
        <button type="button" className={styles.toNextMonth} onClick={handleClickPrevMonth}>
          <DropIcon className={styles.toLeft} />
        </button>
        <input
          type="text"
          className={styles.monthText}
          value={value}
          onChange={handleChangeTextInput}
          onKeyDown={handleESCKeyPress}
        />
        <button type="button" className={styles.toNextMonth} onClick={handleClickNextMonth}>
          <DropIcon className={styles.toRight} />
        </button>
      </div>
      <div className={styles.dates}>
        {[...Array(35).keys()].map((dateOffset) => {
          const key = `date-${dateOffset}`;
          const day = firstDayInCalendar.add(dateOffset, 'day');
          return (
            <button
              type="button"
              className={cx(styles.date, {
                [styles.start]: day.isSame(selectedStart),
                [styles.tail]: day.month() !== firstDayOfCurrentMonth.month(),
                [styles.inDuration]: selectedStart && day > selectedStart && selectedEnd && day < selectedEnd,
                [styles.end]: day.isSame(selectedEnd),
              })}
              key={key}
              data-idx={dateOffset}
              onClick={handleClickDate}
            >
              {day.date()}
            </button>
          );
        })}
      </div>
    </div>
  );
}

interface DatePickerProps {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  className?: string;
}
