'use strict';

var Clock = require('famous-core').Clock;
var BasicModel = require('./BasicModel');

var myModel = new BasicModel({
    content: 'Hello World',
    borderRadius: 100,
    backgroundColor: 'yellow'
});


var famous = new Clock();
famous.publish(myModel, 'body');