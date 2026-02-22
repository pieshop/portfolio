import { getPool } from '../db.js';

/**
 * Returns all categories that have at least one active entry.
 * Shape: [{ category_id, category_name, category_label, category_description, is_active }]
 */
export async function getAvailableCategories() {
  const db = getPool();

  const [categories] = await db.query(`
    SELECT DISTINCT c.category_id, c.category_name, c.category_label, c.category_description
    FROM categories c
    JOIN entries_categories ec ON c.category_id = ec.category_id
    JOIN entries e ON ec.entry_id = e.entry_id
    WHERE e.entry_isactive = 1
    ORDER BY c.category_id
  `);

  return categories.map((c) => ({
    category_id: c.category_id,
    category_name: c.category_name,
    category_label: c.category_label,
    category_description: c.category_description,
    is_active: true,
  }));
}

/**
 * Returns { [year]: { [category_name]: true }, allyears: { ... } }
 */
export async function getActiveCategoriesByYear() {
  const db = getPool();

  const [rows] = await db.query(`
    SELECT e.entry_year, c.category_name
    FROM entries e
    JOIN entries_categories ec ON e.entry_id = ec.entry_id
    JOIN categories c ON ec.category_id = c.category_id
    WHERE e.entry_isactive = 1
    ORDER BY e.entry_year DESC
  `);

  const result = {};
  const allyears = {};

  for (const { entry_year, category_name } of rows) {
    const yearKey = String(entry_year);
    if (!result[yearKey]) result[yearKey] = {};
    result[yearKey][category_name] = true;
    allyears[category_name] = true;
  }

  result.allyears = allyears;
  return result;
}

/**
 * Returns { entries, years, active_categories } for a category/year filter.
 *
 * - entries: array of entry objects with client + category info
 * - years: unique years available for this category (descending)
 * - active_categories: { [category_name]: true } for the selected year
 */
export async function getCategoryEntries(categoryId = 'all', yearId = 'allyears') {
  const db = getPool();

  // Build the entries query with conditional filters
  let entriesQuery = `
    SELECT
      e.entry_id,
      e.entry_key,
      e.entry_title,
      e.entry_year,
      e.entry_isfeatured,
      e.entry_isresponsive,
      e.entry_issummary,
      cl.client_key,
      cl.client_name,
      GROUP_CONCAT(c.category_name ORDER BY c.category_id SEPARATOR ', ') AS category
    FROM entries e
    LEFT JOIN entries_clients ecl ON e.entry_id = ecl.entry_id
    LEFT JOIN clients cl ON ecl.client_id = cl.client_id
    JOIN entries_categories ec ON e.entry_id = ec.entry_id
    JOIN categories c ON ec.category_id = c.category_id
    WHERE e.entry_isactive = 1
      AND e.entry_issummary = 0
  `;
  const params = [];

  if (categoryId !== 'all') {
    entriesQuery += `
      AND e.entry_id IN (
        SELECT ec2.entry_id FROM entries_categories ec2
        JOIN categories c2 ON ec2.category_id = c2.category_id
        WHERE c2.category_name = ?
      )
    `;
    params.push(categoryId);
  }

  if (yearId !== 'allyears') {
    entriesQuery += ' AND e.entry_year = ?';
    params.push(yearId);
  }

  entriesQuery += `
    GROUP BY e.entry_id
    ORDER BY e.entry_year DESC, e.entry_week DESC
  `;

  const [rows] = await db.query(entriesQuery, params);

  const entries = rows.map((r) => ({
    id: r.entry_key,
    client_id: r.client_key || '',
    entry_id: r.entry_key,
    client_label: r.client_name || '',
    category: r.category,
    title: r.entry_title,
    year: r.entry_year,
    is_responsive: r.entry_isresponsive === 1,
    is_summary: r.entry_issummary === 1,
    is_featured: r.entry_isfeatured === 1,
  }));

  // Get all available years for this category (unfiltered by year)
  let yearsQuery = `
    SELECT DISTINCT e.entry_year
    FROM entries e
    WHERE e.entry_isactive = 1 AND e.entry_issummary = 0
  `;
  const yearsParams = [];

  if (categoryId !== 'all') {
    yearsQuery += `
      AND e.entry_id IN (
        SELECT ec2.entry_id FROM entries_categories ec2
        JOIN categories c2 ON ec2.category_id = c2.category_id
        WHERE c2.category_name = ?
      )
    `;
    yearsParams.push(categoryId);
  }

  yearsQuery += ' ORDER BY e.entry_year DESC';

  const [yearRows] = await db.query(yearsQuery, yearsParams);
  const years = yearRows.map((r) => r.entry_year);

  // Get active categories for the selected year
  let activeCatsQuery = `
    SELECT DISTINCT c.category_name
    FROM entries e
    JOIN entries_categories ec ON e.entry_id = ec.entry_id
    JOIN categories c ON ec.category_id = c.category_id
    WHERE e.entry_isactive = 1 AND e.entry_issummary = 0
  `;
  const activeCatsParams = [];

  if (yearId !== 'allyears') {
    activeCatsQuery += ' AND e.entry_year = ?';
    activeCatsParams.push(yearId);
  }

  const [catRows] = await db.query(activeCatsQuery, activeCatsParams);
  const active_categories = {};
  for (const { category_name } of catRows) {
    active_categories[category_name] = true;
  }

  return { entries, years, active_categories };
}
