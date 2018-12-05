const model = require('./apparition.model.js');

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
  const {
    title,
    description,
    date,
    location,
  } = req.body;
  const result = await model.create(title, description, date, location);
  res.status(200).json(result);
};

const update = async (req, res) => {
  console.log('update apparition');
  const {
    params: { id },
    body: {
      title,
      description,
      date,
      location,
    },
  } = req;
  const result = await model.update(id, title, description, date, location);
  res.status(200).json(result);
};

const remove = async (req, res) => {
  console.log('remove apparition');
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
