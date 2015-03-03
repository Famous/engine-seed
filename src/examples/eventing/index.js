'use strict';

var Context = require('famous-api').Context;
var BasicModel = require('./BasicModel');

var myModel = new BasicModel();

new Context(myModel, 'body');
