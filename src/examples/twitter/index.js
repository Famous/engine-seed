'use strict';

var Clock = require('famous-core').Clock;
var App = require('./App');

var famous = new Clock();
famous.publish(new App(), 'body');
