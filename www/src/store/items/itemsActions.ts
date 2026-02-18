import * as constants from 'constants/AppConstants';
import { get_summary_thumb_path, get_thumb_path } from 'constants/AppConstants';
import { fetchCategoryItemsService } from 'services/portfolio';
import { getLocalClientData } from 'store/localdata/localDataReducer';
import { getHasCategoryItems, getItemsByCategory } from 'store/items/itemsSelectors';
import { shouldUpdateItems } from '../../utils/dateValidation';
import type { AppDispatch, AppGetState } from 'store/configureStore';
import type { RootState } from 'store/rootReducer';

export const ITEMS_INVALIDATE = 'items.ITEMS_INVALIDATE';
export const ITEMS_REQUEST = 'items.ITEMS_REQUEST';
export const ITEMS_RECEIVE = 'items.ITEMS_RECEIVE';

export const invalidateCategory = (id: string) => ({ type: ITEMS_INVALIDATE, id });

const requestItems = (category: string) => ({ type: ITEMS_REQUEST, category });

const receiveItems = (category: string, json: { entries: unknown[]; active_categories?: Record<string, unknown>; years?: number[] }) => ({
  type: ITEMS_RECEIVE,
  category,
  items: json.entries.map((entry) => entry),
  activeCategories: json.active_categories || {},
  years: json.years || [],
  receivedAt: Date.now(),
});

const parseItems = (json: { entries: Array<Record<string, unknown>> }, category: string, clients: Record<string, Record<string, Record<string, unknown>>>) => {
  json.entries = json.entries.map((obj) => {
    const o = { ...obj };
    const client_id = o.client_id as string;
    const entry_id = o.entry_id as string;
    o.to = '/' + category + '/' + client_id + '/' + entry_id;
    o.is_responsive = Boolean(o.is_responsive);
    o.is_summary = Boolean(o.is_summary);
    o.is_featured = Boolean(o.is_featured);
    o.thumb_path = o.is_summary
      ? get_summary_thumb_path()
      : get_thumb_path({ client_id, entry_id });
    const itemLocalData = clients[client_id]?.[entry_id] as { awards?: Array<Record<string, unknown>> } | undefined;
    if (itemLocalData?.awards) {
      o.awards = itemLocalData.awards.reduce((acc: Array<Record<string, unknown>>, val, i) => {
        const award = { ...val, id: 'award_' + i };
        acc.push(award);
        return acc;
      }, []);
    }
    return o;
  });
  return json;
};

const fetchItems = (state: RootState, category: string) => {
  const clients = getLocalClientData(state);
  const isFiltered = false;
  return (dispatch: AppDispatch) => {
    dispatch(requestItems(category));
    (fetchCategoryItemsService({ isFiltered, category_id: category }) as Promise<{ entries: Array<Record<string, unknown>>; active_categories?: Record<string, unknown>; years?: number[] }>)
      .then((items) => {
        dispatch(receiveItems(category, parseItems(items, category, clients as Record<string, Record<string, Record<string, unknown>>>)));
      })
      .catch((message) => {
        console.error(message);
        dispatch(invalidateCategory(category));
      });
  };
};

const shouldFetchItems = (state: RootState): boolean => {
  if (getHasCategoryItems(state)) {
    const items = getItemsByCategory(state);
    if (items.isFetching) return true;
    if (shouldUpdateItems(items.lastUpdated ?? 0)) return true;
    return items.didInvalidate;
  }
  return true;
};

export const fetchItemsIfNeeded = ({ selectedCategory, selectedYear }: { selectedCategory: string; selectedYear: string }) => {
  return (dispatch: AppDispatch, getState: AppGetState) => {
    const isValidCategory = selectedCategory !== constants.CATEGORY_ABOUT;
    if (isValidCategory && shouldFetchItems(getState())) {
      dispatch(fetchItems(getState(), selectedCategory) as unknown as { type: string });
    }
  };
};
