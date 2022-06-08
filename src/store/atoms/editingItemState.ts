import { atom } from 'recoil';

export const editingItemState = atom<null | Item>({
  key: '#editingItem',
  default: null,
});
