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
import type { AppDispatch, AppGetState } from 'store/configureStore';

export const CATEGORIES_REQUEST = 'categories.CATEGORIES_REQUEST';
export const CATEGORIES_RECEIVE = 'categories.CATEGORIES_RECEIVE';
export const CATEGORY_SELECT = 'categories.CATEGORY_SELECT';
export const METADATA_UPDATE = 'categories.METADATA_UPDATE';
export const YEAR_SELECT = 'categories.YEAR_SELECT';
export const FILTER_TOGGLE = 'categories.FILTER_TOGGLE';
export const CATEGORIES_INVALIDATE = 'items.CATEGORIES_INVALIDATE';

// suppress unused import lint warning - invalidateItem is imported for external use
void invalidateItem;

const categorySelect = (category: string) => ({ type: CATEGORY_SELECT, category });

const updateMetaData = (state: ReturnType<AppGetState>) => {
  const metadata = getAvailableCategories(state).reduce(
    (obj: { label: string; description: string }, item) => {
      if (item.category_name === state.selectedCategory) {
        obj.label = item.category_label;
        obj.description = item.category_description;
      }
      return obj;
    },
    { label: '', description: '' }
  );
  return { type: METADATA_UPDATE, metadata };
};

export const yearSelect = (year: string) => ({ type: YEAR_SELECT, year });

export const filterToggle = () => ({ type: FILTER_TOGGLE });

export const invalidateCategories = () => ({ type: CATEGORIES_INVALIDATE });

const requestCategories = () => ({ type: CATEGORIES_REQUEST });

const receiveCategories = ({
  categories,
  activeByYear,
}: {
  categories: unknown[];
  activeByYear: unknown;
}) => ({
  type: CATEGORIES_RECEIVE,
  categories: categories.map((category) => category),
  activeByYear,
  receivedAt: Date.now(),
});

const parseCategories = (json: Array<Record<string, unknown>>) => {
  const cats = json.map((o) => {
    o.to = '/' + o.category_name + '/{year}';
    return o;
  });
  return [...defaultCategories, ...cats];
};

const fetchCategories = () => (dispatch: AppDispatch) => {
  const isFiltered = false;
  dispatch(requestCategories());
  Promise.all([
    fetchAvailableCategoriesService(),
    fetchAllActiveCategoriesByYearService({ isFiltered }),
  ])
    .then((results) => {
      dispatch(
        receiveCategories({
          categories: parseCategories(results[0] as Array<Record<string, unknown>>),
          activeByYear: results[1],
        })
      );
    })
    .catch((message) => {
      console.error(message);
      dispatch(invalidateCategories());
    });
};

const shouldFetchCategories = (state: ReturnType<AppGetState>): boolean => {
  if (state.categories.isFetching) return false;
  return shouldUpdateCategories(getCategoriesLastUpdated(state));
};

export const fetchAvailableCategories = () => (dispatch: AppDispatch, getState: AppGetState) => {
  if (shouldFetchCategories(getState())) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    dispatch(fetchCategories() as any);
    dispatch(updateMetaData(getState()));
  }
};

export const selectCategory = (category: string) => (dispatch: AppDispatch, getState: AppGetState) => {
  dispatch(categorySelect(category));
  dispatch(updateMetaData(getState()));
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dispatch(fetchItemsIfNeeded(getSelectedState(getState())) as any);
};

export const selectYear = (year: string) => (dispatch: AppDispatch, getState: AppGetState) => {
  dispatch(yearSelect(year));
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dispatch(fetchItemsIfNeeded(getSelectedState(getState())) as any);
};

export const toggleFilter = () => (dispatch: AppDispatch, getState: AppGetState) => {
  dispatch(filterToggle());
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dispatch(fetchItemsIfNeeded(getSelectedState(getState())) as any);
};
