import { atom } from 'recoil';
import { colors } from 'store/constants';

const dummy: Category[] = [
  {
    id: 0,
    name: 'FE',
    color: colors.blue,
  },
  {
    id: 1,
    name: '취미',
    color: colors.teal,
  },
  {
    id: 2,
    name: '운동',
    color: colors.red,
  },
];

export const categoryList = atom<Category[]>({
  key: '#categoryList',
  default: dummy,
});
