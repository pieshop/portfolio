import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from 'store/rootReducer';

export const getSelectedCategory = (state: RootState): string => state.selectedCategory;

export const getSelectedYear = (state: RootState): string => state.selectedYear;

export const getFilteredState = (state: RootState): boolean => state.filtered;

export const getSelectedState = createSelector(
  [getSelectedCategory, getSelectedYear],
  (selectedCategory, selectedYear) => ({ selectedCategory, selectedYear })
);

export const getAvailableCategories = (state: RootState) => state.categories.available;

export const getActiveByYearCategories = (state: RootState) => state.categories.activeByYear;

export const getSelectedCategoryMetaData = (state: RootState) => state.selectedCategoryMetaData;

export const getCategoriesLastUpdated = (state: RootState): number => state.categories.lastUpdated;
