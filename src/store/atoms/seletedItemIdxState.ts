import { atom } from 'recoil';

export const selectedItemIdxState = atom({
  key: '#selectedItemState',
  default: -1,
});
