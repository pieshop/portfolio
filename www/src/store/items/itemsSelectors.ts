import { createSelector } from '@reduxjs/toolkit';
import * as constants from 'constants/AppConstants';
import { getSelectedCategory, getSelectedYear, getFilteredState } from 'store/categories/categoriesSelectors';
import type { RootState } from 'store/rootReducer';

const DEFAULT_CATEGORY_DATA = {
  isFetching: true,
  items: [],
  years: [] as number[],
  activeCategories: {} as Record<string, unknown>,
};

export const getHasCategoryItems = (state: RootState): boolean => {
  const selectedCategory = getSelectedCategory(state);
  return Boolean(state.itemsByCategory[selectedCategory]);
};

export const getIsFetching = (state: RootState): boolean => {
  const selectedCategory = getSelectedCategory(state);
  if (selectedCategory === constants.CATEGORY_ABOUT) return false;
  return state.itemsByCategory[selectedCategory]
    ? state.itemsByCategory[selectedCategory].isFetching
    : true;
};

export const getItemsByCategory = createSelector(
  [getSelectedCategory, (state: RootState) => state.itemsByCategory],
  (selectedCategory, itemsByCategory) =>
    itemsByCategory[selectedCategory] ?? DEFAULT_CATEGORY_DATA
);

export const getItemsByYear = createSelector(
  [getSelectedYear, getFilteredState, getItemsByCategory],
  (selectedYear, isFiltered, itemsByCategory) => {
    const items = itemsByCategory.items as Array<{ is_featured: boolean; year: number }>;
    if (selectedYear === constants.ALL_YEARS) {
      return items.filter((item) => (isFiltered ? item.is_featured : true));
    } else {
      const year = parseInt(selectedYear);
      return items.filter((item) =>
        isFiltered ? item.is_featured && item.year === year : item.year === year
      );
    }
  }
);

export const getYears = createSelector(
  [getItemsByCategory],
  (itemsByCategory) => itemsByCategory.years as number[]
);

export const getItems = getItemsByYear;
