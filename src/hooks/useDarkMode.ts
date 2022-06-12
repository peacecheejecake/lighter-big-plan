import { darkModeState } from 'store/states/themeState';
import { useRecoil } from './useRecoil';

export const useDarkMode = () => {
  const [darkMode] = useRecoil(darkModeState);
  const themeName = darkMode ? 'darkMode' : 'lightMode';
  return [darkMode, themeName] as const;
};
