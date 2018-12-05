const express = require('express');
const bodyParser = require('body-parser');

const { Router } = express;

const setup = require('./setup.js');
const apparition = require('./apparition');
const category = require('./category');

module.exports = (app) => {
  const api = Router();

  app.use(bodyParser.json());

  api.use('/apparition', apparition(Router));
  api.use('/category', category(Router));

  app.use('/api', api);
  setup(app);
  return app;
};
