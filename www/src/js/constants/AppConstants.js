export const DEFAULT_FILTER   = true;
export const CATEGORY_ABOUT   = 'about';
export const ALL_YEARS        = 'allyears';
export const DEFAULT_YEAR     = 'allyears';
export const DEFAULT_CATEGORY = 'about';
export const DEFAULT_ITEM     = 'grootdance';
export const IFRAME           = 'IFRAME';
export const IMAGE            = 'IMAGE';
export const PDF              = 'PDF';
export const SWF              = 'SWF';

let BASE_URL        = 'http://mini.portfolio';
let BASE_API_URL    = 'http://mini.api/api/v2';
let BASE_ASSETS_URL = 'http://mini.assets/portfolio';

export function get_localdata() {
    return require('../../assets/json/data.json');
}

export function get_config() {
    let config_data = require('../../assets/json/config.json');
    BASE_URL        = config_data.base_url;
    BASE_API_URL    = config_data.api_base;
    BASE_ASSETS_URL = config_data.assets_base;
}

export function get_sitemap() {
    return BASE_URL + '/sitemap.xml';
}

export function get_base_assets_path() {
    return BASE_ASSETS_URL;
}

export function get_all_active_categories_by_year(isFiltered = true) {
    return (isFiltered) ? BASE_API_URL + '/filtered_active_categories_by_year' : BASE_API_URL + '/active_categories_by_year';
}
export function get_categories(year = DEFAULT_YEAR) {
    let url = BASE_API_URL + '/available_categories/{year}';
    return url.replace('{year}', year);
}

export function get_category(isFiltered = true, id = DEFAULT_CATEGORY, year = DEFAULT_YEAR) {
    let url = isFiltered ? BASE_API_URL + '/filtered_categories/{id}/{year}' : BASE_API_URL + '/categories/{id}/{year}';
    return url.replace('{year}', year).replace('{id}', id);
}

export function get_item(id) {
    let url = BASE_API_URL + '/item/{id}';
    return url.replace('{id}', id);
}

export function get_image_path(client_id, entry_id) {
    let url = BASE_ASSETS_URL + '/images/portfolio-entries/{client}/{entry}/screengrabs/';
    return url.replace('{client}', client_id).replace('{entry}', entry_id);
}

export function get_thumb_path(client_id, entry_id) {
    let url = BASE_ASSETS_URL + '/images/portfolio-entries/{client}/{entry}/thumb/';
    return url.replace('{client}', client_id).replace('{entry}', entry_id);
}

export function get_summary_thumb_path() {
    return BASE_ASSETS_URL + '/images/portfolio-entries/jollywise/miscellaneous/thumb/';
}

export function get_archive_path(client_id, entry_id) {
    return '/assets/json/archives/' + client_id + '/' + entry_id + '.json';
}
