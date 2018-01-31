import * as constants from 'constants/AppConstants';

import {ITEM_INVALIDATE, ITEM_RECEIVE, ITEM_REQUEST, ITEM_SELECT} from 'store/item/itemActions';

export function selectedItem(state = constants.DEFAULT_ITEM, action) {
    switch (action.type) {
        case ITEM_SELECT:
            return action.id;
        default:
            return state;
    }
}

function item(state = {isFetching: false, didInvalidate: false, item: {}}, action) {
    switch (action.type) {
        case ITEM_INVALIDATE:
            return Object.assign({}, state, {
                didInvalidate: true,
            });
        case ITEM_REQUEST:
            return Object.assign({}, state, {
                isFetching   : true,
                didInvalidate: false,
            });
        case ITEM_RECEIVE:
            return Object.assign({}, state, {
                isFetching   : false,
                didInvalidate: false,
                item         : action.item,
                archiveItem  : action.archiveItem,
                lastUpdated  : action.receivedAt
            });
        default:
            return state;
    }
}

export function itemsByID(state = {}, action) {
    // console.log('>>>> itemsByID', state, action);
    let nextState = {};
    switch (action.type) {
        case ITEM_INVALIDATE:
        case ITEM_RECEIVE:
        case ITEM_REQUEST:
            nextState[action.id] = item(state[action.id], action);
            return Object.assign({}, state, nextState);
        default:
            return state;
    }
}

/**
 * SELECTORS
 */

export function getHasItem(state) {
    const selectedItem = state.selectedItem;
    return (state.itemsByID[selectedItem]) ? true : false;
}

export function getItem(state) {
    const selectedItem = state.selectedItem;
    return state.itemsByID[selectedItem] || {isFetching: true, item: {}};
}

export function getItemData(state) {
    return {itemData:getItem(state).item, archiveItemData:getItem(state).archiveItem};
}

