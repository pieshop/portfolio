import portfolioData from '../assets/json/portfolio.json';
import { get_archive_path } from 'constants/AppConstants';

// Type aliases for the portfolio data
type PortfolioEntry = (typeof portfolioData.entries)[number];

// ---------------------------------------------------------------------------
// fetchAvailableCategoriesService
// Returns the same shape the API returned: array of category objects.
// ---------------------------------------------------------------------------
export const fetchAvailableCategoriesService = (): Promise<
  Array<{
    category_id: number;
    category_name: string;
    category_label: string;
    category_description: string;
    is_active: boolean;
  }>
> => {
  const categories = Object.entries(portfolioData.categories).map(
    ([name, cat], index) => ({
      category_id: index + 1,
      category_name: name,
      category_label: cat.label,
      category_description: cat.description,
      is_active: true,
    }),
  );
  return Promise.resolve(categories);
};

// ---------------------------------------------------------------------------
// fetchAllActiveCategoriesByYearService
// Returns { [year]: { [category_name]: true } }
// The `isFiltered` param used to filter by is_featured; we now derive this
// from all entries since the unfiltered view is what's needed for navigation.
// ---------------------------------------------------------------------------
export const fetchAllActiveCategoriesByYearService = (
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _opts: { isFiltered?: boolean } = {},
): Promise<Record<string, Record<string, boolean>>> => {
  const result: Record<string, Record<string, boolean>> = {};
  const allYearsMap: Record<string, boolean> = {};

  for (const entry of portfolioData.entries) {
    const yearKey = String(entry.year);
    if (!result[yearKey]) result[yearKey] = {};
    for (const cat of entry.categories) {
      result[yearKey][cat] = true;
      allYearsMap[cat] = true;
    }
  }

  result['allyears'] = allYearsMap;
  return Promise.resolve(result);
};

// ---------------------------------------------------------------------------
// fetchCategoryItemsService
// Returns { entries, years, active_categories } matching the API shape.
// ---------------------------------------------------------------------------
export const fetchCategoryItemsService = (opts: {
  isFiltered?: boolean;
  category_id?: string;
  year_id?: string;
}): Promise<{
  entries: Array<Record<string, unknown>>;
  years: number[];
  active_categories: Record<string, boolean>;
}> => {
  const { category_id = 'all', year_id = 'allyears' } = opts;

  // Filter entries by category
  let filtered: PortfolioEntry[];
  if (category_id === 'all') {
    filtered = [...portfolioData.entries];
  } else {
    filtered = portfolioData.entries.filter((e) =>
      e.categories.includes(category_id),
    );
  }

  // Filter by year
  if (year_id !== 'allyears') {
    const yearNum = parseInt(year_id);
    filtered = filtered.filter((e) => e.year === yearNum);
  }

  // Derive available years for this category
  const yearsSet = new Set<number>();
  const allForCategory =
    category_id === 'all'
      ? portfolioData.entries
      : portfolioData.entries.filter((e) =>
          e.categories.includes(category_id),
        );
  for (const e of allForCategory) {
    yearsSet.add(e.year);
  }
  const years = Array.from(yearsSet).sort((a, b) => b - a);

  // Derive active categories for the selected year
  const activeCats: Record<string, boolean> = {};
  const entriesForYear =
    year_id === 'allyears'
      ? portfolioData.entries
      : portfolioData.entries.filter((e) => e.year === parseInt(year_id));
  for (const e of entriesForYear) {
    for (const cat of e.categories) {
      activeCats[cat] = true;
    }
  }

  // Map to API response shape
  const entries = filtered.map((e) => {
    const clientData = portfolioData.clients[e.client as keyof typeof portfolioData.clients];
    return {
      id: e.entry_key,
      client_id: e.client,
      entry_id: e.entry_key,
      client_label: clientData?.name || e.client,
      category: e.categories.join(', '),
      title: e.title,
      year: e.year,
      is_responsive: e.is_responsive,
      is_summary: e.is_summary,
      is_featured: e.is_featured,
    };
  });

  return Promise.resolve({ entries, years, active_categories: activeCats });
};

// ---------------------------------------------------------------------------
// fetchItemService
// Returns a single item object matching the API shape.
// ---------------------------------------------------------------------------
export const fetchItemService = (opts: {
  entry_id: string;
}): Promise<Record<string, unknown>> => {
  const entry = portfolioData.entries.find(
    (e) => e.entry_key === opts.entry_id,
  );
  if (!entry) {
    return Promise.reject(new Error(`Entry not found: ${opts.entry_id}`));
  }

  const clientData = portfolioData.clients[entry.client as keyof typeof portfolioData.clients];
  const affData = entry.affiliation
    ? portfolioData.affiliations[entry.affiliation as keyof typeof portfolioData.affiliations]
    : null;

  // Resolve technologies to comma-separated string (matches API format)
  const technologies = entry.technologies
    .map((key) => portfolioData.technologies[key as keyof typeof portfolioData.technologies] || key)
    .join(', ');

  // Resolve frameworks to array of {name, url} objects (matches API format)
  const frameworks = entry.frameworks
    .map((key) => {
      const fw = portfolioData.frameworks[key as keyof typeof portfolioData.frameworks];
      return fw ? { name: fw.name, url: fw.url } : { name: key, url: '' };
    });

  // Resolve territories to comma-separated string
  const territories = entry.territories
    .map((key) => portfolioData.territories[key as keyof typeof portfolioData.territories] || key)
    .join(', ');

  // Resolve platforms to comma-separated string
  const platforms = entry.platforms
    .map((key) => portfolioData.platforms[key as keyof typeof portfolioData.platforms] || key)
    .join(', ');

  const item: Record<string, unknown> = {
    id: entry.entry_key,
    client_id: entry.client,
    entry_id: entry.entry_key,
    client_label: clientData?.name || entry.client,
    category: entry.categories.join(', '),
    title: entry.title,
    description: entry.description,
    responsibilities: entry.responsibilities,
    year: entry.year,
    is_responsive: entry.is_responsive,
    is_summary: entry.is_summary,
    is_featured: entry.is_featured,
    affiliation: affData?.name || '',
    affiliation_url: affData?.url || '',
    technologies,
    frameworks,
    territories,
    platforms,
  };

  return Promise.resolve(item);
};

// ---------------------------------------------------------------------------
// fetchArchiveItemService
// Unchanged — still loads from /assets/json/archive/ static files.
// ---------------------------------------------------------------------------
export const fetchArchiveItemService = (opts: {
  client_id: string;
  entry_id: string;
}): Promise<unknown> => {
  const { client_id, entry_id } = opts;
  const url = get_archive_path({ client_id, entry_id });
  return fetch(url).then((r) => {
    if (!r.ok) throw new Error(`HTTP ${r.status}`);
    return r.json();
  });
};
