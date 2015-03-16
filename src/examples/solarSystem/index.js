'use strict';

/**
 * Module dependencies
 */
var Context = require('famous-core').Context;
var FlatSphere = require('./FlatSphere');
var Sun = require('./Sun');


/**
 * Add the models to the body.
 * It's better to add a single scene into the main root (e.g. body)
 */
var root = new Context('body');
var sphere = new FlatSphere(root.addChild());
var flatSphere = new Sun(root.addChild());

