const colors = {
  blue: '#4c6ef5',
  teal: '#20c997',
  red: '#fa5252',
  pink: '#f783ac',
  violet: '#7048e8',
} as const;

type Color = typeof colors[keyof typeof colors];
