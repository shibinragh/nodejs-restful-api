var express = require('express');
//var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var db = require('./db');
var app = express();
//mongoose.connect(db.url);
//var controller = require('./user/UserController');

var AuthController = require('./auth/AuthController');
app.use('/api/auth', AuthController);


module.exports = app;