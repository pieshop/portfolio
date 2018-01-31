import { combineReducers } from 'redux';
import { selectedCategory, selectedYear, toggledFilter, itemsByCategory } from 'store/items/itemsReducer';
import { categories } from 'store/categories/categoriesReducer';
import { selectedItem, itemsByID } from 'store/item/itemReducer';
import { localData } from 'store/localdata/localDataReducer';

import React from 'react';

const rootReducer = combineReducers({
    localData: localData,
    selectedCategory: selectedCategory,
    selectedYear: selectedYear,
    filtered: toggledFilter,
    itemsByCategory: itemsByCategory,
    selectedItem: selectedItem,
    itemsByID: itemsByID,
    categories: categories,
});

export default rootReducer;
