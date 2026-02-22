import app from '../app.js';
import { connect } from '../db.js';
import { config } from '../config/index.js';

try {
  await connect();
  console.log(`Connected to ${config.db.database} database.`);
} catch (err) {
  console.error('Unable to connect to MySQL:', err.message);
  process.exit(1);
}

app.listen(config.port, () => {
  console.log(`Portfolio API listening on port ${config.port}`);
});
