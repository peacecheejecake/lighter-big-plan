import { useState } from 'react';
import type { ChangeEvent } from 'react';

export const useInputChange = <T extends HTMLInputElement | HTMLTextAreaElement>(initValue: string = '') => {
  const [value, setValue] = useState(initValue);

  const handleChangeValue = (event: ChangeEvent<T>) => {
    setValue(event.currentTarget.value);
  };

  return [value, setValue, handleChangeValue] as const;
};
