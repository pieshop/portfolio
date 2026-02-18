import type { RootState } from 'store/rootReducer';

export const getSelectedItem = (state: RootState): string => state.selectedItem;

export const getItemsByID = (state: RootState) => state.itemsByID;

export const getHasItem = (state: RootState): boolean =>
  Boolean(getItemsByID(state)[getSelectedItem(state)]);

export const getItem = (state: RootState) =>
  getItemsByID(state)[getSelectedItem(state)] || { isFetching: true, item: {} };

export const getItemData = (state: RootState) => ({
  itemData: getItem(state).item,
  archiveItemData: getItem(state).archiveItem,
});
