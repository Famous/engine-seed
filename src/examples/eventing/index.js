'use strict';

var Clock = require('famous-core').Clock;
var BasicModel = require('./BasicModel');

var myModel = new BasicModel();

var famous = new Clock();
famous.publish(myModel, 'body');

module.exports = famous;
