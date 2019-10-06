export const DEFAULT_FILTER = true;
export const CATEGORY_ABOUT = 'about';
export const ALL_YEARS = 'allyears';
export const DEFAULT_YEAR = 'allyears';
export const DEFAULT_CATEGORY = 'about';
export const DEFAULT_ITEM = 'grootdance';
export const IFRAME = 'IFRAME';

let BASE_URL = 'http://mini.portfolio';
let BASE_API_URL = 'http://mini.api/api/v2';
let BASE_ASSETS_URL = 'http://mini.assets/portfolio';
let BASE_DATA_URL = '';
export let ANALYTICS_ID = 'http://mini.assets/portfolio';
export let ANALYTICS_DOMAIN = 'http://mini.assets/portfolio';

export const get_localdata = () => {
  return require('../../assets/json/data.json');
};

export const get_config = () => {
  const config_data = require('../../assets/json/config.json');
  BASE_URL = config_data.base_url;
  BASE_API_URL = config_data.api_base;
  BASE_ASSETS_URL = config_data.assets_base;
  BASE_DATA_URL = config_data.data_base;
  ANALYTICS_ID = config_data.analytics_id;
  ANALYTICS_DOMAIN = config_data.analytics_domain;
};

export const get_sitemap = () => {
  return BASE_URL + '/sitemap.xml';
};

export const get_base_assets_path = () => {
  return BASE_ASSETS_URL;
};

export const get_all_active_categories_by_year = ({ isFiltered = true }) => {
  return isFiltered
    ? BASE_API_URL + '/filtered_active_categories_by_year'
    : BASE_API_URL + '/active_categories_by_year';
};
export const get_categories = () => {
  const url = BASE_API_URL + '/available_categories/{year}';
  return url.replace('{year}', DEFAULT_YEAR);
};

export const get_category = ({
  isFiltered = true,
  category_id = DEFAULT_CATEGORY,
  year_id = DEFAULT_YEAR,
}) => {
  const url = isFiltered
    ? BASE_API_URL + '/filtered_categories/{id}/{year}'
    : BASE_API_URL + '/categories/{id}/{year}';
  return url.replace('{year}', year_id).replace('{id}', category_id);
};

export const get_item = ({ entry_id }) => {
  const url = BASE_API_URL + '/item/{id}';
  return url.replace('{id}', entry_id);
};

export const get_image_path = ({ client_id, entry_id }) => {
  const url = BASE_ASSETS_URL + '/images/portfolio-entries/{client}/{entry}/screengrabs/';
  return url.replace('{client}', client_id).replace('{entry}', entry_id);
};

export const get_images_path = () => {
  return BASE_ASSETS_URL + '/images/';
};

export const get_awards_path = () => {
  return BASE_ASSETS_URL + '/images/awards/';
};

export const get_thumb_path = ({ client_id, entry_id }) => {
  const url = BASE_ASSETS_URL + '/images/portfolio-entries/{client}/{entry}/thumb/';
  return url.replace('{client}', client_id).replace('{entry}', entry_id);
};

export const get_summary_thumb_path = () => {
  return BASE_ASSETS_URL + '/images/portfolio-entries/jollywise/miscellaneous/thumb/';
};

export const get_archive_path = ({ client_id, entry_id }) => {
  // return BASE_DATA_URL + `/assets/json/archives/${client_id}/${entry_id}.json`;
  return BASE_DATA_URL + `/${client_id}/${entry_id}.json`;
  // return '/assets/json/archives/' + client_id + '/' + entry_id + '.json';
};

export const defaultCategories = [
  {
    category_id: -1,
    category_name: 'about',
    category_label: 'About',
    category_description: 'All my portfolio items (uncategorised).',
    to: '/about',
    is_active: true,
  },
  {
    category_id: 0,
    category_name: 'all',
    category_label: 'All',
    category_description: 'A brief summary of me.',
    to: '/all/{year}',
    is_active: true,
  },
];
