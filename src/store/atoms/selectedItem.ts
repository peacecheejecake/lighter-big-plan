import { atom } from 'recoil';

export const selectedItem = atom({
  key: '#selectedItem',
  default: -1,
});
