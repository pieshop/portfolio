import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from 'store/rootReducer';

const DEFAULT_ITEM_DATA = { isFetching: true, item: {}, archiveItem: null };

export const getSelectedItem = (state: RootState): string => state.selectedItem;

export const getItemsByID = (state: RootState) => state.itemsByID;

export const getHasItem = (state: RootState): boolean =>
  Boolean(getItemsByID(state)[getSelectedItem(state)]);

export const getItem = createSelector(
  [getSelectedItem, getItemsByID],
  (selectedItem, itemsByID) => itemsByID[selectedItem] ?? DEFAULT_ITEM_DATA
);

export const getItemData = createSelector(
  [getItem],
  (item) => ({ itemData: item.item, archiveItemData: item.archiveItem })
);
