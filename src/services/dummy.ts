import axios from 'axios';
import dayjs from 'dayjs';

export const fetchDummy = async () => {
  const res = await axios.get<DummyResponse[]>('https://jsonplaceholder.typicode.com/todos');
  return res.data;
};

export const prepareDummy = async () => {
  const data = await fetchDummy();
  return data.map(({ id, title, completed: done }) => {
    const now = dayjs();
    return {
      id: id - 1,
      title,
      done,
      notes: '',
      createdAt: now,
      updatedAt: now,
      categoryId: Math.round(Math.random()),
    } as Item;
  });
};
