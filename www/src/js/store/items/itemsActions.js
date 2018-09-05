import { fetchCategoryItemsService } from 'services/portfolio';
import { get_summary_thumb_path, get_thumb_path } from 'constants/AppConstants';

import { getLocalClientData } from 'store/localdata/localDataReducer';
import { getHasCategoryItems, getItemsByCategory } from 'store/items/itemsReducer';

export const ITEMS_REQUEST = 'items.ITEMS_REQUEST';
export const ITEMS_RECEIVE = 'items.ITEMS_RECEIVE';
export const CATEGORY_SELECT = 'items.CATEGORY_SELECT';
export const YEAR_SELECT = 'items.YEAR_SELECT';
export const FILTER_TOGGLE = 'items.FILTER_TOGGLE';
export const CATEGORY_INVALIDATE = 'items.CATEGORY_INVALIDATE';

export const selectCategory = (category) => {
  // console.log('selectCategory',category);
  return {
    type: CATEGORY_SELECT,
    category,
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

const requestItems = (category) => {
  return {
    type: ITEMS_REQUEST,
    category,
  };
};

const receiveItems = (category, json) => {
  // console.log('receiveItems', category, json);
  return {
    type: ITEMS_RECEIVE,
    category,
    items: json.entries.map((entry) => entry),
    activeCategories: json.active_categories || {},
    years: json.years || [],
    receivedAt: Date.now(),
  };
};

const parseItems = (json, category, clients) => {
  json.entries = json.entries.map((o, i) => {
    const { client_id, entry_id } = o;
    o.to = '/' + category + '/' + client_id + '/' + entry_id;
    o.is_responsive = !!o.is_responsive; // convert 1/0 to true/false
    o.is_summary = !!o.is_summary; // convert 1/0 to true/false
    o.is_featured = !!o.is_featured; // convert 1/0 to true/false
    o.thumb_path = o.is_summary
      ? get_summary_thumb_path()
      : get_thumb_path({ client_id: client_id, entry_id: entry_id });
    const itemLocalData = clients[client_id] && clients[client_id][entry_id];
    if (itemLocalData && itemLocalData.awards) {
      o.awards = itemLocalData.awards.map((award) => {
        award.id = award.award_name;
        return award;
      });
    }
    return o;
  });
  return json;
};
const fetchItems = (state, category) => {
  const clients = getLocalClientData(state);
  const isFiltered = false; // default to using unfiltered, as Im filtering in frontend now
  return (dispatch) => {
    dispatch(requestItems(category));
    fetchCategoryItemsService({ isFiltered: isFiltered, category_id: category })
      .then((items) => {
        dispatch(receiveItems(category, parseItems(items, category, clients)));
      })
      .catch((message) => {
        console.error(message);
      });
  };
};

const shouldFetchItems = (state, category) => {
  // console.log('getHasCategoryItems', getHasCategoryItems(state, category));
  if (getHasCategoryItems(state)) {
    const items = getItemsByCategory(state);
    if (items.isFetching) {
      return false;
    } else {
      return items.didInvalidate;
    }
  } else {
    return true;
  }
};

export const fetchItemsIfNeeded = (category, year) => {
  // console.log('fetchItemsIfNeeded',category, year);
  return (dispatch, getState) => {
    if (shouldFetchItems(getState(), category)) {
      return dispatch(fetchItems(getState(), category));
    }
  };
};
