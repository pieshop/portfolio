import { CATEGORIES_RECEIVE, CATEGORIES_REQUEST } from 'store/categories/categoriesActions';

const initState = {
  available: [
    {
      category_id: 1,
      category_name: 'about',
      category_label: 'About',
      category_description: 'All my portfolio items (uncategorised).',
      to: '/about',
      is_active: true,
    },
    {
      category_id: 2,
      category_name: 'all',
      category_label: 'All',
      category_description: 'A brief summary of me.',
      to: '/all/{year}',
      is_active: true,
    },
  ],
  activeByYear: {},
};

const reducer = (state = initState, action) => {
  let nextState = {};
  switch (action.type) {
    case CATEGORIES_RECEIVE:
    case CATEGORIES_REQUEST:
      if (action.categories) {
        nextState.activeByYear = action.activeByYear;
        nextState.available = state.available.concat(action.categories);
        return { ...state, ...nextState };
      } else {
        return state;
      }
    default:
      return state;
  }
};
export default reducer;
