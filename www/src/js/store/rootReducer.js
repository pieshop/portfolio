import { combineReducers } from 'redux';
import items, { selectedCategory, selectedYear, toggledFilter } from 'store/items/itemsReducer';
import categories from 'store/categories/categoriesReducer';
import item, { selectedItem } from 'store/item/itemReducer';
import localData from 'store/localdata/localDataReducer';

import React from 'react';

const rootReducer = combineReducers({
  selectedCategory,
  selectedYear,
  filtered: toggledFilter,
  selectedItem,
  localData,
  itemsByCategory: items,
  itemsByID: item,
  categories,
});

export default rootReducer;
