import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import type { Dayjs } from 'dayjs';
import { getCalendarBoundsFromDate } from 'services/date';

export const useCalendarBounds = (date: string | Dayjs) => {
  const [firstDayOfCurrentMonth, setFirstDayOfCurrentMonth] = useState(dayjs(date));
  const [firstDayInCalendar, setFirstDayInCalendar] = useState(dayjs());
  const [daysInMonth, setDaysInMonth] = useState(30);
  const [firstDayOffset, setFirstDayOffset] = useState(0);

  useEffect(() => {
    const {
      firstDayInCalendar: firstDay,
      daysInMonth: days,
      firstDayOffset: offset,
    } = getCalendarBoundsFromDate(firstDayOfCurrentMonth);
    setFirstDayInCalendar(firstDay);
    setDaysInMonth(days);
    setFirstDayOffset(offset);
  }, [firstDayOfCurrentMonth]);

  return { firstDayInCalendar, daysInMonth, firstDayOfCurrentMonth, setFirstDayOfCurrentMonth, firstDayOffset };
};
