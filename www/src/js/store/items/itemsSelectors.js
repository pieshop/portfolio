import * as constants from '../../constants/AppConstants';

export const getHasCategoryItems = (state) => {
  const selectedCategory = state.selectedCategory;
  return state.itemsByCategory[selectedCategory] ? true : false;
};

export const getIsFetching = (state) => {
  const selectedCategory = state.selectedCategory;
  if (selectedCategory === constants.CATEGORY_ABOUT) {
    return false;
  } else {
    return state.itemsByCategory[selectedCategory]
      ? state.itemsByCategory[selectedCategory].isFetching
      : true;
  }
};

export const getItemsByCategory = (state) => {
  const selectedCategory = state.selectedCategory;
  // console.log('getItemsByCategory', selectedCategory, state.itemsByCategory);
  return (
    state.itemsByCategory[selectedCategory] || {
      isFetching: true,
      items: [],
      years: [],
      activeCategories: {},
    }
  );
};

/**
 * Gets category items and then filters on selectedYear and filtered
 */
export const getItemsByYear = (state) => {
  let selectedYear = state.selectedYear;
  let filtered = state.filtered;
  // console.log('getItemsByYear', selectedYear, filtered);
  const itemsByCategory = getItemsByCategory(state).items;
  if (selectedYear === constants.ALL_YEARS) {
    return itemsByCategory.filter((item) => {
      return filtered ? item.is_featured : true;
    });
  } else {
    selectedYear = parseInt(state.selectedYear);
    return itemsByCategory.filter((item) => {
      return filtered ? item.is_featured && item.year === selectedYear : item.year === selectedYear;
    });
  }
};

export const getYears = (state) => {
  return getItemsByCategory(state).years;
};

export const getItems = (state) => {
  return getItemsByYear(state);
};
