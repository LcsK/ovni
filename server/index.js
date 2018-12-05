const express = require('express');
const bodyParser = require('body-parser');

const { Router } = express;

const setup = require('./setup.js');
const apparition = require('./apparition');
const category = require('./category');

const allowCrossDomain = (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

  // intercept OPTIONS method
  if (req.method === 'OPTIONS') {
    res.send(200);
  } else {
    next();
  }
};


module.exports = (app) => {
  app.use(allowCrossDomain);
  const api = Router();

  app.use(bodyParser.json());

  api.use('/apparition', apparition(Router));
  api.use('/category', category(Router));

  app.use('/api', api);
  app.get('/', (req, res) => res.status(200).send('<h1>Access /api/category to work with categories, and /api/apparition to work with apparitions</h1>'));
  setup(app);
  return app;
};
