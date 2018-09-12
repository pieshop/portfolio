import {
  fetchAllActiveCategoriesByYearService,
  fetchAvailableCategoriesService,
} from 'services/portfolio';
import { shouldUpdateCategories } from '../../utils/dateValidation';
import { getAvailableCategories, getCategoriesLastUpdated } from './categoriesSelectors';
import { defaultCategories } from '../../constants/AppConstants';

export const CATEGORIES_REQUEST = 'categories.CATEGORIES_REQUEST';
export const CATEGORIES_RECEIVE = 'categories.CATEGORIES_RECEIVE';

export const CATEGORY_SELECT = 'categories.CATEGORY_SELECT';
export const METADATA_UPDATE = 'categories.METADATA_UPDATE';
export const YEAR_SELECT = 'categories.YEAR_SELECT';
export const FILTER_TOGGLE = 'categories.FILTER_TOGGLE';
export const CATEGORY_INVALIDATE = 'items.CATEGORY_INVALIDATE';

const _selectCategory = (category) => {
  return {
    type: CATEGORY_SELECT,
    category,
  };
};

const updateMetaData = (state) => {
  const metadata = getAvailableCategories(state).reduce(
    (obj, item, index) => {
      if (item.category_name === state.selectedCategory) {
        obj.label = item.category_label;
        obj.description = item.category_description;
      }
      return obj;
    },
    { label: '', description: '' }
  );
  console.log('updateMetaData', metadata);
  return {
    type: METADATA_UPDATE,
    metadata,
  };
};

export const selectYear = (year) => {
  // console.log('selectYear',year);
  return {
    type: YEAR_SELECT,
    year,
  };
};

export const toggleFilter = () => {
  return {
    type: FILTER_TOGGLE,
  };
};

export const invalidateCategory = (category) => {
  return {
    type: CATEGORY_INVALIDATE,
    category,
  };
};

const requestCategories = () => {
  return {
    type: CATEGORIES_REQUEST,
  };
};

const receiveCategories = ({ categories, activeByYear }) => {
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
        dispatch(
          receiveCategories({
            categories: parseCategories(results[0]),
            activeByYear: results[1],
          })
        );
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
    if (shouldFetchCategories(getState())) {
      dispatch(fetchCategories(getState()));
      dispatch(updateMetaData(getState()));
    }
  };
};

export const selectCategory = (category) => {
  return (dispatch, getState) => {
    dispatch(_selectCategory(category));
    dispatch(updateMetaData(getState()));
  };
};
