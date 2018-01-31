/**
 * Created by stephenhamilton on 02/03/2017.
 */
let keyMirror = require('fbjs/lib/keyMirror');

module.exports = keyMirror({
    /**
     * DISPATCHER
     */
    VIEW_ACTION                  : null,
    SERVER_ACTION                : null,
    /**
     * CATEGORY
     */
    TOGGLE_CATEGORY_FILTER       : null,
    RESET_CATEGORY_ITEMS         : null,
    FETCH_CATEGORY_ITEMS         : null,
    FETCHED_CATEGORY_ITEMS       : null,
    FETCHED_CATEGORY_ITEMS_ERROR : null,
    /**
     * ITEM
     */
    INIT_LOCAL_DATA              : null,
    INIT_ITEM_STORE              : null,
    FETCH_ITEM                   : null,
    FETCHED_ITEM                 : null,
    FETCHED_ITEM_ERROR           : null,
    /**
     * ARCHIVE ITEM
     */
    FETCH_ARCHIVE_ITEM           : null,
    FETCHED_ARCHIVE_ITEM         : null,
    FETCHED_ITEM_AND_ARCHIVE_ITEM: null,
    FETCHED_ARCHIVE_ITEM_ERROR   : null,
    /**
     * NAV
     */
    FETCH_NAV_ITEMS              : null,
    FETCHED_NAV_ITEMS            : null,
    FETCHED_NAV_ITEMS_ERROR      : null,
    INIT_NAV_STORE               : null,
});
