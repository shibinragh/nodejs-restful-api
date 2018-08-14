var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var db = require('./db');
var app = express();


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var routers = require('./routers/index');
app.use('/api', routers); 


module.exports = app;