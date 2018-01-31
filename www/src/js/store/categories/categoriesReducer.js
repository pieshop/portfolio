import {CATEGORIES_RECEIVE, CATEGORIES_REQUEST} from 'store/categories/categoriesActions';

const initState = {
    available   : [
        {
            category_id         : 1,
            category_name       : 'about',
            category_label      : 'About',
            category_description: 'All my portfolio items (uncategorised).',
            to                  : '/about',
            is_active           : true,

        }, {
            category_id         : 2,
            category_name       : 'all',
            category_label      : 'All',
            category_description: 'A brief summary of me.',
            to                  : '/all/{year}',
            is_active           : true,
        }
    ],
    activeByYear: {},
};

// function updateCategories(categories, activeCategories) {
//     return categories.map((o, i) => {
//         const category_name = o.category_name;
//         if (category_name !== 'about' && category_name !== 'all') {
//             o.item_class = activeCategories[category_name] ? '' : 'disabled';
//         }
//         return o;
//     });
// }

export function categories(state = initState, action) {
    let nextState = {};
    switch (action.type) {
        // case ITEMS_RECEIVE:
        //     if (action.activeCategories) {
        //         nextState.available = updateCategories(state.available, action.activeCategories);
        //         return Object.assign({}, state, nextState);
        //     } else {
        //         return state;
        //     }
        case CATEGORIES_RECEIVE:
        case CATEGORIES_REQUEST:
            if (action.categories) {
                nextState.activeByYear = action.activeByYear;
                nextState.available    = state.available.concat(action.categories);
                return Object.assign({}, state, nextState);
            } else {
                return state;
            }
        default:
            return state;
    }
}

/**
 * SELECTORS
 */

/**
 * Return state.categories.available, with is_active set via active_categories_by_year
 */
export function getAvailableCategories(state) {
    const selectedYear              = state.selectedYear;
    const active_categories_by_year = state.categories.activeByYear[selectedYear];
    // console.log('selectedYear', selectedYear, 'activeByYear', active_categories_by_year);
    return state.categories.available.map((o, i) => {
        const category_name = o.category_name;
        if (category_name !== 'about' && category_name !== 'all') {
            o.is_active = active_categories_by_year[category_name] === true;
        }
        return o;
    });
}

export function getActiveByYearCategories(state) {
    return state.categories.activeByYear;
}
