import { ITEMS_INVALIDATE, ITEMS_RECEIVE, ITEMS_REQUEST } from 'store/items/itemsActions';

const initState = {};

const items = (
  state = { isFetching: false, didInvalidate: false, items: [], years: [] },
  action
) => {
  let nextState = {};
  switch (action.type) {
    case ITEMS_INVALIDATE:
      nextState.isFetching = false;
      nextState.didInvalidate = true;
      return { ...state, ...nextState };
    case ITEMS_REQUEST:
      nextState.isFetching = true;
      nextState.didInvalidate = false;
      return { ...state, ...nextState };
    case ITEMS_RECEIVE:
      nextState.isFetching = false;
      nextState.didInvalidate = false;
      nextState.items = action.items;
      nextState.years = action.years;
      nextState.lastUpdated = action.receivedAt;
      return { ...state, ...nextState };
    default:
      return state;
  }
};

const reducer = (state = initState, action) => {
  let nextState = {};
  switch (action.type) {
    case ITEMS_INVALIDATE:
    case ITEMS_RECEIVE:
    case ITEMS_REQUEST:
      nextState[action.category] = items(state[action.category], action);
      return { ...state, ...nextState };
    default:
      return state;
  }
};
export default reducer;
