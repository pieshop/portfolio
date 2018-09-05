import swfobject from 'swfobject';
import * as constants from 'constants/AppConstants';

import { fetchArchiveItemService, fetchItemService } from 'services/portfolio';

import { getLocalClientData } from 'store/localdata/localDataReducer';
import { getHasItem, getItem } from 'store/item/itemReducer';

export const ITEM_INVALIDATE = 'item.ITEM_INVALIDATE';
export const ITEM_SELECT = 'item.ITEM_SELECT';
export const ITEM_REQUEST = 'item.ITEM_REQUEST';
export const ITEM_RECEIVE = 'item.ITEM_RECEIVE';

export const invalidateItem = (id) => {
  return {
    type: ITEM_INVALIDATE,
    id,
  };
};

export const selectItem = (id) => {
  return {
    type: ITEM_SELECT,
    id,
  };
};

const requestItem = (id) => {
  return {
    type: ITEM_REQUEST,
    id,
  };
};

const receiveItem = (id, item, archiveItem) => {
  // console.log('receiveItems', category, item);
  return {
    type: ITEM_RECEIVE,
    id,
    item,
    archiveItem,
    receivedAt: Date.now(),
  };
};

const isObject = (obj) => {
  return obj === Object(obj);
};

const _parseMedia = (json, localData) => {
  const { client_id, entry_id, is_dark_background, images, pdfs, swfs } = json;
  let media_path = constants.get_image_path({ client_id: client_id, entry_id: entry_id });

  let ary = [].concat(images);
  if (pdfs) {
    ary = ary.concat(pdfs);
  }
  if (swfs) {
    ary = ary.concat(swfs);
  }

  let is_single_item = ary.length === 1;

  let lst = ary.map((obj) => {
    let o = {};
    let media_name;
    if (isObject(obj)) {
      media_name = obj.id;
      o.width = obj.width;
      o.height = obj.height;
    } else {
      media_name = obj;
    }
    let ary = media_name.split('.');
    let id = ary[0];
    let file_type = ary[1];

    let is_image = file_type === 'jpg' || file_type === 'png';
    let is_pdf = file_type === 'pdf';
    let is_swf = file_type === 'swf';
    let media_type = constants.IMAGE;
    if (file_type === 'jpg' || file_type === 'png') {
      media_type = constants.IMAGE;
    } else if (file_type === 'pdf') {
      media_type = constants.PDF;
    } else if (file_type === 'swf') {
      media_type = constants.SWF;
    }

    let is_desktop = media_name.indexOf('desktop') !== -1;
    let is_smartphone = media_name.indexOf('smartphone') !== -1;
    let is_olm = media_name.indexOf('olm') !== -1;

    o.id = id;
    o.media_path = media_path;
    o.media_name = media_name;
    o.media_type = media_type;
    o.is_image = is_image;
    o.is_pdf = is_pdf;
    o.is_swf = is_swf;
    o.is_dark_background = is_dark_background;
    o.is_desktop = is_desktop;
    o.is_single_item = is_single_item;
    o.is_smartphone = is_smartphone;
    o.is_olm = is_olm;
    o.alt = 'image_' + client_id + '_' + entry_id;

    if (media_type === constants.IMAGE) {
      o.media_name_1x = id + '-480.' + file_type;
      o.media_name_2x = id + '-768.' + file_type;
      o.media_name_3x = id + '-1024.' + file_type;
    }
    if (media_type === constants.SWF) {
      o.swf_data = localData.swfs_data[id];
      o.swf_data.id = id;
      o.swf_data.url = media_path + media_name;
    }
    // console.log('o', o);
    return o;
  });
  // console.log('parseMedia', lst);
  return lst;
};
const _parseAwards = (awards = []) => {
  //award_name, award_long_name, award_result, award_category, link, pdf
  for (const o of awards) {
    o.hasLink = o.link !== '' || o.pdf !== '';
    o.hasAwardCategory = o.award_category !== '';
  }
  return awards;
};
const parseItem = (json, id, clients) => {
  let user_has_flash = swfobject.hasFlashPlayerVersion('9.0.18');
  // console.log('user_has_flash', user_has_flash);

  const client_id = json.client_id;
  const localData = clients[client_id][id];

  json.is_flash = localData.is_flash || false;
  json.is_dark_background = localData.is_dark_background || false;
  json.links = localData.links || [];
  json.pdfs = localData.pdfs || [];
  json.swfs = localData.swfs || [];
  json.images = localData.images || [];
  json.awards = _parseAwards(localData.awards);
  if (localData.has_archive) {
    if (localData.is_flash && user_has_flash) {
      /**
       * or device = desktop - show archive button and also show flash install/enable if no flash detected
       * see: http://www.channel4.com/programmes/grand-designs/on-demand/57386-003
       */
      json.has_archive = true;
    } else if (!localData.is_flash) {
      json.has_archive = true;
    } else {
      json.has_archive = false;
    }
  } else {
    json.has_archive = false;
  }
  json.has_frameworks = json.frameworks && json.frameworks.length > 0;
  json.has_awards = json.awards && json.awards.length > 0;
  json.has_links = localData.links && localData.links.length > 0;
  json.has_archive_or_links = json.has_archive || json.has_links;
  json.media_items = _parseMedia(json, localData);
  return json;
};
const _cssToObj = (css) => {
  let obj = {};
  let s = css
    .toLowerCase()
    .replace(/-(.)/g, (m, g) => {
      return g.toUpperCase();
    })
    .replace(/;\s?$/g, '')
    .split(/:|;/g);
  for (let i = 0; i < s.length; i += 2) {
    obj[s[i].replace(/\s/g, '')] = s[i + 1].replace(/^\s+|\s+$/g, '');
  }
  return obj;
};
const parseArchiveItem = (json, id, clients) => {
  // console.log('parseArchiveItem', json, id);
  if (!json) {
    return {};
  }
  const baseAssetsPath = constants.get_base_assets_path();
  return json.map((o) => {
    o.url = baseAssetsPath + o.url;
    if (o.base) {
      o.base = baseAssetsPath + o.base;
    }
    o.media_type = o.type === 'swf' ? constants.SWF : constants.IFRAME;
    if (o.style) {
      o.inline_style = _cssToObj(o.style);
    }
    return o;
  });
};
const fetchItem = (state, id, client_id) => {
  let hasArchive = false;
  const clients = getLocalClientData(state);
  /*
     *  TODO : Catch errors and show error page
    */

  if (clients[client_id] && clients[client_id][id]) {
    hasArchive = clients[client_id][id].has_archive;
  }
  // console.log('fetchItem', id, '| hasArchive', hasArchive);
  let promises = [fetchItemService({ entry_id: id })];
  if (hasArchive) {
    promises.push(fetchArchiveItemService({ client_id: client_id, entry_id: id }));
  }
  return (dispatch) => {
    dispatch(requestItem(id));
    Promise.all(promises)
      .then((results) => {
        const itemResult = results[0];
        const archiveItemResult = hasArchive ? results[1] : null;
        dispatch(
          receiveItem(
            id,
            parseItem(itemResult, id, clients),
            parseArchiveItem(archiveItemResult, id, clients)
          )
        );
      })
      .catch((message) => {
        console.error(message);
      });
  };
};

const shouldFetchItem = (state, id) => {
  // console.log('shouldFetchItem', id);
  if (getHasItem(state)) {
    const item = getItem(state);
    if (item.isFetching) {
      return false;
    } else {
      return item.didInvalidate;
    }
  } else {
    return true;
  }
};

export const fetchItemIfNeeded = (id, client_id) => {
  // console.log('fetchItemIfNeeded', client_id, id);
  return (dispatch, getState) => {
    if (shouldFetchItem(getState(), id)) {
      return dispatch(fetchItem(getState(), id, client_id));
    }
  };
};
