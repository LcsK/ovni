const pool = require('../database');

const get = async () => {
  const query = 'select * from apparition;';
  const db = await pool.connect();
  try {
    const result = await db.query(query);
    return { ok: true, data: result.rows };
  } catch (error) {
    console.error(error);
    return { ok: false };
  }
};

const byId = async (id) => {
  const query = 'select * from apparition where id = $1;';
  const db = await pool.connect();
  try {
    const result = await db.query(query, [id]);
    return { ok: true, data: result.rows[0] };
  } catch (error) {
    console.error(error);
    return { ok: false };
  }
};

const create = async (title, description, date, location, category) => {
  const query = 'insert into apparition (title, description, date, location, category) values ($1, $2, $3, $4, $5);';
  const db = await pool.connect();
  try {
    await db.query(query, [title, description, date, location, category]);
    return { ok: true };
  } catch (error) {
    console.error(error);
    return { ok: false };
  }
};

const update = async (id, name, description, date, location, category) => {
  const query = 'update apparition set title = $1, description = $2, date = $3, location = $4, category = $5 where id = $6';
  const db = await pool.connect();
  try {
    await db.query(query, [name, description, date, location, category, id]);
    return { ok: true };
  } catch (error) {
    console.error(error);
    return { ok: false };
  }
};

const remove = async (id) => {
  const query = 'delete from apparition where id = $1;';
  const db = await pool.connect();
  try {
    await db.query(query, [id]);
    return { ok: true };
  } catch (error) {
    console.error(error);
    return { ok: false };
  }
};

module.exports = {
  get,
  byId,
  create,
  update,
  remove,
};
