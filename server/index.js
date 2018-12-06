const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

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


module.exports = (app, dirname) => {
  app.use(allowCrossDomain);
  const api = Router();

  app.use(bodyParser.json());

  api.use('/apparition', apparition(Router));
  api.use('/category', category(Router));

  app.use('/api', api);
  app.use('/', express.static(path.join(dirname, 'client')));
  setup(app);
  return app;
};
