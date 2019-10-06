import request from 'superagent/lib/client';

import {
  get_all_active_categories_by_year,
  get_archive_path,
  get_categories,
  get_category,
  get_item,
} from 'constants/AppConstants';

export const fetchAvailableCategoriesService = () => {
  const url = get_categories();
  return new Promise((resolve, reject) => {
    request.get(url).end((err, response) => {
      // console.log('fetchAvailableCategoriesService',err,response);
      if (err) {
        reject(err);
      }
      resolve(JSON.parse(response.text));
    });
  });
};

export const fetchAllActiveCategoriesByYearService = (opts) => {
  const url = get_all_active_categories_by_year(opts);
  return new Promise((resolve, reject) => {
    request.get(url).end((err, response) => {
      // console.log('>>> fetchAllActiveCategoriesByYearService', JSON.parse(response.text));
      if (err) {
        reject(err);
      }
      resolve(JSON.parse(response.text));
    });
  });
};

export const fetchCategoryItemsService = (opts) => {
  const url = get_category(opts);
  return new Promise((resolve, reject) => {
    request.get(url).end((err, response) => {
      // console.log('fetchCategoryItemsService', err, response);
      if (err) {
        reject(err);
      }
      resolve(JSON.parse(response.text));
    });
  });
};

export const fetchItemService = (opts) => {
  const url = get_item(opts);
  return new Promise((resolve, reject) => {
    request.get(url).end((err, response) => {
      // console.log('fetchItemService',err,response);
      if (err) {
        reject(err);
      }
      resolve(JSON.parse(response.text));
    });
  });
};

export const fetchArchiveItemService = (opts) => {
  const { client_id, entry_id } = opts;
  const url = get_archive_path({ client_id: client_id, entry_id: entry_id });
  return new Promise((resolve, reject) => {
    request.get(url).end((err, response) => {
      // console.log('getArchiveItem', err, response);
      if (err) {
        // reject(err);
        reject(err);
      } else {
        resolve(JSON.parse(response.text));
      }
    });
  });
};
