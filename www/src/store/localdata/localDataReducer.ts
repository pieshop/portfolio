import { get_localdata } from 'constants/AppConstants';
import type { RootState } from 'store/rootReducer';

interface LocalDataState {
  activeClient: Record<string, unknown>;
  clients: Record<string, unknown>;
}

const initState: LocalDataState = {
  activeClient: {},
  clients: get_localdata(),
};

const reducer = (state: LocalDataState = initState, action: { type: string; payload?: unknown }): LocalDataState => {
  switch (action.type) {
    case 'SET_ACTIVE_CLIENT':
      return { ...state, activeClient: action.payload as Record<string, unknown> };
    default:
      return state;
  }
};
export default reducer;

export const getLocalData = (state: RootState) => state.localData;

export const getLocalClientData = (state: RootState) => state.localData.clients;
