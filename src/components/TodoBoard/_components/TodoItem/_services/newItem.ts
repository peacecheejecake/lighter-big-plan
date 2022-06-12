import dayjs from 'dayjs';

export const createNewItem = (id: number): Item => {
  return {
    id,
    done: false,
    title: '',
    notes: '',
    createdAt: dayjs(),
    updatedAt: dayjs(),
    categoryId: -1,
  };
};
