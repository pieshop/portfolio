import swfobject from 'swfobject';
import * as constants from 'constants/AppConstants';
import * as fileTypes from 'utils/fileTypes';

import { fetchArchiveItemService, fetchItemService } from 'services/portfolio';

import { getLocalClientData } from 'store/localdata/localDataReducer';
import { getHasItem, getItem } from 'store/item/itemSelectors';
import React from 'react';
import { shouldUpdateItem } from '../../utils/dateValidation';
import { selectCategory } from '../categories/categoriesActions';

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

const _isObject = (obj) => {
  return obj === Object(obj);
};

const getMediaNames = (id, name, media_type, image_type, file_type) => {
  let o = {};
  if (media_type === fileTypes.MEDIA_IMAGE) {
    o.media_name = name;
    switch (image_type) {
      case fileTypes.IMAGE_DESKTOP:
        o.media_name_1x = id + '-480.' + file_type;
        o.media_name_2x = id + '-768.' + file_type;
        o.media_name_3x = id + '-1024.' + file_type;
        break;
      case fileTypes.IMAGE_SMARTPHONE:
        o.media_name_1x = id + '-480.' + file_type;
        o.media_name_2x = id + '-768.' + file_type;
        o.media_name_3x = id + '-1024.' + file_type;
        break;
      case fileTypes.IMAGE_OLM:
        o.media_name_1x = id + '-512.' + file_type;
        o.media_name_2x = id + '-1024.' + file_type;
        break;
    }
  } else {
    o.media_name = name;
  }

  return o;
};

const _parseMediaItem = (props) => {
  // prettier-ignore
  const { obj, ind, media_path, client_id, entry_id, is_dark_background, localData, is_single_item } = props;
  let o = {};
  const media_name = _isObject(obj) ? obj.id : obj;
  const { width, height } = obj;
  const splitNameArray = media_name.split('.');
  const [id, file_type] = splitNameArray;
  const media_type = fileTypes.getMediaType(file_type);
  const image_type = fileTypes.getImageTypeFromName(media_name);
  const alt = file_type + '_' + client_id + '_' + entry_id;

  o.media_type = media_type;
  // prettier-ignore
  o.media_info = { alt, width, height, media_path, file_type, image_type, is_dark_background, is_single_item };
  if (media_type === fileTypes.MEDIA_SWF) {
    o.id = id;
    o.swf_data = localData.swfs_data[id];
    o.swf_data.id = id;
    o.swf_data.url = media_path + media_name;
  } else {
    o.id = id + ind;
    o.media_names = getMediaNames(id, media_name, media_type, image_type, file_type);
  }
  // console.log('>>>> o', o);
  return o;
};

const _checkForSingle = (arr) => {
  if (arr.length === 1) {
    arr[0].media_info.is_single_item = true;
  }
};

const _parseMedia = (json, localData) => {
  const { client_id, entry_id, is_dark_background, images = [], pdfs = [], swfs = [] } = json;
  const media_path = constants.get_image_path({ client_id: client_id, entry_id: entry_id });
  const ary = [...images, ...pdfs, ...swfs];
  const is_single_item = ary.length === 1;
  const media = ary.reduce(
    (acc, obj, ind) => {
      // prettier-ignore
      const o = _parseMediaItem({ obj, ind, media_path, client_id, entry_id, is_dark_background, localData, is_single_item });
      switch (o.media_type) {
        case fileTypes.MEDIA_IMAGE: {
          const { image_type } = o.media_info;
          if (image_type === fileTypes.IMAGE_DESKTOP) {
            acc.images.desktop.push(o);
          } else if (image_type === fileTypes.IMAGE_OLM) {
            acc.images.olm.push(o);
          } else if (image_type === fileTypes.IMAGE_SMARTPHONE) {
            acc.images.smartphone.push(o);
          }
          return acc;
        }
        case fileTypes.MEDIA_PDF:
          acc.pdfs.push(o);
          break;
        case fileTypes.MEDIA_SWF:
          acc.swfs.push(o);
          break;
      }
      return acc;
    },
    { images: { desktop: [], olm: [], smartphone: [] }, pdfs: [], swfs: [] }
  );
  // _checkForSingle(media.pdfs);
  // _checkForSingle(media.swfs);
  // _checkForSingle(media.images.desktop);
  // _checkForSingle(media.images.olm);
  // _checkForSingle(media.images.smartphone);
  return media;
};

const _parseAwards = (awards = []) => {
  return awards.reduce((acc, val, i) => {
    let o = { ...val };
    o.hasLink = o.link !== '' || o.pdf !== '';
    o.hasAwardCategory = o.award_category !== '';
    acc.push(o);
    return acc;
  }, []);
};

const parseItem = (json, id, clients) => {
  let user_has_flash = swfobject.hasFlashPlayerVersion('9.0.18');
  // console.log('parseItem', json, 'user_has_flash', user_has_flash);

  const client_id = json.client_id;
  const localData = { ...clients[client_id][id] };

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
    o.media_type = o.type === 'swf' ? fileTypes.MEDIA_SWF : constants.IFRAME;
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

        // const cats = itemResult.category.split(',');
        // dispatch(selectCategory(cats[0]));

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
  if (getHasItem(state)) {
    const item = getItem(state);
    if (item.isFetching) {
      return false;
    } else if (shouldUpdateItem(item.lastUpdated)) {
      return true;
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
    const state = getState();
    if (shouldFetchItem(state, id)) {
      dispatch(fetchItem(state, id, client_id));
      // } else {
      //   dispatch(selectCategory(getItem(state).item.category));
    }
  };
};
