import * as constants from 'constants/AppConstants';
import * as fileTypes from 'utils/fileTypes';
import { fetchArchiveItemService, fetchItemService } from 'services/portfolio';
import { getLocalClientData } from 'store/localdata/localDataReducer';
import { getHasItem, getItem } from 'store/item/itemSelectors';
import { shouldUpdateItem } from '../../utils/dateValidation';
import type { AppDispatch, AppGetState } from 'store/configureStore';
import type { RootState } from 'store/rootReducer';

export const ITEM_INVALIDATE = 'item.ITEM_INVALIDATE';
export const ITEM_SELECT = 'item.ITEM_SELECT';
export const ITEM_REQUEST = 'item.ITEM_REQUEST';
export const ITEM_RECEIVE = 'item.ITEM_RECEIVE';

export const invalidateItem = (id: string) => ({ type: ITEM_INVALIDATE, id });

const itemSelect = (id: string) => ({ type: ITEM_SELECT, id });

const requestItem = (id: string) => ({ type: ITEM_REQUEST, id });

const receiveItem = (id: string, item: unknown, archiveItem: unknown) => ({
  type: ITEM_RECEIVE,
  id,
  item,
  archiveItem,
  receivedAt: Date.now(),
});

const _isObject = (obj: unknown): boolean => obj === Object(obj);

