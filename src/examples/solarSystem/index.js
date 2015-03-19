'use strict';

/**
 * Module dependencies
 */
var Context = require('famous-core').Context;
var FlatSphere = require('./FlatSphere');
var Sun = require('./Sun');
var Plane = require('./Plane');


/**
 * Add the models to the body.
 * It's better to add a single scene into the main root (e.g. body)
 */
var root = new Context('body');
new FlatSphere(root.addChild());
new Sun(root.addChild());
new Plane(root.addChild());

