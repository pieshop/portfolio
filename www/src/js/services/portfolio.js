import request from 'superagent/lib/client';

import {get_all_active_categories_by_year, get_archive_path, get_categories, get_category, get_item} from 'constants/AppConstants';


export function fetchAvailableCategoriesService() {
    let url = get_categories();
    return new Promise((resolve, reject) => {
        request
            .get(url)
            .end((err, response) => {
                // console.log('fetchAvailableCategoriesService',err,response);
                if (err) {
                    reject(err);
                }
                resolve(JSON.parse(response.text));
            });
    });
}

export function fetchAllActiveCategoriesByYearService(opts) {
    const {isFiltered} = opts;
    let url = get_all_active_categories_by_year(isFiltered);
    return new Promise((resolve, reject) => {
        request
            .get(url)
            .end((err, response) => {
                // console.log('>>> fetchAllActiveCategoriesByYearService', JSON.parse(response.text));
                if (err) {
                    reject(err);
                }
                resolve(JSON.parse(response.text));
            });
    });
}

export function fetchCategoryItemsService(opts) {
    const {isFiltered, category, year_id} = opts;
    let url                               = get_category(isFiltered, category);
    return new Promise((resolve, reject) => {
        request
            .get(url)
            .end((err, response) => {
                // console.log('fetchCategoryItemsService', err, response);
                if (err) {
                    reject(err);
                }
                resolve(JSON.parse(response.text));
            });
    });
}

export function fetchItemService(opts) {
    const {entry_id} = opts;
    let url          = get_item(entry_id);
    return new Promise((resolve, reject) => {
        request
            .get(url)
            .end((err, response) => {
                // console.log('fetchItemService',err,response);
                if (err) {
                    reject(err);
                }
                resolve(JSON.parse(response.text));
            });
    });
}

export function fetchArchiveItemService(opts) {
    const {client_id, entry_id} = opts;
    let url                     = get_archive_path(client_id, entry_id);
    return new Promise((resolve, reject) => {
        request
            .get(url)
            .end((err, response) => {
                // console.log('getArchiveItem',err,response);
                if (err) {
                    // reject(err);
                    reject(null);
                } else {
                    resolve(JSON.parse(response.text));
                }
            });
    });
}
