import * as constants from 'constants/AppConstants';

import {CATEGORY_INVALIDATE, CATEGORY_SELECT, FILTER_TOGGLE, ITEMS_RECEIVE, ITEMS_REQUEST, YEAR_SELECT} from 'store/items/itemsActions';

export function selectedCategory(state = constants.DEFAULT_CATEGORY, action) {
    switch (action.type) {
        case CATEGORY_SELECT:
            return action.category;
        default:
            return state;
    }
}

export function selectedYear(state = constants.DEFAULT_YEAR, action) {
    switch (action.type) {
        case YEAR_SELECT:
            return action.year;
        default:
            return state;
    }
}

export function toggledFilter(state = constants.DEFAULT_FILTER, action) {
    switch (action.type) {
        case FILTER_TOGGLE:
            return !state;
        default:
            return state;
    }
}

function items(state = {isFetching: false, didInvalidate: false, items: [], activeCategories: {}, years: []}, action) {
    switch (action.type) {
        case CATEGORY_INVALIDATE:
            return Object.assign({}, state, {
                didInvalidate: true,
            });
        case ITEMS_REQUEST:
            return Object.assign({}, state, {
                isFetching   : true,
                didInvalidate: false,
            });
        case ITEMS_RECEIVE:
            return Object.assign({}, state, {
                isFetching      : false,
                didInvalidate   : false,
                items           : action.items,
                activeCategories: action.activeCategories,
                years           : action.years,
                lastUpdated     : action.receivedAt
            });
        default:
            return state;
    }
}

export function itemsByCategory(state = {}, action) {
    // console.log('>>>> itemsByCategory',state,action);
    let nextState = {};
    switch (action.type) {
        case CATEGORY_INVALIDATE:
        case ITEMS_RECEIVE:
        case ITEMS_REQUEST:
            nextState[action.category] = items(state[action.category], action);
            return Object.assign({}, state, nextState);
        default:
            return state;
    }
}
// export function itemsByCategory(state = {}, action) {
//     // console.log('>>>> itemsByCategory',state,action);
//     switch (action.type) {
//         case CATEGORY_INVALIDATE:
//         case ITEMS_RECEIVE:
//         case ITEMS_REQUEST:
//             return Object.assign({}, state, {
//                 [action.category]: items(state[action.category], action)
//             });
//         default:
//             return state;
//     }
// }

/**
 * SELECTORS
 */

export function getSelectedCategory(state) {
    return state.selectedCategory;
}

export function getSelectedYear(state) {
    return state.selectedYear;
}

export function getFilteredState(state) {
    return state.filtered;
}

export function getSelectedState(state) {
    return {selectedCategory: state.selectedCategory, selectedYear: state.selectedYear};
}

export function getHasCategoryItems(state) {
    const selectedCategory = state.selectedCategory;
    return (state.itemsByCategory[selectedCategory]) ? true : false;
}

export function getIsFetching(state) {
    const selectedCategory = state.selectedCategory;
    if (selectedCategory === constants.CATEGORY_ABOUT) {
        return false;
    } else {
        return (state.itemsByCategory[selectedCategory]) ? state.itemsByCategory[selectedCategory].isFetching : true;
    }
}

export function getItemsByCategory(state) {
    const selectedCategory = state.selectedCategory;
    return state.itemsByCategory[selectedCategory] || {isFetching: true, items: [], years: [], activeCategories: {}};
}

/**
 * Gets category items and then filters on selectedYear and filtered
 */
export function getItemsByYear(state) {
    let selectedYear      = state.selectedYear;
    let filtered          = state.filtered;
    // console.log('getItemsByYear', selectedYear, filtered);
    const itemsByCategory = getItemsByCategory(state).items;
    if (selectedYear === constants.ALL_YEARS) {
        return itemsByCategory.filter((item) => {
            return (filtered) ? item.is_featured : true;
        });
    } else {
        selectedYear = parseInt(state.selectedYear);
        return itemsByCategory.filter((item) => {
            return (filtered) ? item.is_featured && item.year === selectedYear : item.year === selectedYear;
        });
    }
}

export function getYears(state) {
    return getItemsByCategory(state).years;
}

export function getItems(state) {

    return getItemsByYear(state);
}

