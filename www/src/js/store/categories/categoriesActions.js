import {
  fetchAllActiveCategoriesByYearService,
  fetchAvailableCategoriesService,
} from 'services/portfolio';
import { shouldUpdateCategories } from '../../utils/dateValidation';
import { getCategoriesLastUpdated } from './categoriesSelectors';
import { defaultCategories } from '../../constants/AppConstants';

export const CATEGORIES_REQUEST = 'categories.CATEGORIES_REQUEST';
export const CATEGORIES_RECEIVE = 'categories.CATEGORIES_RECEIVE';

const requestCategories = () => {
  return {
    type: CATEGORIES_REQUEST,
  };
};

const receiveCategories = (categories, activeByYear) => {
  return {
    type: CATEGORIES_RECEIVE,
    categories: categories.map((category) => category),
    activeByYear: activeByYear,
    receivedAt: Date.now(),
  };
};

const parseCategories = (json) => {
  let cats = json.map((o, i) => {
    o.to = '/' + o.category_name + '/{year}';
    return o;
  });
  return [...defaultCategories, ...cats];
};
const fetchCategories = (state) => {
  const isFiltered = false; // default to using unfiltered, as Im filtering in frontend now
  return (dispatch) => {
    dispatch(requestCategories());
    Promise.all([
      fetchAvailableCategoriesService(),
      fetchAllActiveCategoriesByYearService({ isFiltered }),
    ])
      .then((results) => {
        dispatch(receiveCategories(parseCategories(results[0]), results[1]));
      })
      .catch((message) => {
        console.error(message);
      });
  };
};

const shouldFetchCategories = (state) => {
  const lastUpdated = getCategoriesLastUpdated(state);
  return shouldUpdateCategories(lastUpdated);
};

export const fetchAvailableCategories = () => {
  return (dispatch, getState) => {
    // return dispatch(fetchCategories(getState()));
    if (shouldFetchCategories(getState())) {
      return dispatch(fetchCategories(getState()));
    }
  };
};
