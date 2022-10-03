
const express = require('express');

const defaultRouter = express.Router();

//todo middleware check authen

require('./LoginRoute')(defaultRouter);
require('../auth/ImageRoute')(defaultRouter);

module.exports = defaultRouter;
