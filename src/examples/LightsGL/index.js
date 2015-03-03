'use strict';

var Clock = require('famous-core').Clock;
var SphereModel = require('./SphereModel');
var LightsModel = require('./LightsModel');

var sphereModel = new SphereModel({
    size: [300, 300, 300]
});

var lightsModel = new LightsModel();

var famous = new Clock();
famous.publish(sphereModel, 'body');
famous.publish(lightsModel, 'body');
