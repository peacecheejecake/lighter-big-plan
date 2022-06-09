import { useRecoilState, useResetRecoilState } from 'recoil';
import type { RecoilState } from 'recoil';

export const useRecoil = <T>(name: RecoilState<T>) => {
  const [state, setter] = useRecoilState(name);
  const resetter = useResetRecoilState(name);
  return [state, setter, resetter] as const;
};
