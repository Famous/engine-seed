'use strict';

var Context = require('famous-core').Context;
var App = require('./App');

new Context(new App(), 'body');
