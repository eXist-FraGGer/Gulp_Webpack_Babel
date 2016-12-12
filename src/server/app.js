var express = require('express');

var index = require('./routes/index');
var path = require('path');
var app = express();

var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '..', 'client')));
app.use('/', index);

module.exports = app;