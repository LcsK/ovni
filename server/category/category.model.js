const pool = require('../database');

const get = async () => {
  const query = 'select * from category;';
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
  const query = 'select * from category where id = $1;';
  const db = await pool.connect();
  try {
    const result = await db.query(query, [id]);
    return { ok: true, data: result.rows[0] };
  } catch (error) {
    console.error(error);
    return { ok: false };
  }
};

const create = async (name, description) => {
  const query = 'insert into category (name, description) values ($1, $2);';
  const db = await pool.connect();
  try {
    await db.query(query, [name, description]);
    return { ok: true };
  } catch (error) {
    console.error(error);
    return { ok: false };
  }
};

const update = async (id, name, description) => {
  const query = 'update category set name = $1, description = $2 where id = $3';
  const db = await pool.connect();
  try {
    await db.query(query, [name, description, id]);
    return { ok: true };
  } catch (error) {
    console.error(error);
    return { ok: false };
  }
};

const remove = async (id) => {
  const query = 'delete from category where id = $1;';
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
