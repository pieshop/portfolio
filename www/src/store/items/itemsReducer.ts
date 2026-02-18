import { ITEMS_INVALIDATE, ITEMS_RECEIVE, ITEMS_REQUEST } from 'store/items/itemsActions';

interface CategoryItemsState {
  isFetching: boolean;
  didInvalidate: boolean;
  items: unknown[];
  activeCategories: Record<string, unknown>;
  years: number[];
  lastUpdated?: number;
}

const itemsDefault: CategoryItemsState = {
  isFetching: false,
  didInvalidate: false,
  items: [],
  activeCategories: {},
  years: [],
};

interface Action {
  type: string;
  category?: string;
  [key: string]: unknown;
}

const items = (state: CategoryItemsState = itemsDefault, action: Action): CategoryItemsState => {
  switch (action.type) {
    case ITEMS_INVALIDATE:
      return { ...state, isFetching: false, didInvalidate: true };
    case ITEMS_REQUEST:
      return { ...state, isFetching: true, didInvalidate: false };
    case ITEMS_RECEIVE:
      return {
        ...state,
        isFetching: false,
        didInvalidate: false,
        items: action.items as unknown[],
        activeCategories: action.activeCategories as Record<string, unknown>,
        years: action.years as number[],
        lastUpdated: action.receivedAt as number,
      };
    default:
      return state;
  }
};

type ItemsByCategoryState = Record<string, CategoryItemsState>;

const reducer = (state: ItemsByCategoryState = {}, action: Action): ItemsByCategoryState => {
  switch (action.type) {
    case ITEMS_INVALIDATE:
    case ITEMS_RECEIVE:
    case ITEMS_REQUEST:
      return {
        ...state,
        [action.category as string]: items(state[action.category as string], action),
      };
    default:
      return state;
  }
};
export default reducer;
