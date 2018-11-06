const mysql = require('mysql2');
const async = require('async');
const path = require('path');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/config/config.json')[env];

exports.MODE_TEST = 'mode_test';
exports.MODE_PRODUCTION = 'mode_production';

const state = {
  pool: null,
  promisePool: null,
  mode: env,
};

exports.connect = function() {
  return new Promise((resolve, reject) => {
    state.pool = mysql.createPool({
      connectionLimit: 10,
      database: config.database,
      host: config.host,
      user: config.username,
      password: config.password,
      port: config.port,
    });
    state.promisePool = state.pool.promise();
    resolve();
  });
};

exports.get = function() {
  // const promisePool = state.pool.promise();
  // console.log('promisePool', promisePool);
  return state.promisePool;
};

// exports.fixtures = function(data) {
//   const pool = state.pool;
//   if (!pool) return done(new Error('Missing database connection.'));
//
//   const names = Object.keys(data.tables);
//   async.each(
//     names,
//     function(name, cb) {
//       async.each(
//         data.tables[name],
//         function(row, cb) {
//           const keys = Object.keys(row),
//             values = keys.map(function(key) {
//               return "'" + row[key] + "'";
//             });
//
//           pool.query(
//             'INSERT INTO ' + name + ' (' + keys.join(',') + ') VALUES (' + values.join(',') + ')',
//             cb
//           );
//         },
//         cb
//       );
//     },
//     done
//   );
// };
//
// exports.drop = function(tables, done) {
//   const pool = state.pool;
//   if (!pool) return done(new Error('Missing database connection.'));
//
//   async.each(
//     tables,
//     function(name, cb) {
//       pool.query('DELETE * FROM ' + name, cb);
//     },
//     done
//   );
// };
