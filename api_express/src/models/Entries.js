const db = require('../db.js');

exports.getEntryByID = async (id) => {
  const queryString = 'SELECT * FROM entries WHERE entry_key = ?';
  try {
    const [rows, fields] = await db.get().query(queryString, id);
    if (rows.length > 0) {
      const parsedEntry = await parseEntry(rows[0]);
      return parsedEntry;
    }
    return { error: 'Not found' };
  } catch (err) {
    return err;
  }
};
parseEntry = async ({
  entry_id: id,
  entry_key: entry_id,
  entry_isfeatured: is_featured,
  entry_isresponsive: is_responsive,
  entry_issummary: is_summary,
  entry_title: title,
  entry_year: year,
  entry_description: description,
  entry_responsibilities: responsibilities,
}) => {
  const entry = {
    id,
    entry_id,
    is_featured,
    is_responsive,
    is_summary,
    title,
    year,
    description,
    responsibilities,
  };
  entry.category = await parseEntryRow(
    id,
    'SELECT * FROM categories a, entries_categories b WHERE a.category_id = b.category_id AND b.entry_id = ?',
    'category_name'
  );
  entry.technologies = await parseEntryRow(
    id,
    'SELECT * FROM technologies a, entries_technologies b WHERE a.tech_id = b.tech_id AND b.entry_id = ?',
    'tech_name'
  );
  entry.platforms = await parseEntryRow(
    id,
    'SELECT * FROM platforms a, entries_platforms b WHERE a.platform_id = b.platform_id AND b.entry_id = ?',
    'platform_name'
  );
  entry.territories = await parseEntryRow(
    id,
    'SELECT * FROM territories a, entries_territories b WHERE a.territory_id = b.territory_id AND b.entry_id = ?',
    'territory_name'
  );
  const { client_id, client_label } = await parseEntryClient(id);
  entry.client_id = client_id;
  entry.client_label = client_label;
  const { affiliation, affiliation_url } = await parseEntryAffiliations(id);
  entry.affiliation = affiliation;
  entry.affiliation_url = affiliation_url;
  entry.frameworks = await parseEntryFrameworks(id);
  return entry;
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
parseEntryAffiliations = async (entry_id) => {
  const queryString =
    'SELECT * FROM affiliations a, entries_affiliations b WHERE a.affiliation_id = b.affiliation_id AND b.entry_id = ?';
  const [rows] = await db.get().query(queryString, entry_id);
  if (rows.length > 0) {
    return { affiliation: rows[0].affiliation_name, affiliation_url: rows[0].affiliation_url };
  }
  return null;
};
parseEntryFrameworks = async (entry_id) => {
  const queryString =
    'SELECT * FROM frameworks a, entries_frameworks b WHERE a.framework_id = b.framework_id AND b.entry_id = ?';
  const [rows] = await db.get().query(queryString, entry_id);
  const result = [];
  for (const o of rows) {
    const framework = { name: o.framework_name, url: o.framework_url };
    result.push(framework);
  }
  return result;
};

parseEntryRow = async (entry_id, queryString, key) => {
  const [rows] = await db.get().query(queryString, entry_id);
  let result = '';
  for (const o of rows) {
    result += o[key] + ', ';
  }
  return result.substring(0, result.length - 2);
};
