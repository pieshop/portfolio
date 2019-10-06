import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
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

export default (history) =>
  combineReducers({
    router: connectRouter(history),
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
