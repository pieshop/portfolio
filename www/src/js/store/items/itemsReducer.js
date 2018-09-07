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

const items = (
  state = { isFetching: false, didInvalidate: false, items: [], activeCategories: {}, years: [] },
  action
) => {
  let nextState = {};
  switch (action.type) {
    case CATEGORY_INVALIDATE:
      nextState.didInvalidate = true;
      return { ...state, ...nextState };
    case ITEMS_REQUEST:
      nextState.isFetching = true;
      nextState.didInvalidate = false;
      return { ...state, ...nextState };
    case ITEMS_RECEIVE:
      nextState.isFetching = false;
      nextState.didInvalidate = false;
      nextState.items = action.items;
      nextState.activeCategories = action.activeCategories;
      nextState.years = action.years;
      nextState.lastUpdated = action.lastUpdated;
      return { ...state, ...nextState };
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
      return { ...state, ...nextState };
    default:
      return state;
  }
};
export default reducer;
