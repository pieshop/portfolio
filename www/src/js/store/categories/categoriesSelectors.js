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
  return state.selectedCategoryMetaData;
};

export const getCategoriesLastUpdated = (state) => {
  return state.categories.lastUpdated;
};
