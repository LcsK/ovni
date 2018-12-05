const model = require('./category.model.js');

const get = async (req, res) => {
  const result = await model.get();
  res.status(200).json(result);
};

const byId = async (req, res) => {
  const { id } = req.params;
  const result = await model.byId(id);
  res.status(200).json(result);
};

const create = async (req, res) => {
  const { name, description } = req.body;
  const result = await model.create(name, description);
  res.status(200).json(result);
};

const update = async (req, res) => {
  console.log('update category');
  const { params: { id }, body: { name, description } } = req;
  const result = await model.update(id, name, description);
  res.status(200).json(result);
};

const remove = async (req, res) => {
  console.log('remove category');
  const { id } = req.params;
  const result = await model.remove(id);
  res.status(200).json(result);
};

module.exports = {
  get,
  byId,
  create,
  update,
  remove,
};
