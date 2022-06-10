import { atom } from 'recoil';

export const editingItemIdxState = atom({
  key: '#editingItem',
  default: -1,
});
