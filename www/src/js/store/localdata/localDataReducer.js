import { get_localdata } from 'constants/AppConstants';

const initState = {
  activeClient: {},
  clients: get_localdata(),
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case 'SET_ACTIVE_CLIENT':
      state.activeClient = action.payload;
      break;
    default:
      return state;
  }
  return state;
};
export default reducer;

/**
 * SELECTORS
 */

export const getLocalData = (state) => {
  return state.localData;
};

export const getLocalClientData = (state) => {
  return state.localData.clients;
};
