import { useCallback } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import { editingItemIdxState, itemListState } from 'store/atoms';

export const useEditingItem = () => {
  const editingItemIdx = useRecoilValue(editingItemIdxState);
  const [itemList, setItemList] = useRecoilState(itemListState);

  const item = itemList[editingItemIdx];

  const setItem = useCallback(
    (newItem: Item | ((prevItem: Item) => Item)) => {
      const mod = typeof newItem === 'function' ? newItem : () => newItem;
      setItemList((prevList) => prevList.map((listItem, idx) => (idx === editingItemIdx ? mod(listItem) : listItem)));
    },
    [editingItemIdx, setItemList]
  );

  return [item, setItem] as const;
};
