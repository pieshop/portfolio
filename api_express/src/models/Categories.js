// $categoryQuery = "SELECT * FROM entries a, entries_categories b, categories c WHERE c.category_name = '$categoryID' AND a.entry_id = b.entry_id AND b.category_id = c.category_id AND a.entry_isactive = 1 ORDER BY a.entry_year DESC, a.entry_week DESC";

const db = require('../db.js');
const env = process.env.NODE_ENV || 'development';
console.log('env', env);
/**
 * TODO :
 * Handle filtering
 * Handle live not showing all categories
 */
exports.getActiveCategories = async () => {
  /*
   * example return : {"2017":{"web":true,"responsive":true},"2016":{"olm":true,"web":true,"game":true,"responsive":true,"app":true}}
  */
  let queryString =
    'SELECT * FROM entries WHERE entry_isactive = 1 ORDER BY entry_year DESC, entry_week DESC';
  const [rows, fields] = await db.get().query(queryString);

  let years = { allyears: {} };
  for (const entry of rows) {
    const { entry_id, entry_year } = entry;
    if (!years[entry_year]) {
      years[entry_year] = {};
    }
    const year = { ...years[entry_year] };
    years[entry_year] = await parseYearCategories(entry_id, year, years.allyears);
  }

  queryString = 'SELECT * FROM categories';
  const [allCategories] = await db.get().query(queryString);
  const categories = [];
  for (const category of allCategories) {
    /**
     * remove categories with no entries
     */
    const { category_name } = category;
    if (years.allyears[category_name]) {
      categories.push(category);
    }
  }
  return { categories, years };
};
parseYearCategories = async (entry_id, year, allyears) => {
  const queryString =
    'SELECT * FROM categories a, entries_categories b WHERE a.category_id = b.category_id AND b.entry_id = ?';
  const [rows, fields] = await db.get().query(queryString, entry_id);
  for (const category of rows) {
    year[category.category_name] = true;
    allyears[category.category_name] = true;
  }
  return year;
};

/**
 * Get entries for category
 */
exports.getCategoryEntries = async (categoryId = 'all', yearId = 'allyears', filtered = false) => {
  let queryString =
    categoryId === 'all'
      ? 'SELECT * FROM entries a WHERE a.entry_isactive = 1 '
      : 'SELECT * FROM entries a, entries_categories b, categories c WHERE c.category_name = ? AND a.entry_id = b.entry_id AND b.category_id = c.category_id AND a.entry_isactive = 1 ';

  if (yearId !== 'allyears') {
    queryString += 'AND a.entry_year = ? ';
  }
  if (filtered) {
    queryString += 'AND a.entry_isfeatured = 1 ';
  }
  if (env === 'production') {
    // filter out nda entries
    queryString += 'AND a.entry_isnda = 0 ';
  } else {
    // filter out summary entries
    queryString += 'AND a.entry_issummary = 0 ';
  }
  queryString += 'ORDER BY a.entry_year DESC, a.entry_week DESC';
  console.log('queryString', queryString);
  try {
    const [rows] = await db.get().query(queryString, [categoryId, yearId]);
    // console.log('results', rows);
    /**
     * Get list of active years for category
     */
    const years = [];
    const entries = [];
    for (const entry of rows) {
      years.push(entry.entry_year);
      const parsed = {
        id: entry.entry_id,
        entry_id: entry.entry_key,
        is_featured: entry.entry_isfeatured,
        is_responsive: entry.entry_isresponsive,
        is_summary: entry.entry_issummary,
        title: entry.entry_title,
        year: entry.entry_year,
      };
      parsed.category = await parseEntryCategories(entry.entry_id);
      const { client_id, client_label } = await parseEntryClient(entry.entry_id);
      parsed.client_id = client_id;
      parsed.client_label = client_label;
      entries.push(parsed);
    }
    const yearsUnique = Array.from(new Set(years));
    return { entries, years: yearsUnique };
  } catch (err) {
    return err;
  }
};
parseEntryCategories = async (entry_id) => {
  const queryString =
    'SELECT * FROM categories a, entries_categories b WHERE a.category_id = b.category_id AND b.entry_id = ?';
  const [rows] = await db.get().query(queryString, entry_id);
  let result = '';
  for (const category of rows) {
    result += category.category_name + ', ';
  }
  return result.substring(0, result.length - 2);
};
parseEntryClient = async (entry_id) => {
  const queryString =
    'SELECT * FROM clients a, entries_clients b WHERE a.client_id = b.client_id AND b.entry_id = ?';
  const [rows] = await db.get().query(queryString, entry_id);
  if (rows.length > 0) {
    return { client_id: rows[0].client_key, client_label: rows[0].client_name };
  }
  return null;
};

/**
 * Get entries for category
 */
// exports.getEntriesById = async (categoryId = 'all') => {
//   const queryString =
//     categoryId === 'all'
//       ? 'SELECT * FROM entries a WHERE a.entry_isactive = 1 ORDER BY a.entry_year DESC, a.entry_week DESC'
//       : 'SELECT * FROM entries a, entries_categories b, categories c WHERE c.category_name = ? AND a.entry_id = b.entry_id AND b.category_id = c.category_id AND a.entry_isactive = 1 ORDER BY a.entry_year DESC, a.entry_week DESC';
//   try {
//     const [rows, fields] = await db.get().query(queryString, categoryId);
//     return rows;
//   } catch (err) {
//     return err;
//   }
// };
