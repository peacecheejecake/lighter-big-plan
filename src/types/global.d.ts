interface Item {
  id: number;
  title: string;
  notes: string;
  createdAt: Dayjs;
  updatedAt: Dayjs;
  categoryId: number;
  startDate?: Dayjs;
  endDate?: Dayjs;
  done: boolean;
}

interface Category {
  id: number;
  name: string;
  color: Color;
}

const colors = {
  blue: '#4c6ef5',
  teal: '#20c997',
  red: '#fa5252',
  pink: '#f783ac',
  violet: '#7048e8',
} as const;

type Color = typeof colors[keyof typeof colors];