const getMediaNames = (id: string, name: string, media_type: string, image_type: string, file_type: string) => {
  const o: Record<string, string> = {};
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

interface ParseMediaItemProps {
  obj: string | Record<string, unknown>;
  ind: number;
  media_path: string;
  client_id: string;
  entry_id: string;
  is_dark_background: boolean;
  localData: Record<string, unknown>;
  is_single_item: boolean;
}

const _parseMediaItem = (props: ParseMediaItemProps) => {
  const { obj, ind, media_path, client_id, entry_id, is_dark_background, is_single_item } = props;
  const o: Record<string, unknown> = {};
  const media_name = _isObject(obj) ? (obj as Record<string, unknown>).id as string : obj as string;
  const { width, height } = (obj as Record<string, unknown>);
  const splitNameArray = media_name.split('.');
  const [id, file_type] = splitNameArray;
  const media_type = fileTypes.getMediaType(file_type);
  const image_type = fileTypes.getImageTypeFromName(media_name);
  const alt = file_type + '_' + client_id + '_' + entry_id;

  o.media_type = media_type;
  o.media_info = { alt, width, height, media_path, file_type, image_type, is_dark_background, is_single_item };

  o.id = id + ind;
  o.media_names = getMediaNames(id, media_name, media_type, image_type, file_type);
  return o;
};

interface ParsedMedia {
  images: { desktop: unknown[]; olm: unknown[]; smartphone: unknown[] };
  pdfs: unknown[];
  videos: unknown[];
}

const _parseMedia = (json: Record<string, unknown>, _localData: Record<string, unknown>): unknown => {
  const {
    client_id,
    entry_id,
    is_dark_background,
    images = [],
    videos = [],
    pdfs = [],
  } = json as { client_id: string; entry_id: string; is_dark_background: boolean; images?: unknown[]; videos?: unknown[]; pdfs?: unknown[] };
  const media_path = constants.get_image_path({ client_id, entry_id });
  const ary = [...(images as unknown[]), ...(videos as unknown[]), ...(pdfs as unknown[])];
  const is_single_item = ary.length === 1;
  type Accumulator = { images: { desktop: unknown[]; olm: unknown[]; smartphone: unknown[] }; pdfs: unknown[]; videos: unknown[] };
  const initAcc: Accumulator = { images: { desktop: [], olm: [], smartphone: [] }, pdfs: [], videos: [] };
  const media = ary.reduce(
    (acc: Accumulator, obj, ind) => {
      const o = _parseMediaItem({
        obj: obj as string | Record<string, unknown>,
        ind,
        media_path,
        client_id,
        entry_id,
        is_dark_background,
        localData: _localData,
        is_single_item,
      });
      switch (o.media_type) {
        case fileTypes.MEDIA_IMAGE: {
          const image_type = (o.media_info as Record<string, unknown>).image_type;
          if (image_type === fileTypes.IMAGE_DESKTOP) acc.images.desktop.push(o);
          else if (image_type === fileTypes.IMAGE_OLM) acc.images.olm.push(o);
          else if (image_type === fileTypes.IMAGE_SMARTPHONE) acc.images.smartphone.push(o);
          break;
        }
        case fileTypes.MEDIA_PDF:
          acc.pdfs.push(o);
          break;
        case fileTypes.MEDIA_VIDEO:
          acc.videos.push(o);
          break;
      }
      return acc;
    },
    initAcc
  );
  return media;
};

const _parseAwards = (awards: Array<Record<string, unknown>> = []) => {
  return awards.reduce((acc: Array<Record<string, unknown>>, val) => {
    const o = { ...val };
    o.hasLink = o.link !== '' || o.pdf !== '';
    o.hasAwardCategory = o.award_category !== '';
    acc.push(o);
    return acc;
  }, []);
};

const parseItem = ({ json, entry_id, clients }: { json: Record<string, unknown>; entry_id: string; clients: Record<string, Record<string, Record<string, unknown>>> }) => {
  const client_id = json.client_id as string;
  const localData = { ...(clients[client_id]?.[entry_id] || {}) };
  json.is_dark_background = localData.is_dark_background || false;
  json.links = localData.links || [];
  json.pdfs = localData.pdfs || [];
  json.images = localData.images || [];
  json.videos = localData.videos || [];
  json.awards = _parseAwards(localData.awards as Array<Record<string, unknown>>);
  json.has_archive = Boolean(localData.has_archive && !localData.is_flash);
  json.has_frameworks = Array.isArray(json.frameworks) && json.frameworks.length > 0;
  json.has_awards = Array.isArray(json.awards) && json.awards.length > 0;
  json.has_links = Array.isArray(localData.links) && localData.links.length > 0;
  json.has_archive_or_links = json.has_archive || json.has_links;
  json.media_items = _parseMedia(json, localData);
  return json;
};

const _cssToObj = (css: string): Record<string, string> => {
  const obj: Record<string, string> = {};
  const s = css
    .toLowerCase()
    .replace(/-(.)/g, (_m, g) => g.toUpperCase())
    .replace(/;\s?$/g, '')
    .split(/:|;/g);
  for (let i = 0; i < s.length; i += 2) {
    obj[s[i].replace(/\s/g, '')] = s[i + 1].replace(/^\s+|\s+$/g, '');
  }
  return obj;
};

const parseArchiveItem = ({ json, entry_id: _entry_id }: { json: Array<Record<string, unknown>> | null; entry_id: string; clients: unknown }) => {
  if (!json) return {};
  const baseAssetsPath = constants.get_base_assets_path();
  return json.map((o) => {
    o.url = baseAssetsPath + o.url;
    if (o.base) o.base = baseAssetsPath + o.base;
    o.media_type = constants.IFRAME;
    if (o.style) o.inline_style = _cssToObj(o.style as string);
    return o;
  });
};

const fetchItem = ({ state, client_id, entry_id }: { state: RootState; client_id: string; entry_id: string }) => {
  let hasArchive = false;
  const clients = getLocalClientData(state) as Record<string, Record<string, Record<string, unknown>>>;
  if (clients[client_id]?.[entry_id]) {
    hasArchive = Boolean(clients[client_id][entry_id].has_archive);
  }

  const promises: Promise<unknown>[] = [fetchItemService({ entry_id })];
  if (hasArchive) {
    promises.push(fetchArchiveItemService({ client_id, entry_id }));
  }

  return (dispatch: AppDispatch) => {
    dispatch(requestItem(entry_id));
    Promise.all(promises)
      .then((results) => {
        const itemResult = results[0] as Record<string, unknown>;
        const archiveItemResult = hasArchive ? results[1] as Array<Record<string, unknown>> | null : null;
        dispatch(
          receiveItem(
            entry_id,
            parseItem({ json: itemResult, entry_id, clients }),
            parseArchiveItem({ json: archiveItemResult, entry_id, clients })
          )
        );
      })
      .catch((message) => {
        console.error(message);
        dispatch(invalidateItem(entry_id));
      });
  };
};

const shouldFetchItem = ({ state, entry_id }: { state: RootState; entry_id: string }): boolean => {
  if (getHasItem(state)) {
    const item = getItem(state);
    if (item.isFetching) return false;
    if (shouldUpdateItem((item.lastUpdated as number) ?? 0)) return true;
    return Boolean(item.didInvalidate);
  }
  return true;
};

export const fetchItemIfNeeded = ({ client_id, entry_id }: { client_id: string; entry_id: string }) => {
  return (dispatch: AppDispatch, getState: AppGetState) => {
    const state = getState();
    if (shouldFetchItem({ state, entry_id })) {
      dispatch(fetchItem({ state, client_id, entry_id }) as unknown as { type: string });
    }
  };
};

export const selectItem = ({ client_id, entry_id }: { client_id: string; entry_id: string }) => {
  return (dispatch: AppDispatch) => {
    dispatch(itemSelect(entry_id));
    dispatch(fetchItemIfNeeded({ client_id, entry_id }) as unknown as { type: string });
  };
};
