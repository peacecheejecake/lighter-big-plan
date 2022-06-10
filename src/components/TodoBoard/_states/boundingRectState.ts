import { atom } from 'recoil';

export const boundingRectState = atom<null | DOMRect>({
  key: '#boundingRectState',
  default: null,
});
