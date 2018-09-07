export const getHasItem = (state) => {
  const selectedItem = state.selectedItem;
  return state.itemsByID[selectedItem] ? true : false;
};

export const getItem = (state) => {
  const selectedItem = state.selectedItem;
  return state.itemsByID[selectedItem] || { isFetching: true, item: {} };
};

export const getItemData = (state) => {
  return { itemData: getItem(state).item, archiveItemData: getItem(state).archiveItem };
};
