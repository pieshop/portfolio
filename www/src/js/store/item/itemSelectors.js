export const getSelectedItem = (state) => {
  return state.selectedItem;
};

export const getItemsByID = (state) => {
  return state.itemsByID;
};

export const getHasItem = (state) => {
  return getItemsByID(state)[getSelectedItem(state)] ? true : false;
};

export const getItem = (state) => {
  return getItemsByID(state)[getSelectedItem(state)] || { isFetching: true, item: {} };
};

export const getItemData = (state) => {
  return { itemData: getItem(state).item, archiveItemData: getItem(state).archiveItem };
};
