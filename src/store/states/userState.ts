import { atom } from 'recoil';

export const userState = atom<null | User>({
  key: '#userState',
  default: null,
});
