import { atom } from 'recoil';

export const editingItem = atom<null | Item>({
  key: '#editingItem',
  default: null,
});
