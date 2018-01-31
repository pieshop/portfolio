import {get_localdata} from 'constants/AppConstants';

const initState = {
    activeClient: {},
    clients: get_localdata(),
};

export function localData(state = initState, action) {
    switch (action.type) {
        case 'SET_ACTIVE_CLIENT':
            state.activeClient        = action.payload;
            break;
        default:
            return state;
    }
    return state;
}


/**
 * SELECTORS
 */

export function getLocalData(state) {
    return state.localData;
}

export function getLocalClientData(state) {
    return state.localData.clients;
}

