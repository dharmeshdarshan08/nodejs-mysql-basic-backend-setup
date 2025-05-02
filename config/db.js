const mysql = require('mysql2');
const config = require('./db.config');

// Create a connection pool
const pool = mysql.createPool({
  host: config.HOST,
  user: config.USER,
  password: config.PASSWORD,
  database: config.DB,
  connectionLimit: config.pool.max
});

// Promisify the pool.query method for async/await
const promisePool = pool.promise();

async function query(sql, params) { 
  try {
    const [rows] = await promisePool.query(sql, params);
    return rows;
  } catch (err) {
    console.error('Database query error:', err);
    throw err; // Re-throw error to be handled by the caller
  }
}

module.exports = {
  query
};
