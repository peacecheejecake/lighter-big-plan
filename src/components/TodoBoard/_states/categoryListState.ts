import { atom } from 'recoil';
import { allColors } from 'store/constants';

export const categoryListState = atom<Category[]>({
  key: '#categoryList',
  default: [
    {
      id: 0,
      name: 'FE',
      color: allColors[0],
    },
    {
      id: 1,
      name: '취미',
      color: allColors[1],
    },
    {
      id: 2,
      name: '운동',
      color: allColors[2],
    },
  ],
});
