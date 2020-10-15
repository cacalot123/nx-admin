const path = require('path');
const express = require('express');
const mockjs = require('express-mockjs');
const logger = require('morgan');
const bodyParser = require('body-parser');
const api = module.exports = express();
const compression = require('compression');
// var multer = require('multer');
// var path = require('path');
api.use(logger('dev'));
api.use(compression());
api.use('/api/', bodyParser.json({ "limit": "100000kb" })); // for parsing application/json
api.use('/api/', bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

//api.use(multer()); // for parsing multipart/form-data


api.use('*', function(request, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

api.use('/api/user', mockjs(path.join(__dirname, 'user')));
api.use('/api/role', mockjs(path.join(__dirname, 'role')));
api.use('/api/permissions', mockjs(path.join(__dirname, 'permissions')));
api.use('/api/other', mockjs(path.join(__dirname, 'other')));

api.use('/api/channel', mockjs(path.join(__dirname, 'channel')));

module.exports = api;
