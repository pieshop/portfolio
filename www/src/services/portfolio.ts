import {
  get_all_active_categories_by_year,
  get_archive_path,
  get_categories,
  get_category,
  get_item,
} from 'constants/AppConstants';

export const fetchAvailableCategoriesService = (): Promise<unknown[]> => {
  const url = get_categories();
  return fetch(url).then((r) => {
    if (!r.ok) throw new Error(`HTTP ${r.status}`);
    return r.json();
  });
};

export const fetchAllActiveCategoriesByYearService = (opts: { isFiltered?: boolean }): Promise<Record<string, unknown>> => {
  const url = get_all_active_categories_by_year(opts);
  return fetch(url).then((r) => {
    if (!r.ok) throw new Error(`HTTP ${r.status}`);
    return r.json();
  });
};

export const fetchCategoryItemsService = (opts: { isFiltered?: boolean; category_id?: string; year_id?: string }): Promise<unknown> => {
  const url = get_category(opts);
  return fetch(url).then((r) => {
    if (!r.ok) throw new Error(`HTTP ${r.status}`);
    return r.json();
  });
};

export const fetchItemService = (opts: { entry_id: string }): Promise<unknown> => {
  const url = get_item(opts);
  return fetch(url).then((r) => {
    if (!r.ok) throw new Error(`HTTP ${r.status}`);
    return r.json();
  });
};

export const fetchArchiveItemService = (opts: { client_id: string; entry_id: string }): Promise<unknown> => {
  const { client_id, entry_id } = opts;
  const url = get_archive_path({ client_id, entry_id });
  return fetch(url).then((r) => {
    if (!r.ok) throw new Error(`HTTP ${r.status}`);
    return r.json();
  });
};
