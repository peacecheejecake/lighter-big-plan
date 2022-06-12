import { allColors } from 'store/constants';

export const generateRandomColor = () => {
  const idx = Math.floor(Math.random() * allColors.length);
  return allColors[idx];
};
