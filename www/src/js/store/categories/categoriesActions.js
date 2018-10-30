import {
  fetchAllActiveCategoriesByYearService,
  fetchAvailableCategoriesService,
} from 'services/portfolio';
import { shouldUpdateCategories } from '../../utils/dateValidation';
import { getAvailableCategories, getCategoriesLastUpdated } from './categoriesSelectors';
import { defaultCategories } from '../../constants/AppConstants';
import { fetchItemsIfNeeded } from 'store/items/itemsActions';
import { getSelectedState } from 'store/categories/categoriesSelectors';
import { invalidateItem } from 'store/item/itemActions';
import { push } from 'connected-react-router';

export const CATEGORIES_REQUEST = 'categories.CATEGORIES_REQUEST';
export const CATEGORIES_RECEIVE = 'categories.CATEGORIES_RECEIVE';

export const CATEGORY_SELECT = 'categories.CATEGORY_SELECT';
export const METADATA_UPDATE = 'categories.METADATA_UPDATE';
export const YEAR_SELECT = 'categories.YEAR_SELECT';
export const FILTER_TOGGLE = 'categories.FILTER_TOGGLE';
export const CATEGORIES_INVALIDATE = 'items.CATEGORIES_INVALIDATE';

const categorySelect = (category) => {
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
  return {
    type: METADATA_UPDATE,
    metadata,
  };
};

export const yearSelect = (year) => {
  return {
    type: YEAR_SELECT,
    year,
  };
};

export const filterToggle = () => {
  return {
    type: FILTER_TOGGLE,
  };
};

export const invalidateCategories = () => {
  return {
    type: CATEGORIES_INVALIDATE,
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
        dispatch(invalidateCategories());
        dispatch(push('/notfound'));
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
    dispatch(categorySelect(category));
    dispatch(updateMetaData(getState()));
    dispatch(fetchItemsIfNeeded(getSelectedState(getState())));
  };
};

export const selectYear = (year) => {
  return (dispatch, getState) => {
    dispatch(yearSelect(year));
    dispatch(fetchItemsIfNeeded(getSelectedState(getState())));
  };
};

export const toggleFilter = () => {
  return (dispatch, getState) => {
    dispatch(filterToggle());
    dispatch(fetchItemsIfNeeded(getSelectedState(getState())));
  };
};
