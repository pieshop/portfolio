import portfolioData from '../assets/json/portfolio.json';

export const DEFAULT_FILTER = true;
export const CATEGORY_ABOUT = 'about';
export const ALL_YEARS = 'allyears';
export const DEFAULT_YEAR = 'allyears';
export const DEFAULT_CATEGORY = 'about';
export const DEFAULT_ITEM = 'grootdance';
export const IFRAME = 'IFRAME';

const BASE_URL = import.meta.env.VITE_BASE_URL as string;
const BASE_ASSETS_URL = import.meta.env.VITE_ASSETS_BASE as string;
const BASE_DATA_URL = (import.meta.env.VITE_DATA_BASE as string) || '';

// Build the localdata lookup (client_key → entry_key → media data) from portfolio.json
// This replaces the old data.json import and maintains the same shape for localDataReducer.
const _localdata: Record<string, Record<string, Record<string, unknown>>> = {};
for (const entry of portfolioData.entries) {
  const clientKey = entry.client;
  const entryKey = entry.entry_key;
  if (!_localdata[clientKey]) _localdata[clientKey] = {};
  _localdata[clientKey][entryKey] = {
    has_archive: entry.has_archive,
    is_flash: entry.is_flash,
    is_dark_background: entry.is_dark_background,
    images: entry.images,
    pdfs: entry.pdfs,
    videos: entry.videos,
    links: entry.links,
    awards: entry.awards,
  };
}

export const get_localdata = () => _localdata;

export const get_sitemap = () => BASE_URL + '/sitemap.xml';

export const get_base_assets_path = () => BASE_ASSETS_URL;

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
