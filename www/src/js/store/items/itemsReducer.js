import * as constants from 'constants/AppConstants';

import {
  CATEGORY_INVALIDATE,
  CATEGORY_SELECT,
  FILTER_TOGGLE,
  ITEMS_RECEIVE,
  ITEMS_REQUEST,
  YEAR_SELECT,
} from 'store/items/itemsActions';

const initState = {};

export const selectedCategory = (state = constants.DEFAULT_CATEGORY, action) => {
  switch (action.type) {
    case CATEGORY_SELECT:
      return action.category;
    default:
      return state;
  }
};

export const selectedYear = (state = constants.DEFAULT_YEAR, action) => {
  switch (action.type) {
    case YEAR_SELECT:
      return action.year;
    default:
      return state;
  }
};

export const toggledFilter = (state = constants.DEFAULT_FILTER, action) => {
  switch (action.type) {
    case FILTER_TOGGLE:
      return !state;
    default:
      return state;
  }
};

const update = (state, mutations) => {
  return Object.assign({}, state, mutations);
};
const items = (
  state = { isFetching: false, didInvalidate: false, items: [], activeCategories: {}, years: [] },
  action
) => {
  let nextState = {};
  switch (action.type) {
    case CATEGORY_INVALIDATE:
      nextState.didInvalidate = true;
      return update(state, nextState);
    case ITEMS_REQUEST:
      nextState.isFetching = true;
      nextState.didInvalidate = false;
      return update(state, nextState);
    case ITEMS_RECEIVE:
      nextState.isFetching = false;
      nextState.didInvalidate = false;
      nextState.items = action.items;
      nextState.activeCategories = action.activeCategories;
      nextState.years = action.years;
      nextState.lastUpdated = action.lastUpdated;
      return update(state, nextState);
    default:
      return state;
  }
};

const reducer = (state = initState, action) => {
  let nextState = {};
  switch (action.type) {
    case CATEGORY_INVALIDATE:
    case ITEMS_RECEIVE:
    case ITEMS_REQUEST:
      nextState[action.category] = items(state[action.category], action);
      return update(state, nextState);
    default:
      return state;
  }
};
export default reducer;

/**
 * SELECTORS
 */

export const getSelectedCategory = (state) => {
  return state.selectedCategory;
};

export const getSelectedYear = (state) => {
  return state.selectedYear;
};

export const getFilteredState = (state) => {
  return state.filtered;
};

export const getSelectedState = (state) => {
  return { selectedCategory: state.selectedCategory, selectedYear: state.selectedYear };
};

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
