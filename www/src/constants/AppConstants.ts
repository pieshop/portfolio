import localdata from '../assets/json/data.json';

export const DEFAULT_FILTER = true;
export const CATEGORY_ABOUT = 'about';
export const ALL_YEARS = 'allyears';
export const DEFAULT_YEAR = 'allyears';
export const DEFAULT_CATEGORY = 'about';
export const DEFAULT_ITEM = 'grootdance';
export const IFRAME = 'IFRAME';

const BASE_URL = import.meta.env.VITE_BASE_URL as string;
const BASE_API_URL = import.meta.env.VITE_API_BASE as string;
const BASE_ASSETS_URL = import.meta.env.VITE_ASSETS_BASE as string;
const BASE_DATA_URL = (import.meta.env.VITE_DATA_BASE as string) || '';

export const get_localdata = () => localdata as unknown as Record<string, Record<string, unknown>>;

export const get_sitemap = () => BASE_URL + '/sitemap.xml';

export const get_base_assets_path = () => BASE_ASSETS_URL;

export const get_all_active_categories_by_year = ({ isFiltered = true }: { isFiltered?: boolean }) => {
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
}: {
  isFiltered?: boolean;
  category_id?: string;
  year_id?: string;
}) => {
  const url = isFiltered
    ? BASE_API_URL + '/filtered_categories/{id}/{year}'
    : BASE_API_URL + '/categories/{id}/{year}';
  return url.replace('{year}', year_id).replace('{id}', category_id);
};

export const get_item = ({ entry_id }: { entry_id: string }) => {
  const url = BASE_API_URL + '/item/{id}';
  return url.replace('{id}', entry_id);
};

export const get_image_path = ({ client_id, entry_id }: { client_id: string; entry_id: string }) => {
  const url = BASE_ASSETS_URL + '/images/portfolio-entries/{client}/{entry}/screengrabs/';
  return url.replace('{client}', client_id).replace('{entry}', entry_id);
};

export const get_images_path = () => BASE_ASSETS_URL + '/images/';

export const get_awards_path = () => BASE_ASSETS_URL + '/images/awards/';

export const get_thumb_path = ({ client_id, entry_id }: { client_id: string; entry_id: string }) => {
  const url = BASE_ASSETS_URL + '/images/portfolio-entries/{client}/{entry}/thumb/';
  return url.replace('{client}', client_id).replace('{entry}', entry_id);
};

export const get_summary_thumb_path = () =>
  BASE_ASSETS_URL + '/images/portfolio-entries/jollywise/miscellaneous/thumb/';

export const get_archive_path = ({ client_id, entry_id }: { client_id: string; entry_id: string }) => {
  return BASE_DATA_URL + `/${client_id}/${entry_id}.json`;
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
