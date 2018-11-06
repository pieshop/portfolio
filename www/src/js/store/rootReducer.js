import { combineReducers } from 'redux';
import app from 'store/app/appReducer';
import items from 'store/items/itemsReducer';
import categories, {
  selectedCategory,
  selectedCategoryMetaData,
  selectedYear,
  filtered,
} from 'store/categories/categoriesReducer';
import item, { selectedItem } from 'store/item/itemReducer';
import localData from 'store/localdata/localDataReducer';

import React from 'react';

const rootReducer = combineReducers({
  app,
  selectedCategory,
  selectedCategoryMetaData,
  selectedYear,
  filtered,
  selectedItem,
  localData,
  itemsByCategory: items,
  itemsByID: item,
  categories,
});

export default rootReducer;
