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
