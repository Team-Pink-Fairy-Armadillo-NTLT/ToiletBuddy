const { Pool } = require('pg');

const PG_URI = 'postgres://szexdlxb:b9nMTQaUuAFMNLhJYTwNBYfmL79p6ILU@bubble.db.elephantsql.com/szexdlxb';

const pool = new Pool({
  connectionString: PG_URI
});

module.exports = {
  query: (text, params, callback) => {
    console.log('executed query', text);
    return pool.query(text, params, callback);
  }
};