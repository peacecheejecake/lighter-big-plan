import { useCallback } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import { editingItemIdxState, itemListState } from '../_states';

export const useEditingItem = () => {
  const editingItemIdx = useRecoilValue(editingItemIdxState);
  const [itemList, setItemList] = useRecoilState(itemListState);

  const item = itemList[editingItemIdx];

  const setItem = useCallback(
    (newItem: Item | ((prevItem: Item) => Item)) => {
      const mod = typeof newItem === 'function' ? newItem : () => newItem;

      setTimeout(() => {
        setItemList((prevList) => prevList.map((listItem, idx) => (idx === editingItemIdx ? mod(listItem) : listItem)));
      }, 0);
    },
    [editingItemIdx, setItemList]
  );

  return [item, setItem] as const;
};
