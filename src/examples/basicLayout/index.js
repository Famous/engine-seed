'use strict';

var Clock = require('famous-core').Clock;
var Colors = require('./Colors');

var famous = new Clock();
famous.publish(new Colors(), 'body');