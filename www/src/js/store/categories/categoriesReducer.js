import { CATEGORIES_RECEIVE, CATEGORIES_REQUEST } from 'store/categories/categoriesActions';

const initState = {
  available: [],
  activeByYear: {},
  lastUpdated: '',
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
