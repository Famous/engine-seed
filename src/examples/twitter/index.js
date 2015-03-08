'use strict';

var Context = require('famous-api').Context;
var App = require('./App');

new Context(new App(), 'body');
