import {
  CATEGORIES_RECEIVE,
  CATEGORIES_REQUEST,
  YEAR_SELECT,
  CATEGORY_SELECT,
  FILTER_TOGGLE,
} from 'store/categories/categoriesActions';
import * as constants from '../../constants/AppConstants';

const initState = {
  available: [],
  activeByYear: {},
  lastUpdated: '',
};

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

const reducer = (state = initState, action) => {
  let nextState = {};
  switch (action.type) {
    case CATEGORIES_REQUEST:
      return { ...state, ...nextState };
    case CATEGORIES_RECEIVE:
      if (action.categories) {
        nextState.activeByYear = action.activeByYear;
        nextState.available = action.categories;
        nextState.lastUpdated = action.receivedAt;
        /*
         *  Merge arrays then dedupe
        */
        // nextState.available = joinWithoutDupes(state.available, action.categories);
        return { ...state, ...nextState };
      } else {
        return state;
      }
    case YEAR_SELECT:
      nextState.available = state.available.map((o, i) => {
        const category_name = o.category_name;
        let isActive = false;
        if (action.year === 'allyears' || category_name === 'about' || category_name === 'all') {
          isActive = true;
        } else {
          isActive = state.activeByYear[category_name] === true;
        }
        return { ...o, is_active: isActive };
      });
      return { ...state, ...nextState };
    default:
      return state;
  }
};
export default reducer;

// Join Without Dupes.
const joinWithoutDupes = (A = [], B = []) => {
  const a = new Set(A.map((x) => x.category_name));
  const b = new Set(B.map((x) => x.category_name));
  return [...A.filter((x) => !b.has(x.category_name)), ...B.filter((x) => !a.has(x.category_name))];
};
