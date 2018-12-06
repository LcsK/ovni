const { Pool } = require('pg');

const pool = new Pool({
  connectionString: 'postgres://vsuozmqspjulbt:c81bf1b5b94f0eaf11e74afd014106493a2d28c5bf2d0e4078be7499733c59cc@ec2-54-204-40-248.compute-1.amazonaws.com:5432/d9uu38guc91upf',
  ssl: true,
});

module.exports = pool;
