import { combineReducers } from 'redux';
import items from 'store/items/itemsReducer';
import categories, {
  selectedCategory,
  selectedYear,
  toggledFilter,
} from 'store/categories/categoriesReducer';
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
