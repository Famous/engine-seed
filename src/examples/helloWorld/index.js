'use strict';

var Context = require('famous-api').Context;
var BasicModel = require('./BasicModel');

var myModel = new BasicModel({
    content: 'Hello World',
    borderRadius: 100,
    backgroundColor: 'yellow'
});


new Context(myModel, 'body');
