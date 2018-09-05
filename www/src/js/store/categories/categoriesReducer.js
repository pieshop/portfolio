import { CATEGORIES_RECEIVE, CATEGORIES_REQUEST } from 'store/categories/categoriesActions';
import { getSelectedCategory } from 'store/items/itemsReducer';
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

const update = (state, mutations) => {
  return Object.assign({}, state, mutations);
};
const reducer = (state = initState, action) => {
  let nextState = {};
  switch (action.type) {
    case CATEGORIES_RECEIVE:
    case CATEGORIES_REQUEST:
      if (action.categories) {
        nextState.activeByYear = action.activeByYear;
        nextState.available = state.available.concat(action.categories);
        return update(state, nextState);
      } else {
        return state;
      }
    default:
      return state;
  }
};
export default reducer;

/**
 * SELECTORS
 */

/**
 * Return state.categories.available, with is_active set via active_categories_by_year
 */
export const getAvailableCategories = (state) => {
  const selectedYear = state.selectedYear;
  const active_categories_by_year = state.categories.activeByYear[selectedYear];
  // console.log('selectedYear', selectedYear, 'activeByYear', active_categories_by_year);
  if (active_categories_by_year) {
    return state.categories.available.map((o, i) => {
      const category_name = o.category_name;
      if (category_name !== 'about' && category_name !== 'all') {
        o.is_active = active_categories_by_year[category_name] === true;
      }
      return o;
    });
  } else {
    return [];
  }
};

export const getActiveByYearCategories = (state) => {
  return state.categories.activeByYear;
};

export const getSelectedCategoryMetaData = (state) => {
  const selectedCategory = getSelectedCategory(state);
  return state.categories.available.reduce(
    (obj, item, index) => {
      if (item.category_name === selectedCategory) {
        // console.log(item, selectedCategory);
        obj.label = item.category_label;
        obj.description = item.category_description;
      }
      return obj;
    },
    { label: '', description: '' }
  );
};
