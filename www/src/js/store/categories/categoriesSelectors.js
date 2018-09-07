/**
 * Return state.categories.available, with is_active set via active_categories_by_year
 */
import { getSelectedCategory } from 'store/items/itemsSelectors';
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
