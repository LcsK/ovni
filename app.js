require('dotenv').config({
  silent: true,
  replace: true,
  force: true,
});

const express = require('express');
const server = require('./server');

const app = express();

server(app);

module.exports = app;
