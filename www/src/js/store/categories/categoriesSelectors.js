/**
 * Return state.categories.available, with is_active set via active_categories_by_year
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

export const getAvailableCategories = (state) => {
  return state.categories.available;
};

export const getActiveByYearCategories = (state) => {
  return state.categories.activeByYear;
};

export const getSelectedCategoryMetaData = (state) => {
  /*
   *  TODO : Add this logic into reducer
  */
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

export const getCategoriesLastUpdated = (state) => {
  return state.categories.lastUpdated;
};
