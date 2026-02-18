import * as constants from 'constants/AppConstants';
import { ITEM_INVALIDATE, ITEM_RECEIVE, ITEM_REQUEST, ITEM_SELECT } from 'store/item/itemActions';

interface SingleItemState {
  isFetching: boolean;
  didInvalidate: boolean;
  item: Record<string, unknown>;
  archiveItem?: unknown;
  lastUpdated?: number;
}

interface Action {
  type: string;
  id?: string;
  [key: string]: unknown;
}

export const selectedItem = (state: string = constants.DEFAULT_ITEM, action: Action): string => {
  switch (action.type) {
    case ITEM_SELECT:
      return action.id ?? state;
    default:
      return state;
  }
};

const itemDefault: SingleItemState = { isFetching: false, didInvalidate: false, item: {} };

const item = (state: SingleItemState = itemDefault, action: Action): SingleItemState => {
  switch (action.type) {
    case ITEM_INVALIDATE:
      return { ...state, isFetching: false, didInvalidate: true };
    case ITEM_REQUEST:
      return { ...state, isFetching: true, didInvalidate: false };
    case ITEM_RECEIVE:
      return {
        ...state,
        isFetching: false,
        didInvalidate: false,
        item: action.item as Record<string, unknown>,
        archiveItem: action.archiveItem,
        lastUpdated: action.receivedAt as number,
      };
    default:
      return state;
  }
};

type ItemsByIDState = Record<string, SingleItemState>;

const reducer = (state: ItemsByIDState = {}, action: Action): ItemsByIDState => {
  switch (action.type) {
    case ITEM_INVALIDATE:
    case ITEM_RECEIVE:
    case ITEM_REQUEST:
      return {
        ...state,
        [action.id as string]: item(state[action.id as string], action),
      };
    default:
      return state;
  }
};
export default reducer;
