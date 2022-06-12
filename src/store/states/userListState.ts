import { atom } from 'recoil';

export const userListState = atom<User[]>({
  key: '#userListState',
  default: [
    {
      id: 0,
      name: 'Jiwon',
    },
    {
      id: 1,
      name: 'User',
      password: '123',
    },
  ],
});
