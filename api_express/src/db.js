import mysql from 'mysql2/promise';
import { config } from './config/index.js';

let pool = null;

export function connect() {
  pool = mysql.createPool({
    host: config.db.host,
    port: config.db.port,
    user: config.db.user,
    password: config.db.password,
    database: config.db.database,
    connectionLimit: 10,
    waitForConnections: true,
  });
  return pool.query('SELECT 1');
}

export function getPool() {
  if (!pool) throw new Error('Database not connected. Call connect() first.');
  return pool;
}
