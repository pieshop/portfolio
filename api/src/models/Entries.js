import { getPool } from '../db.js';

/**
 * Returns a single entry by its entry_key (string slug).
 * Shape matches the frontend's fetchItemService response.
 */
export async function getEntryByID(entryKey) {
  const db = getPool();

  // Main entry
  const [entries] = await db.query(
    'SELECT * FROM entries WHERE entry_key = ? AND entry_isactive = 1',
    [entryKey],
  );

  if (entries.length === 0) {
    return null;
  }

  const entry = entries[0];
  const entryId = entry.entry_id;

  // Batch all related lookups in parallel
  const [
    [categoryRows],
    [clientRows],
    [affiliationRows],
    [techRows],
    [frameworkRows],
    [platformRows],
    [territoryRows],
  ] = await Promise.all([
    db.query(
      `SELECT c.category_name FROM categories c
       JOIN entries_categories ec ON c.category_id = ec.category_id
       WHERE ec.entry_id = ?`,
      [entryId],
    ),
    db.query(
      `SELECT cl.client_key, cl.client_name FROM clients cl
       JOIN entries_clients ecl ON cl.client_id = ecl.client_id
       WHERE ecl.entry_id = ?`,
      [entryId],
    ),
    db.query(
      `SELECT a.affiliation_name, a.affiliation_url FROM affiliations a
       JOIN entries_affiliations ea ON a.affiliation_id = ea.affiliation_id
       WHERE ea.entry_id = ?`,
      [entryId],
    ),
    db.query(
      `SELECT t.tech_name FROM technologies t
       JOIN entries_technologies et ON t.tech_id = et.tech_id
       WHERE et.entry_id = ?`,
      [entryId],
    ),
    db.query(
      `SELECT f.framework_name, f.framework_url FROM frameworks f
       JOIN entries_frameworks ef ON f.framework_id = ef.framework_id
       WHERE ef.entry_id = ?`,
      [entryId],
    ),
    db.query(
      `SELECT p.platform_name FROM platforms p
       JOIN entries_platforms ep ON p.platform_id = ep.platform_id
       WHERE ep.entry_id = ?`,
      [entryId],
    ),
    db.query(
      `SELECT t.territory_name FROM territories t
       JOIN entries_territories et ON t.territory_id = et.territory_id
       WHERE et.entry_id = ?`,
      [entryId],
    ),
  ]);

  const client = clientRows[0] || {};
  const affiliation = affiliationRows[0] || {};

  return {
    id: entry.entry_key,
    client_id: client.client_key || '',
    entry_id: entry.entry_key,
    client_label: client.client_name || '',
    category: categoryRows.map((r) => r.category_name).join(', '),
    title: entry.entry_title,
    description: entry.entry_description,
    responsibilities: entry.entry_responsibilities,
    year: entry.entry_year,
    is_responsive: entry.entry_isresponsive === 1,
    is_summary: entry.entry_issummary === 1,
    is_featured: entry.entry_isfeatured === 1,
    affiliation: affiliation.affiliation_name || '',
    affiliation_url: affiliation.affiliation_url || '',
    technologies: techRows.map((r) => r.tech_name).join(', '),
    frameworks: frameworkRows.map((r) => ({
      name: r.framework_name,
      url: r.framework_url,
    })),
    territories: territoryRows.map((r) => r.territory_name).join(', '),
    platforms: platformRows.map((r) => r.platform_name).join(', '),
  };
}
