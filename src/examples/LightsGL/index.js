'use strict';

/**
 * Module dependencies
 */
var Context = require('famous-core').Context;
var Sphere = require('./Sphere');
var Light = require('./Light');


/**
 * Add the models to the body.
 * It's better to add a single scene into the main root (e.g. body)
 */
var root = new Context('body');
var sphere = new Sphere(root.addChild());
var light = new Light(root.addChild());

