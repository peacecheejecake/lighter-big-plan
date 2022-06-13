import { useState } from 'react';
import type { ChangeEvent, ChangeEventHandler } from 'react';

export const useInputChange = <T extends HTMLInputElement | HTMLTextAreaElement>(
  initial?: string,
  onChange?: ChangeEventHandler<T>
) => {
  const [value, setValue] = useState(initial || '');

  const handleChangeValue = (event: ChangeEvent<T>) => {
    setValue(event.currentTarget.value);
    if (onChange) onChange(event);
  };

  return [value, setValue, handleChangeValue] as const;
};
