import {fetchAllActiveCategoriesByYearService, fetchAvailableCategoriesService} from 'services/portfolio';

export const CATEGORIES_REQUEST = 'categories.CATEGORIES_REQUEST';
export const CATEGORIES_RECEIVE = 'categories.CATEGORIES_RECEIVE';

function requestCategories() {
    return {
        type: CATEGORIES_REQUEST
    };
}

function receiveCategories(categories, activeByYear) {
    return {
        type        : CATEGORIES_RECEIVE,
        categories  : categories.map(category => category),
        activeByYear: activeByYear,
    };
}

function parseCategories(json) {
    return json.map((o, i) => {
        o.to         = '/' + o.category_name + '/{year}';
        return o;
    });
}
function fetchCategories(state) {
    const isFiltered = false; // default to using unfiltered, as Im filtering in frontend now
    return dispatch => {
        dispatch(requestCategories());
        Promise.all([
            fetchAvailableCategoriesService(),
            fetchAllActiveCategoriesByYearService({isFiltered:isFiltered})
        ])
            .then((results) => {
                dispatch(receiveCategories(parseCategories(results[0]), results[1]));
            })
            .catch((message) => {
                console.error(message);
            });
    };
}

export function fetchAvailableCategories() {
    return (dispatch, getState) => {
        return dispatch(fetchCategories(getState()));
    };
}
