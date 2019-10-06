import * as constants from 'constants/AppConstants';

import { ITEM_INVALIDATE, ITEM_RECEIVE, ITEM_REQUEST, ITEM_SELECT } from 'store/item/itemActions';

const initState = {};

export const selectedItem = (state = constants.DEFAULT_ITEM, action) => {
  switch (action.type) {
    case ITEM_SELECT:
      return action.id;
    default:
      return state;
  }
};

const item = (state = { isFetching: false, didInvalidate: false, item: {} }, action) => {
  const nextState = {};
  switch (action.type) {
    case ITEM_INVALIDATE:
      nextState.isFetching = false;
      nextState.didInvalidate = true;
      return { ...state, ...nextState };
    case ITEM_REQUEST:
      nextState.isFetching = true;
      nextState.didInvalidate = false;
      return { ...state, ...nextState };
    case ITEM_RECEIVE:
      nextState.isFetching = false;
      nextState.didInvalidate = false;
      nextState.item = action.item;
      nextState.archiveItem = action.archiveItem;
      nextState.lastUpdated = action.receivedAt;
      return { ...state, ...nextState };
    default:
      return state;
  }
};

const reducer = (state = initState, action) => {
  // console.log('>>>> itemsByID', state, action);
  const nextState = {};
  switch (action.type) {
    case ITEM_INVALIDATE:
    case ITEM_RECEIVE:
    case ITEM_REQUEST:
      nextState[action.id] = item(state[action.id], action);
      return { ...state, ...nextState };
    default:
      return state;
  }
};
export default reducer;
