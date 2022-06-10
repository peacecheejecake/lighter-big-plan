import { atom } from 'recoil';
import dayjs from 'dayjs';

const dummy: Item[] = [
  {
    id: 0,
    done: false,
    title: '개인과제 제출',
    notes: '',
    createdAt: dayjs('2022-01-05'),
    updatedAt: dayjs('2022-05-27'),
    categoryId: 0,
    start: dayjs('2022-05-27'),
    end: dayjs('2022-06-05'),
  },
  {
    id: 1,
    done: false,
    title: '영화보기',
    notes: '',
    createdAt: dayjs('2022-01-05'),
    updatedAt: dayjs('2022-05-27'),
    categoryId: 0,
    start: dayjs('2022-05-27'),
    end: dayjs('2022-06-05'),
  },
];

export const itemListState = atom<Item[]>({
  key: '#itemList',
  default: dummy,
});
