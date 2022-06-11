interface DummyResponse {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

interface Item {
  id: number;
  title: string;
  notes: string;
  createdAt: Dayjs;
  updatedAt: Dayjs;
  categoryId: number;
  start?: Dayjs;
  end?: Dayjs;
  done: boolean;
}

type ItemKey = keyof Item;

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
