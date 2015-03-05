'use strict';

var Context = require('famous-api').Context;
var Colors = require('./Colors');

new Context(new Colors(), 'body');
