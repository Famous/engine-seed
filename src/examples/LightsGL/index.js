'use strict';

/**
 * Module dependencies
 */
var Context = require('famous-api').Context;
var SphereModel = require('./SphereModel');
var LightsModel = require('./LightsModel');


/**
 * Create the SphereModel with a size of 300 across
 * and a LightsModel.
 */
var sphereModel = new SphereModel({
    size: [300, 300, 300]
});

var lightsModel = new LightsModel();


/**
 * Add the models to the body.
 * It's better to add a single scene into the main root (e.g. body)
 */
new Context(sphereModel, 'body');
new Context(lightsModel, 'body');

